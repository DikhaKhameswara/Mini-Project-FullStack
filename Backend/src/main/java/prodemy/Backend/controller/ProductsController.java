package prodemy.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import prodemy.Backend.model.response.WebResponse;
import prodemy.Backend.service.ProductsService;

@RestController
@RequestMapping("/pos/api")
public class ProductsController {

    @Autowired
    ProductsService productsService;

    @GetMapping("/listproduct")
    public WebResponse<List<ProductsResponse>> getAllProducts(HttpServletRequest request) {

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

        return WebResponse.<List<ProductsResponse>>builder()
                .data(pR)
                .message("Data Semua Produk")
                .status(HttpStatus.OK)
                .build();
    }

    @GetMapping("/detailproduct/{id}")
    public WebResponse<ProductsResponse> getDetailProduct(@PathVariable Long id) {

        ProductsResponse pR = productsService.getDetailsProduct(id);
        return WebResponse.<ProductsResponse>builder()
                .data(pR)
                .status(HttpStatus.OK)
                .message("Detail Produk id:" + id)
                .build();
    }

    @PostMapping("/addproduct")
    public WebResponse<String> postAddProduct(@RequestBody AddUpdateProductRequest request,
            HttpServletRequest request2) {

        productsService.addProduct(request);

        return WebResponse.<String>builder()
                .data("Add Product Berhasil")
                .message("success")
                .status(HttpStatus.OK)
                .build();
    }

    @PutMapping("/updateproduct/{id}")
    public WebResponse<String> putUpdateProduct(@RequestBody AddUpdateProductRequest request, @PathVariable Long id) {

        productsService.updateproduct(id, request);

        return WebResponse.<String>builder()
                .data("Update Product Berhasil")
                .message("success")
                .status(HttpStatus.OK)
                .build();
    }

    @DeleteMapping("/deleteproduct/{id}")
    public WebResponse<String> deleteDeleteProduct(@PathVariable Long id) {

        productsService.deleteProduct(id);

        return WebResponse.<String>builder()
                .data("Delete Product Berhasil")
                .message("success")
                .status(HttpStatus.OK)
                .build();
    }

}
