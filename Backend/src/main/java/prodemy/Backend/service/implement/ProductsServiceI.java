package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import lombok.extern.slf4j.Slf4j;
import prodemy.Backend.model.entity.Categories;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.request.AddUpdateProductRequest;
import prodemy.Backend.model.response.ProductsResponse;
import prodemy.Backend.repository.CategoriesRepository;
import prodemy.Backend.repository.ProductsRepository;
import prodemy.Backend.service.ProductsService;

@SuppressWarnings("null")
@Service
@Slf4j
public class ProductsServiceI implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private Validator validator;

    @Override
    @Transactional
    public List<ProductsResponse> getAllProducts(String titleSearch, String sortBy, String sortOrder) {

        List<ProductsResponse> pR = new ArrayList<>();

        List<Products> products = new ArrayList<>();

        Sort sort;
        if (sortBy != null) {
            if (sortBy.equalsIgnoreCase("title") || sortBy.equalsIgnoreCase("price")) {
                if (sortOrder.equalsIgnoreCase("asc") || sortOrder.equalsIgnoreCase("desc")) {
                    sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending();
                    if (titleSearch == null) {
                        products = productsRepository.findAll(sort);
                    } else {
                        titleSearch = "%" + titleSearch + "%";
                        products = productsRepository.findByTitleLike(titleSearch, sort).orElse(products);
                    }
                } else {
                    return pR;
                }
            } else {
                return pR;
            }

        } else {
            products = productsRepository.findAll();

            if (products.size() == 0) {
                return pR;
            }
        }

        // titleSearch = "%" + titleSearch + "%";

        // try {
        // if (categoryId != null) {
        // Long cId = Long.valueOf(categoryId);
        // if (titleSearch.equalsIgnoreCase("%null%")) {
        // products = productsRepository.findByCategory_Id(cId, sort).orElse(products);
        // } else {
        // products = productsRepository.findByTitleLikeAndCategory_Id(titleSearch, cId,
        // sort)
        // .orElse(products);
        // }
        // } else if (titleSearch.equalsIgnoreCase("%null%")) {
        // products = productsRepository.findAll(sort);
        // } else {
        // products = productsRepository.findByTitleLike(titleSearch,
        // sort).orElse(products);
        // }
        // } catch (Exception e) {
        // // TODO
        // System.out.println(e);
        // }

        for (Products product : products) {
            ProductsResponse p = new ProductsResponse();
            p.setId(product.getId());
            p.setTitle(product.getTitle());
            p.setImage(product.getImage());
            p.setPrice(product.getPrice());
            p.setCategory_id(product.getCategory().getId());
            p.setCategory_name(product.getCategory().getName());

            pR.add(p);
        }

        return pR;
    }

    @Override
    @Transactional
    public ProductsResponse getDetailsProduct(Long id) {
        // Products product = new Products();
        ProductsResponse pR = new ProductsResponse();

        Products product = productsRepository.findById(id).get();
        // try {
        // product = productsRepository.findById(id).get();
        // } catch (NoSuchElementException e) {
        // throw new NoSuchElementException();
        // }

        pR.setId(product.getId());
        pR.setTitle(product.getTitle());
        pR.setImage(product.getImage());
        pR.setPrice(product.getPrice());
        pR.setCategory_id(product.getCategory().getId());
        pR.setCategory_name(product.getCategory().getName());

        return pR;
    }

    @Override
    @Transactional
    public void addProduct(AddUpdateProductRequest request) {
        Products products = new Products();

        Categories cat = new Categories();

        try {
            cat = categoriesRepository.findById(request.getCategory_id()).get();
        } catch (NoSuchElementException e) {
            // TODO: handle exception
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID Kategori Tidak Ditemukan");
        }

        Set<ConstraintViolation<AddUpdateProductRequest>> cViolations = validator.validate(request);

        if (cViolations.size() != 0) {
            throw new ConstraintViolationException(cViolations);
        }

        products.setTitle(request.getTitle());
        products.setImage(request.getImage());
        products.setPrice(request.getPrice());
        products.setCategory(cat);

        try {
            productsRepository.save(products);
        } catch (Exception e) {
            // TODO: handle exception
        }

    }

    @Override
    @Transactional
    public void updateproduct(Long id, AddUpdateProductRequest request) {

        Categories cat = new Categories();
        Products products = new Products();

        try {
            cat = categoriesRepository.findById(request.getCategory_id()).get();
            products = productsRepository.getReferenceById(id);
        } catch (NoSuchElementException e) {
            // TODO: handle exception
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "ID Kategori Tidak Ditemukan");
        }

        Set<ConstraintViolation<AddUpdateProductRequest>> cViolations = validator.validate(request);

        if (cViolations.size() != 0) {
            throw new ConstraintViolationException(cViolations);
        }

        products.setTitle(request.getTitle());
        products.setImage(request.getImage());
        products.setPrice(request.getPrice());
        products.setCategory(cat);

        productsRepository.save(products);

    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {

        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID TIDAK BOLEH KOSONG");
        }

        Products products = productsRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "ID PRODUK TIDAK DAPAT DITEMUKAN"));

        if (products.getTransactionDetails().size() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "PRODUK SUDAH TERCANTUM DI TRANSAKSI");
        }

        productsRepository.delete(products);
        // try {
        // products = productsRepository.getReferenceById(id);
        // } catch (Exception e) {
        // // TODO: handle exception
        // }

        // products.setCategory(null);
        // try {
        // productsRepository.delete(products);
        // } catch (Exception e) {
        // // TODO: handle exception
        // }
    }

}
