package prodemy.Backend.service;

import java.util.List;

import prodemy.Backend.model.request.AddUpdateProductRequest;
import prodemy.Backend.model.request.RequestParams;
import prodemy.Backend.model.response.ProductsResponse;

public interface ProductsService {

    List<ProductsResponse> getAllProducts(RequestParams req);

    ProductsResponse getDetailsProduct(Long id);

    void addProduct(AddUpdateProductRequest request);

    void updateproduct(Long id, AddUpdateProductRequest request);

    void deleteProduct(Long id);
}
