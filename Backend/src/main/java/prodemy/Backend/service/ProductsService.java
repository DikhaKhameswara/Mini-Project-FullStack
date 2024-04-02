package prodemy.Backend.service;

import java.util.List;
import java.util.Map;

import prodemy.Backend.model.request.AddUpdateProductRequest;
import prodemy.Backend.model.response.ProductsResponse;

public interface ProductsService {

    List<ProductsResponse> getAllProducts(Map<String, Object> params);

    ProductsResponse getDetailsProduct(Long id);

    void addProduct(AddUpdateProductRequest request);

    void updateproduct(Long id, AddUpdateProductRequest request);

    void deleteProduct(Long id);
}
