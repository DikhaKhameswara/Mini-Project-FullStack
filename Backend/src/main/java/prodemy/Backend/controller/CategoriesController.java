package prodemy.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import prodemy.Backend.model.response.CategoriesResponse;
import prodemy.Backend.model.response.WebResponse;
import prodemy.Backend.service.CategoriesService;

@RestController
@RequestMapping("/pos/api")
public class CategoriesController {

    @Autowired
    private CategoriesService cService;

    @GetMapping("/listcategories")
    public WebResponse<List<CategoriesResponse>> allCategories() {

        List<CategoriesResponse> categories = cService.getAllCategories();
        return WebResponse.<List<CategoriesResponse>>builder()
                .data(categories)
                .message("Semua Data Kategori")
                .status(HttpStatus.OK)
                .build();
    }
}
