package prodemy.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import prodemy.Backend.model.request.AddCategoryRequest;
import prodemy.Backend.model.response.CategoriesResponse;
import prodemy.Backend.model.response.ResponseSuccess;
import prodemy.Backend.service.CategoriesService;

@RestController
@RequestMapping("/pos/api")
public class CategoriesController {

    @Autowired
    private CategoriesService cService;

    @GetMapping("/listcategories")
    public ResponseEntity<List<CategoriesResponse>> allCategories() {

        List<CategoriesResponse> categories = cService.getAllCategories();
        return new ResponseEntity<List<CategoriesResponse>>(categories, HttpStatus.OK);
    }

    @GetMapping("/detailcategory/{id}")
    public ResponseEntity<CategoriesResponse> getDetailCategory(@PathVariable Long id) {
        CategoriesResponse cR = cService.getCategoriesById(id);
        return new ResponseEntity<CategoriesResponse>(cR, HttpStatus.OK);
    }

    @PostMapping("/addcategory")
    public ResponseEntity<ResponseSuccess> postNewCategory(@RequestBody AddCategoryRequest request) {
        cService.addCategory(request);
        return new ResponseEntity<ResponseSuccess>(ResponseSuccess.builder().build(), HttpStatus.OK);
    }

    @PutMapping("/updatecategory/{id}")
    public ResponseEntity<ResponseSuccess> putUpdateCategory(
            @PathVariable Long id,
            @RequestBody AddCategoryRequest request) {
        cService.updateCategory(id, request);
        return new ResponseEntity<ResponseSuccess>(ResponseSuccess.builder().build(), HttpStatus.OK);
    }

    @DeleteMapping("/deletecategory/{id}")
    public ResponseEntity<ResponseSuccess> deleteCategory(@PathVariable Long id) {
        cService.deleteCategory(id);
        return new ResponseEntity<ResponseSuccess>(ResponseSuccess.builder().build(), HttpStatus.OK);
    }

}
