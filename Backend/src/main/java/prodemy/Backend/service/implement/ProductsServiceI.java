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
import prodemy.Backend.model.entity.Categories;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.request.AddUpdateProductRequest;
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

    @Autowired
    private Validator validator;

    @Override
    @Transactional(readOnly = true)
    public List<ProductsResponse> getAllProducts(String titleSearch, String sortBy, String sortOrder) {

        List<ProductsResponse> pR = new ArrayList<>();

        List<Products> products = new ArrayList<>();

        Sort sort;
        if (sortBy != null) { // GET DATA FROM DATABASE WITH SORTING VALUE
            if (sortBy.equalsIgnoreCase("title") || sortBy.equalsIgnoreCase("price")) {
                if (sortOrder.equalsIgnoreCase("asc") || sortOrder.equalsIgnoreCase("desc")) {
                    sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending();
                    if (titleSearch == null) { // GET DATA FROM DATABASE IF NO TITLE SEARCH INPUT
                        products = productsRepository.findAll(sort);
                    } else { // GET DATA FROM DATABASE WITH TITLE SEARCH
                        titleSearch = "%" + titleSearch + "%";
                        products = productsRepository.findByTitleLike(titleSearch, sort).orElse(products);
                    }
                } else { // RETURN IF SORT ORDER NOT ONE OF (ASC, DESC)
                    return pR;
                }
            } else { // RETURN IF SORT BY NOT ONE OF (TITLE, PRICE)
                return pR;
            }

        } else { // GET ALL DATA FROM DATABASE WITHOUT SORTING
            products = productsRepository.findAll();

            if (products.size() == 0) { // RETURN LIST PRODUCT RESPONSE IF NO PRODUCTS ON DATABASE
                return pR;
            }
        }

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
    @Transactional(readOnly = true)
    public ProductsResponse getDetailsProduct(Long id) {
        ProductsResponse pR = new ProductsResponse();

        // GET DATA FROM DATABASE BY ID
        Products product = productsRepository.findById(id).get();

        // SET DTO FROM DATABASE TO PRODUCT RESPONSE
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

        // VALIDATING REQUEST LIKE @NOT EMPYTY ETC
        Set<ConstraintViolation<AddUpdateProductRequest>> cViolations = validator.validate(request);
        if (cViolations.size() != 0) {
            throw new ConstraintViolationException(cViolations);
        }

        try { // GET DATA CATEGORY FROM DATABASE
            cat = categoriesRepository.findById(request.getCategory_id()).get();

        } catch (IllegalArgumentException e) { // HANDLING ERROR IF ID IS NULL
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "KATEGORI ID TIDAK BOLEH KOSONG");

        } catch (NoSuchElementException e) { // HANDLING ERROR WHEN KATEGORI NOT FOUND
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "KATEGORI ID TIDAK DITEMUKAN");

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        // SET DTO TO PRODUCTS BEFORE SAVE
        products.setTitle(request.getTitle().toUpperCase());
        products.setImage(request.getImage());
        products.setPrice(request.getPrice());
        products.setCategory(cat);

        try {// SAVING TO DATABASE
            productsRepository.save(products);

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

    @Override
    @Transactional
    public void updateproduct(Long id, AddUpdateProductRequest request) {

        Categories cat = new Categories();
        Products products = new Products();

        // VALIDATING REQUEST LIKE @NOT EMPTY ETC
        Set<ConstraintViolation<AddUpdateProductRequest>> cViolations = validator.validate(request);
        if (cViolations.size() != 0) {
            throw new ConstraintViolationException(cViolations);
        }

        try { // TRY TO GET CATEGORY BY CATEGORY ID AND PRODUCTS BY PRODUCTS ID
            cat = categoriesRepository.findById(request.getCategory_id()).get();
            products = productsRepository.getReferenceById(id);

        } catch (NoSuchElementException e) {// HANDLING ERROR WHEN CATEGORY OR PRODUCTS NOT FOUND
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "DATA TIDAK DITEMUKAN");
        }

        // SET DTO TO PRODUCTS BEFORE SAVE
        products.setTitle(request.getTitle());
        products.setImage(request.getImage());
        products.setPrice(request.getPrice());
        products.setCategory(cat);

        try { // TRY TO SAVE UPDATE PRODUCTS
            productsRepository.save(products);
        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {

        // VALIDATING FOR ID NOT NULL
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID TIDAK BOLEH KOSONG");
        }

        // GET DATA FROM DATABASE AND HANDLING IF DATA IS NOT FOUND
        Products products = productsRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "PRODUK TIDAK DAPAT DITEMUKAN"));

        // HANDLING IF PRODUCTS HAS BEEN SOLD THAT'S CANNOT BE REMOVED
        if (products.getTransactionDetails().size() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "PRODUK SUDAH PERNAH TERJUAL");
        }

        // SET CATEGORY TO NULL
        products.setCategory(null);
        if (products.getCategory() != null) { // HANDLING WHEN CATEGORY NOT NULL
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "PRODUK TIDAK BISA DIHAPUS");
        }

        try { // TRYING TO DELETE
            productsRepository.delete(products);

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

}
