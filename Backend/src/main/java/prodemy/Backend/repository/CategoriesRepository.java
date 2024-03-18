package prodemy.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import prodemy.Backend.model.Categories;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long> {

    Categories findByName(String name);

}