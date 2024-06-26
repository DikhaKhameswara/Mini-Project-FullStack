package prodemy.Backend.service.implement.filtering;

import java.util.ArrayList;
import java.util.Arrays;
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
import prodemy.Backend.model.entity.Categories;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.request.SearchCriteria;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductsSpecification implements Specification<Products> {

    private SearchCriteria criteria;
    private static String sortOrder;
    private static String sortBy;

    private final List<String> sortByList = new ArrayList<>(Arrays.asList("title", "price", "category"));
    private final List<String> sortOrderList = new ArrayList<>(Arrays.asList("asc", "desc"));

    @SuppressWarnings("null")
    @Override
    public Predicate toPredicate(Root<Products> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

        if (criteria.getKey().equalsIgnoreCase("title")) {
            return criteriaBuilder.like(root.<String>get("title"), "%" + criteria.getValue() + "%");
        }

        if (criteria.getKey().equalsIgnoreCase("category_id")) {
            Join<Products, Categories> pjoin = root.join("category");
            return criteriaBuilder.equal(pjoin.get("id"), criteria.getValue());
        }

        if (criteria.getKey().equalsIgnoreCase("sort_by")) {

            if (!sortByList.contains(criteria.getValue().toString().toLowerCase())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FITUR SORTING TIDAK DITEMUKAN");
            }

            sortBy = criteria.getValue().toString();
            if (sortOrder == null) {
                query.orderBy(criteriaBuilder.asc(root.get(criteria.getValue().toString())));
            } else {
                if (sortOrder.equalsIgnoreCase("asc")) {
                    query.orderBy(criteriaBuilder.asc(root.get(criteria.getValue().toString())));
                } else {
                    query.orderBy(criteriaBuilder.desc(root.get(criteria.getValue().toString())));
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

        if (criteria.getKey().equalsIgnoreCase("start_price") ||
                criteria.getKey().equalsIgnoreCase("end_price")) {

            if (criteria.getValue().toString().isEmpty()) {
                return null;
            }

            Long price = 0L;
            try {
                price = Long.parseLong(criteria.getValue().toString());
            } catch (NumberFormatException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "PRICE HARUS ANGKA");
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
            }

            if (price < 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "PRICE HARUS DIATAS ATAU SAMA DENGAN RP.0");
            }

            if (criteria.getKey().equalsIgnoreCase("start_price")) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), price);
            } else {
                return criteriaBuilder.lessThanOrEqualTo(root.get("price"), price);
            }
        }

        return null;
    }

}
