package prodemy.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import prodemy.Backend.model.entity.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {

    Optional<List<Products>> findByTitleLikeAndCategory_Id(String title, Long categoryId,
            Sort sort);

    Optional<List<Products>> findByTitleLike(String title, Sort sort);

    Optional<List<Products>> findByCategory_Id(Long categoryId, Sort sort);

}