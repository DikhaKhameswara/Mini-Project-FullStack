package prodemy.Backend.service;

import java.util.List;

import prodemy.Backend.model.request.AddCategoryRequest;
import prodemy.Backend.model.response.CategoriesResponse;

public interface CategoriesService {

    List<CategoriesResponse> getAllCategories();

    CategoriesResponse getCategoriesById(Long id);

    void addCategory(AddCategoryRequest request);

    void updateCategory(Long id, AddCategoryRequest request);

    void deleteCategory(Long id);
}
