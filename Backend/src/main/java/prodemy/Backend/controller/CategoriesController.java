package prodemy.Backend.controller;

import java.util.List;
import java.util.NoSuchElementException;

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
import org.springframework.web.server.ResponseStatusException;

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

        // EXECUTE FUNCTION GETALLCATEGORIES FROM CATEGORIES SERVICE
        List<CategoriesResponse> categories = cService.getAllCategories();

        return new ResponseEntity<List<CategoriesResponse>>(categories, HttpStatus.OK);
    }

    @GetMapping("/detailcategory/{id}")
    public ResponseEntity<Object> getDetailCategory(@PathVariable Long id) {
        CategoriesResponse cR = new CategoriesResponse();

        try { // TRYING TO GET CATEGORY BY ID
            cR = cService.getCategoriesById(id);

        } catch (NoSuchElementException e) { // HANDLING ERROR IF CATEGORY NOT FOUND
            return new ResponseEntity<Object>("{}", HttpStatus.OK);

        } catch (Exception e) { // HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(cR, HttpStatus.OK);
    }

    @PostMapping("/addcategory")
    public ResponseEntity<ResponseSuccess> postNewCategory(@RequestBody AddCategoryRequest request) {

        // EXECUTE ADD CATEGORY FROM CATEGORY SERVICE
        cService.addCategory(request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

    @PutMapping("/updatecategory/{id}")
    public ResponseEntity<ResponseSuccess> putUpdateCategory(
            @PathVariable Long id,
            @RequestBody AddCategoryRequest request) {

        // EXECUTE UPDATE CATEGORY FUNCTION FROM CATEGORY SERVICE
        cService.updateCategory(id, request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

    @DeleteMapping("/deletecategory/{id}")
    public ResponseEntity<ResponseSuccess> deleteCategory(@PathVariable Long id) {

        // EXECUTE DELETE FUNCTION ON CATEGORY SERVICE
        cService.deleteCategory(id);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

}
