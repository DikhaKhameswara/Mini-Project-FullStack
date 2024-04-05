package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import prodemy.Backend.model.entity.Categories;
import prodemy.Backend.model.request.AddCategoryRequest;
import prodemy.Backend.model.request.SearchCriteria;
import prodemy.Backend.model.response.CategoriesResponse;
import prodemy.Backend.repository.CategoriesRepository;
import prodemy.Backend.service.CategoriesService;
import prodemy.Backend.service.implement.filtering.CategoriesSpecification;

@SuppressWarnings("null")
@Service
public class CategoriesServiceI implements CategoriesService {

    @Autowired
    private CategoriesRepository cRepository;

    @Autowired
    private Validator validator;

    @Override
    @Transactional(readOnly = true)
    public List<CategoriesResponse> getAllCategories(Map<String, String> params) {

        List<CategoriesResponse> cRList = new ArrayList<>();

        List<Specification<Categories>> specs = new ArrayList<>();
        for (String key : params.keySet()) {
            Specification<Categories> spec = CategoriesSpecification
                    .builder()
                    .criteria(new SearchCriteria(key, params.get(key)))
                    .build();
            specs.add(spec);
        }

        // GET ALL CATEGORIES FROM DATABASE
        List<Categories> categories = cRepository.findAll(Specification.allOf(specs));

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
