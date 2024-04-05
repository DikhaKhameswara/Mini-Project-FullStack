package prodemy.Backend.service.implement.filtering;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoriesSpecification implements Specification<Categories> {

    private SearchCriteria criteria;

    private static Expression<Long> sorting;
    private static String sortOrder;
    private static String sortBy;
    private final List<String> sortByList = new ArrayList<>(Arrays.asList("name", "total_products"));
    private final List<String> sortOrderList = new ArrayList<>(Arrays.asList("asc", "desc"));

    @Override
    @Nullable
    @SuppressWarnings("null")
    public Predicate toPredicate(Root<Categories> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

        if (criteria.getKey().equalsIgnoreCase("name")) {
            return criteriaBuilder.like(root.<String>get("name"), "%" + criteria.getValue().toString() + "%");
        }

        if (criteria.getKey().equalsIgnoreCase("sort_by")) {
            sorting = null;
            sortOrder = null;

            if (!sortByList.contains(criteria.getValue().toString().toLowerCase())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FITUR SORTING TIDAK DITEMUKAN");
            }

            sortBy = criteria.getValue()
                    .toString().toLowerCase()
                    .equalsIgnoreCase("name") ? "name" : "products";

            Join<Categories, Products> tJoin = root.join("products", JoinType.LEFT);
            Path<Object> sortPath = root.get(sortBy);
            if (sortBy.equalsIgnoreCase("products")) {
                query.groupBy(root.<String>get("id"));
                sorting = criteriaBuilder.count(tJoin.get("category"));
            }

            if (sortOrder == null) {
                query.orderBy(criteriaBuilder.asc(sortPath));
            } else {
                if (sortOrder.equalsIgnoreCase("asc")) {
                    if (sorting != null) {
                        query.orderBy(criteriaBuilder.asc(sorting));
                    } else {
                        query.orderBy(criteriaBuilder.asc(sortPath));
                    }
                } else {
                    if (sorting != null) {
                        query.orderBy(criteriaBuilder.desc(sorting));
                    } else {
                        query.orderBy(criteriaBuilder.desc(sortPath));
                    }
                }
            }
        }

        if (criteria.getKey().equalsIgnoreCase("sort_order")) {

            if (!sortOrderList.contains(criteria.getValue().toString().toLowerCase())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FITUR SORTING TIDAK DITEMUKAN");
            }

            Join<Categories, Products> tJoin = root.join("products", JoinType.LEFT);
            Path<Object> sortPath = root.get(sortBy);
            if (sortBy.equalsIgnoreCase("products")) {
                query.groupBy(root.<String>get("id"));
                sorting = criteriaBuilder.count(tJoin.get("category"));
            }

            sortOrder = criteria.getValue().toString();
            if (sortBy != null) {
                if (sortOrder.equalsIgnoreCase("asc")) {
                    if (sorting != null) {
                        query.orderBy(criteriaBuilder.asc(sorting));
                    } else {
                        query.orderBy(criteriaBuilder.asc(sortPath));
                    }
                } else {
                    if (sorting != null) {
                        query.orderBy(criteriaBuilder.desc(sorting));
                    } else {
                        query.orderBy(criteriaBuilder.desc(sortPath));
                    }
                }
            }
        }

        return null;
    }

}