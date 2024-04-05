package prodemy.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import prodemy.Backend.model.entity.Categories;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long>, JpaSpecificationExecutor<Categories> {

    Categories findByName(String name);

}