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

import jakarta.servlet.http.HttpServletRequest;
import prodemy.Backend.model.request.AddUpdateProductRequest;
import prodemy.Backend.model.request.RequestParams;
import prodemy.Backend.model.response.ProductsResponse;
import prodemy.Backend.model.response.ResponseSuccess;
import prodemy.Backend.service.ProductsService;

@RestController
@RequestMapping("/pos/api")
public class ProductsController {

    @Autowired
    ProductsService productsService;

    @GetMapping("/listproduct")
    public ResponseEntity<List<ProductsResponse>> getAllProducts(HttpServletRequest request) {

        String titleSearch = request.getParameter("title");
        String categoryId = request.getParameter("category_id");
        String sortBy = request.getParameter("sort_by");
        String sortAsc = request.getParameter("sort_asc");

        RequestParams req = new RequestParams();
        req.setTitleSearch(titleSearch);
        req.setSortBy(sortBy);
        req.setSortAsc(sortAsc);
        req.setCategoryId(categoryId);

        List<ProductsResponse> pR = productsService.getAllProducts(req);

        return new ResponseEntity<List<ProductsResponse>>(pR, HttpStatus.OK);
    }

    @GetMapping("/detailproduct/{id}")
    public ResponseEntity<ProductsResponse> getDetailProduct(@PathVariable Long id) {

        ProductsResponse pR = productsService.getDetailsProduct(id);
        return new ResponseEntity<ProductsResponse>(pR, HttpStatus.OK);
    }

    @PostMapping("/addproduct")
    public ResponseEntity<ResponseSuccess> postAddProduct(@RequestBody AddUpdateProductRequest request,
            HttpServletRequest request2) {

        productsService.addProduct(request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<ResponseSuccess> putUpdateProduct(@RequestBody AddUpdateProductRequest request,
            @PathVariable Long id) {

        productsService.updateproduct(id, request);
        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<ResponseSuccess> deleteDeleteProduct(@PathVariable Long id) {

        productsService.deleteProduct(id);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);
    }

}
