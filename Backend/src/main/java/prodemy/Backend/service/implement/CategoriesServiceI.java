package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import prodemy.Backend.model.Categories;
import prodemy.Backend.model.request.AddCategoryRequest;
import prodemy.Backend.model.response.CategoriesResponse;
import prodemy.Backend.repository.CategoriesRepository;
import prodemy.Backend.service.CategoriesService;

@SuppressWarnings("null")
@Service
public class CategoriesServiceI implements CategoriesService {

    @Autowired
    private CategoriesRepository cRepository;

    @Override
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
    public CategoriesResponse getCategoriesById(Long id) {
        Categories category = cRepository.findById(id).orElseThrow();
        CategoriesResponse cR = new CategoriesResponse();
        cR.setCategory_id(category.getId());
        cR.setCategory_name(category.getName());
        cR.setTotal_products(Long.valueOf(category.getProducts().size()));
        return cR;
    }

    @Override
    public void addCategory(AddCategoryRequest request) {

        // Categories categories = cRepository.findByName(request.getName());
        Categories newCategories = new Categories();
        newCategories.setName(request.getName());
        cRepository.save(newCategories);
    }

    @Override
    public void updateCategory(Long id, AddCategoryRequest request) {
        Categories update = cRepository.getReferenceById(id);
        update.setName(request.getName());
        cRepository.save(update);
    }

    @Override
    public void deleteCategory(Long id) {

        Categories categories = cRepository.getReferenceById(id);
        cRepository.delete(categories);

    }

}
