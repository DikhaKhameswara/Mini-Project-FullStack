package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import prodemy.Backend.model.entity.Categories;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.request.AddCategoryRequest;
import prodemy.Backend.model.response.CategoriesResponse;
import prodemy.Backend.model.response.ProductsResponse;
import prodemy.Backend.repository.CategoriesRepository;
import prodemy.Backend.service.CategoriesService;

@SuppressWarnings("null")
@Service
public class CategoriesServiceI implements CategoriesService {

    @Autowired
    private CategoriesRepository cRepository;

    @Autowired
    private Validator validator;

    @Override
    @Transactional(readOnly = true)
    public List<ProductsResponse> getAllProductsByCategoryId(Long id) {

        Categories categories = new Categories();
        List<ProductsResponse> pRList = new ArrayList<>();

        try { // TRYING TO GET DATA CATEGORY BY ID FROM DATABASE
            categories = cRepository.findById(id).get();

        } catch (NoSuchElementException e) { // HANDLING ERROR WHEN CATEGORIES VALUE IS NULL
            return pRList;

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        // VALIDATING IF NO PRODUCTS ON SELECTED CATEGORY
        if (categories.getProducts().size() == 0) {
            return pRList;
        }

        // TRANSFORM EACH PRODUCTS TO PRODUCTS RESPONSE
        for (Products products : categories.getProducts()) {
            ProductsResponse pR = new ProductsResponse();
            pR.setId(products.getId());
            pR.setImage(products.getImage());
            pR.setPrice(products.getPrice());
            pR.setTitle(products.getTitle());
            pR.setCategory_id(id);
            pR.setCategory_name(categories.getName());

            pRList.add(pR);
        }

        // RETUN PRODUCTS RESPONSE TO CONTROLLER
        return pRList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriesResponse> getAllCategories() {

        // GET ALL CATEGORIES FROM DATABASE
        List<Categories> categories = cRepository.findAll();

        List<CategoriesResponse> cRList = new ArrayList<>();

        // VALIDATING IF NO CATEGORIES GETTING
        if (categories.size() == 0) {
            return cRList;
        }

        // SET CATEGORIES TO CATEGORIES RESPONSE
        for (Categories c : categories) {
            CategoriesResponse cR = new CategoriesResponse();
            cR.setCategory_id(c.getId());
            cR.setCategory_name(c.getName());
            cR.setTotal_products(Long.valueOf(c.getProducts().size()));

            cRList.add(cR);
        }

        // GET ALL CATEGORIES FROM DATABASE
        return cRList;
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriesResponse getCategoriesById(Long id) {

        // GET CATEGORIES BY ID FROM DATABASE
        Categories category = cRepository.findById(id).get();

        CategoriesResponse cR = new CategoriesResponse();

        // SET CATEGORIES TO CATEGORIES RESPONSE
        cR.setCategory_id(category.getId());
        cR.setCategory_name(category.getName());
        cR.setTotal_products(Long.valueOf(category.getProducts().size()));

        // RETURN CATEGORIES RESPONSE TO CONTROLLER
        return cR;
    }

    @Override
    @Transactional
    public void addCategory(AddCategoryRequest request) {

        Categories newCategories = new Categories();

        // VALIDATING REQUEST CATEGORIES LIKE @NOT EMPTY
        Set<ConstraintViolation<Object>> validate = validator.validate(request);

        if (validate.size() != 0) { // EXCEQUTE WHEN VALIDATION HAS ISSUE
            throw new ConstraintViolationException(validate);
        }

        // SET NAME OF NEW CATEGORY
        newCategories.setName(request.getName());

        try { // TRY TO SAVE NEW CATEGORY TO DATABASE
            cRepository.save(newCategories);

        } catch (Exception e) {// HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    @Transactional
    public void updateCategory(Long id, AddCategoryRequest request) {

        // GET CATEGORY BY ID FROM DATABASE AND HANDLING IF CATEGORY IS NULL
        Categories update = cRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "KATEGORI TIDAK DITEMUKAN"));

        // VALIDATING REQUEST CATEGORIES LIKE @NOT EMPTY
        Set<ConstraintViolation<Object>> validate = validator.validate(request);

        if (validate.size() != 0) { // EXCEQUTE WHEN VALIDATION HAS ISSUE
            throw new ConstraintViolationException(validate);
        }

        // SET NEW NAME TO UPDATE CATEGORIES
        update.setName(request.getName());

        try { // TRYING TO SAVE UPDATE CATEGORY TO DATABASE
            cRepository.save(update);

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public void deleteCategory(Long id) {

        // GETTING CATEGORIES FROM DATABASE AND HANDLING IF CATEGORY IS NOT FOUND
        Categories categories = cRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "ID KATEGORI TIDAK TERDAFTAR"));

        // VALIDATING IF CATEGORY HAS PRODUCTS THAT CANN'T BE REMOVED
        if (categories.getProducts().size() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "KATEGORI MASIH MEMILIKI PRODUK");
        }

        try { // TRYING TO DELETE CATEGORIES
            cRepository.delete(categories);

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

}
