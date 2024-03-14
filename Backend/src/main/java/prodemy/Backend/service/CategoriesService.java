package prodemy.Backend.service;

import java.util.List;

import prodemy.Backend.model.response.CategoriesResponse;

public interface CategoriesService {

    List<CategoriesResponse> getAllCategories();
}
