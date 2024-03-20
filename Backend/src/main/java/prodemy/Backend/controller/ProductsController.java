package prodemy.Backend.controller;

import java.util.ArrayList;
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

import jakarta.servlet.http.HttpServletRequest;
import prodemy.Backend.model.request.AddUpdateProductRequest;
import prodemy.Backend.model.response.ProductsResponse;
import prodemy.Backend.model.response.ResponseSuccess;
import prodemy.Backend.service.CategoriesService;
import prodemy.Backend.service.ProductsService;

@RestController
@RequestMapping("/pos/api")
public class ProductsController {

    @Autowired
    ProductsService productsService;

    @Autowired
    CategoriesService categoriesService;

    @GetMapping("/listproduct")
    public ResponseEntity<List<ProductsResponse>> getAllProducts(HttpServletRequest request) {

        // GET ALL PARAMS FROM API
        String titleSearch = request.getParameter("title");
        String sortBy = request.getParameter("sort_by");
        String sortOrder = request.getParameter("sort_order");
        String cId = request.getParameter("category_id");

        List<ProductsResponse> pR = new ArrayList<>();

        if (cId != null) { // EXECUTING WHEN CATEGORY_ID NOT NULL
            try {
                Long categoryId = Long.valueOf(request.getParameter("category_id"));
                pR = categoriesService.getAllProductsByCategoryId(categoryId);

            } catch (NumberFormatException e) {// HANDLING WHEN CATEGORY_ID IS NOT A NUMBER
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "KATEGORI ID BUKAN NUMERIK");
            }
        } else { // EXECUTING WHEN USING SEARCHING AND/OR SORTING
            pR = productsService.getAllProducts(titleSearch, sortBy, sortOrder);
        }

        return new ResponseEntity<List<ProductsResponse>>(pR, HttpStatus.OK);
    }

    @GetMapping("/detailproduct/{id}")
    public ResponseEntity<Object> getDetailProduct(@PathVariable Long id) {

        ProductsResponse pR = new ProductsResponse();

        try {// EXECUTING WHEN CATEGORY_ID NOT NULL
            pR = productsService.getDetailsProduct(id);

        } catch (NoSuchElementException e) { // CATCH HANDLING WHEN PRODUCT_RESPONSE VALUE IS NULL
            return new ResponseEntity<Object>("{}", HttpStatus.OK);

        } catch (Exception e) {// HANDLING GLOBAL ERROR
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(pR, HttpStatus.OK);
    }

    @PostMapping("/addproduct")
    public ResponseEntity<ResponseSuccess> postAddProduct(@RequestBody AddUpdateProductRequest request) {

        // EXECUTING ADDPRODUCT FUNCTION FROM SERVICE
        productsService.addProduct(request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<ResponseSuccess> putUpdateProduct(@RequestBody AddUpdateProductRequest request,
            @PathVariable Long id) {

        // EXECUTING UPDATE FUNCTION FROM SERVICE
        productsService.updateproduct(id, request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<ResponseSuccess> deleteDeleteProduct(@PathVariable Long id) {

        // EXECUTING DELETE FUNCTION FROM SERVICE
        productsService.deleteProduct(id);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

}
