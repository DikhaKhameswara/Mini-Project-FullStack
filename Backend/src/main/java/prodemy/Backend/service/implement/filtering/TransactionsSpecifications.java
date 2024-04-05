package prodemy.Backend.service.implement.filtering;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.entity.TransactionDetails;
import prodemy.Backend.model.entity.Transactions;
import prodemy.Backend.model.request.SearchCriteria;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionsSpecifications implements Specification<Transactions> {

    private SearchCriteria criteria;

    private static String sortOrder;
    private static String sortBy;
    private final List<String> sortByList = new ArrayList<>(Arrays.asList("transactions_date", "total_amount"));
    private final List<String> sortOrderList = new ArrayList<>(Arrays.asList("asc", "desc"));

    @SuppressWarnings("null")
    @Override
    public Predicate toPredicate(Root<Transactions> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        System.out.println(criteria);

        if (criteria.getKey().equalsIgnoreCase("products")) {
            Join<Transactions, TransactionDetails> tJoin = root.join("transactionDetails");
            Join<TransactionDetails, Products> tdJoin = tJoin.join("product");

            List<String> productIds = Arrays.asList(criteria.getValue().toString().split(","));

            Predicate[] preds = new Predicate[productIds.size()];

            int i = 0;
            for (String productId : productIds) {

                if (productId == null) {
                    return null;
                }

                Long id = 0L;
                try {
                    id = Long.parseLong(productId);
                } catch (NumberFormatException e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID Bukan Angka");
                } catch (Exception e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
                }

                preds[i] = criteriaBuilder.equal(tdJoin.get("id"), id);
                i++;
            }

            return criteriaBuilder.or(preds);
        }

        if (criteria.getKey().equalsIgnoreCase("start_transaction_date") ||
                criteria.getKey().equalsIgnoreCase("end_transaction_date")) {

            String[] date = criteria.getValue().toString().split("-");

            Integer year, month, dayOfMonth;
            try {
                year = Integer.parseInt(date[0]);
                month = Integer.parseInt(date[1]);
                dayOfMonth = Integer.parseInt(date[2]);
            } catch (NumberFormatException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TANGGAL HARUS ANGKA");
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
            }

            LocalDate localDate = null;
            try {
                localDate = LocalDate.of(year, month, dayOfMonth);
            } catch (DateTimeException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TANGGAL INVALID");
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
            }

            ZoneId zoneId = ZoneId.systemDefault();
            Date tgl = Date.from(localDate.atStartOfDay(zoneId).toInstant());

            if (criteria.getKey().equalsIgnoreCase("start_transaction_date")) {
                return criteriaBuilder.greaterThanOrEqualTo(root.<Date>get("transactionsDate"), tgl);
            } else {
                return criteriaBuilder.lessThanOrEqualTo(root.<Date>get("transactionsDate"), tgl);
            }
        }

        if (criteria.getKey().equalsIgnoreCase("start_total_amount") ||
                criteria.getKey().equalsIgnoreCase("end_total_amount")) {

            Long totalAmount = 0L;
            try {
                totalAmount = Long.parseLong(criteria.getValue().toString());
            } catch (NumberFormatException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TOTAL AMOUNT HARUS ANGKA");
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
            }

            if (totalAmount < 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "PRICE HARUS > RP.O");
            }

            if (criteria.getKey().equalsIgnoreCase("start_total_amount")) {
                return criteriaBuilder.greaterThanOrEqualTo(root.<Long>get("totalAmount"), totalAmount);
            } else {
                return criteriaBuilder.lessThanOrEqualTo(root.<Long>get("totalAmount"), totalAmount);

            }
        }

        if (criteria.getKey().equalsIgnoreCase("sort_by")) {

            if (!sortByList.contains(criteria.getValue().toString().toLowerCase())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FITUR SORTING TIDAK DITEMUKAN");
            }

            sortBy = criteria.getValue()
                    .toString().toLowerCase()
                    .equalsIgnoreCase("transactions_date") ? "transactionsDate" : "totalAmount";

            if (sortOrder == null) {
                query.orderBy(criteriaBuilder.asc(root.get(sortBy)));
            } else {
                if (sortOrder.equalsIgnoreCase("asc")) {
                    query.orderBy(criteriaBuilder.asc(root.get(sortBy)));
                } else {
                    query.orderBy(criteriaBuilder.desc(root.get(sortBy)));
                }
            }
        }

        if (criteria.getKey().equalsIgnoreCase("sort_order")) {

            if (!sortOrderList.contains(criteria.getValue().toString().toLowerCase())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FITUR SORTING TIDAK DITEMUKAN");
            }

            sortOrder = criteria.getValue().toString();
            if (sortBy != null) {
                if (sortOrder.equalsIgnoreCase("asc")) {
                    query.orderBy(criteriaBuilder.asc(root.get(sortBy)));
                } else {
                    query.orderBy(criteriaBuilder.desc(root.get(sortBy)));
                }
            }
        }

        return null;
    }

}
