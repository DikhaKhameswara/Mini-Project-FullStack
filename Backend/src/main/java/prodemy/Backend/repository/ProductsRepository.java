package prodemy.Backend.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.annotation.Nullable;
import prodemy.Backend.model.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {

    @Nullable
    List<Products> findByTitleLikeAndCategory_CategoryId(@Nullable String title, Long categoryId,
            Sort sort);

    @Nullable
    List<Products> findByTitleLike(@Nullable String title, Sort sort);

    List<Products> findByCategory_CategoryId(Long categoryId, Sort sort);

}