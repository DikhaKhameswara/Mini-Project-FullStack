package prodemy.Backend.service.implement.filtering;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionsSpecifications implements Specification<Transactions> {

    private String productId;

    @SuppressWarnings("null")
    @Override
    @Nullable
    public Predicate toPredicate(Root<Transactions> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

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

        Join<Transactions, TransactionDetails> tJoin = root.join("transactionDetails");
        Join<TransactionDetails, Products> tdJoin = tJoin.join("product");
        return criteriaBuilder.equal(tdJoin.get("id"), id);

    }

}
