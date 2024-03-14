package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import prodemy.Backend.model.Categories;
import prodemy.Backend.model.response.CategoriesResponse;
import prodemy.Backend.repository.CategoriesRepository;
import prodemy.Backend.service.CategoriesService;

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
            cR.setCategory_id(c.getCategoryId());
            cR.setCategory_name(c.getCategoryName());

            cRList.add(cR);
        }
        return cRList;
    }

}
