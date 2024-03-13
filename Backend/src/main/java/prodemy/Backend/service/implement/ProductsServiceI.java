package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import prodemy.Backend.model.Categories;
import prodemy.Backend.model.Products;
import prodemy.Backend.model.request.AddUpdateProductRequest;
import prodemy.Backend.model.request.RequestParams;
import prodemy.Backend.model.response.ProductsResponse;
import prodemy.Backend.repository.CategoriesRepository;
import prodemy.Backend.repository.ProductsRepository;
import prodemy.Backend.service.ProductsService;

@SuppressWarnings("null")
@Service
public class ProductsServiceI implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Override
    public List<ProductsResponse> getAllProducts(RequestParams request) {

        String titleSearch = "%" + request.getTitleSearch() + "%";
        String categoryId = request.getCategoryId();
        String sortBy = request.getSortBy();
        String sortAsc = request.getSortAsc();

        Sort sort;
        if (sortAsc == null) {
            sort = Sort.by("id").ascending();
        } else {
            sort = sortAsc.equalsIgnoreCase("true") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        }

        List<Products> products;
        if (categoryId != null) {
            Long cId = Long.valueOf(categoryId);
            if (titleSearch.equalsIgnoreCase("%null%")) {
                products = productsRepository.findByCategory_CategoryId(cId, sort);
            } else {
                products = productsRepository.findByTitleLikeAndCategory_CategoryId(titleSearch, cId, sort);
            }
        } else if (titleSearch.equalsIgnoreCase("%null%")) {
            products = productsRepository.findAll(sort);
        } else {
            products = productsRepository.findByTitleLike(titleSearch, sort);
        }

        List<ProductsResponse> pR = new ArrayList<>();
        for (Products product : products) {
            ProductsResponse p = new ProductsResponse();
            p.setId(product.getId());
            p.setTitle(product.getTitle());
            p.setImage(product.getImage());
            p.setPrice(product.getPrice());
            p.setCategory_id(product.getCategory().getCategoryId());
            p.setCategory_name(product.getCategory().getCategoryName());

            pR.add(p);
        }
        return pR;
    }

    @Override
    public ProductsResponse getDetailsProduct(Long id) {
        Products product = new Products();
        try {
            product = productsRepository.findById(id).get();
        } catch (Exception e) {
            // TODO: handle exception
        }
        ProductsResponse pR = new ProductsResponse();
        pR.setId(product.getId());
        pR.setTitle(product.getTitle());
        pR.setImage(product.getImage());
        pR.setPrice(product.getPrice());
        pR.setCategory_id(product.getCategory().getCategoryId());
        pR.setCategory_name(product.getCategory().getCategoryName());
        return pR;
    }

    @Override
    public void addProduct(AddUpdateProductRequest request) {
        Products products = new Products();

        Categories cat = new Categories();

        try {
            cat = categoriesRepository.findById(request.getCategory_id()).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        products.setTitle(request.getTitle());
        products.setImage(request.getImage());
        products.setPrice(request.getPrice());
        products.setCategory(cat);

        productsRepository.save(products);

    }

    @Override
    public void updateproduct(Long id, AddUpdateProductRequest request) {

        Categories cat = new Categories();
        Products products = new Products();
        try {
            cat = categoriesRepository.findById(request.getCategory_id()).get();
            products = productsRepository.getReferenceById(id);
        } catch (Exception e) {
            // TODO: handle exception
        }

        products.setTitle(request.getTitle());
        products.setImage(request.getImage());
        products.setPrice(request.getPrice());
        products.setCategory(cat);

        productsRepository.save(products);

    }

    @Override
    public void deleteProduct(Long id) {

        Products products = new Products();

        try {
            products = productsRepository.getReferenceById(id);
        } catch (Exception e) {
            // TODO: handle exception
        }
        products.setCategory(null);
        productsRepository.delete(products);
    }

}
