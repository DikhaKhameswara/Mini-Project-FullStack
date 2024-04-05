package prodemy.Backend.service;

import java.util.List;
import java.util.Map;

import prodemy.Backend.model.request.AddCategoryRequest;
import prodemy.Backend.model.response.CategoriesResponse;

public interface CategoriesService {

    List<CategoriesResponse> getAllCategories(Map<String, String> params);

    CategoriesResponse getCategoriesById(Long id);

    void addCategory(AddCategoryRequest request);

    void updateCategory(Long id, AddCategoryRequest request);

    void deleteCategory(Long id);
}
