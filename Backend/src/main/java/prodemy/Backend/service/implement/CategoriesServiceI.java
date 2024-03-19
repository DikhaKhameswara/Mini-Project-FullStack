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

        try {
            categories = cRepository.findById(id).get();
        } catch (NoSuchElementException e) {
            return pRList;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gagal");
        }

        if (categories.getProducts().size() == 0) {
            return pRList;
        }

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

        return pRList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriesResponse> getAllCategories() {
        List<Categories> categories = cRepository.findAll();

        List<CategoriesResponse> cRList = new ArrayList<>();

        for (Categories c : categories) {
            CategoriesResponse cR = new CategoriesResponse();
            cR.setCategory_id(c.getId());
            cR.setCategory_name(c.getName());
            cR.setTotal_products(Long.valueOf(c.getProducts().size()));

            cRList.add(cR);
        }
        return cRList;
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriesResponse getCategoriesById(Long id) {

        Categories category = cRepository.findById(id).get();
        CategoriesResponse cR = new CategoriesResponse();

        cR.setCategory_id(category.getId());
        cR.setCategory_name(category.getName());
        cR.setTotal_products(Long.valueOf(category.getProducts().size()));
        return cR;
    }

    @Override
    @Transactional
    public void addCategory(AddCategoryRequest request) {

        // Categories categories = cRepository.findByName(request.getName());
        Categories newCategories = new Categories();

        Set<ConstraintViolation<Object>> validate = validator.validate(request);

        if (validate.size() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NAMA KATEGORI TIDAK BOLEH KOSONG");
        }
        newCategories.setName(request.getName());
        cRepository.save(newCategories);
    }

    @Override
    @Transactional
    public void updateCategory(Long id, AddCategoryRequest request) {

        Categories update = cRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "ID KATEGORI TIDAK DAPAT DITEMUKAN"));

        update.setName(request.getName());
        cRepository.save(update);
    }

    @Override
    public void deleteCategory(Long id) {

        Categories categories = cRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID KATEGORI TIDAK TERDAFTAR"));
        if (categories.getProducts().size() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "KATEGORI MASIH MEMILIKI PRODUK");
        }
        cRepository.delete(categories);

    }

}
