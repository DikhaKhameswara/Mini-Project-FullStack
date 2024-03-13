package prodemy.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import prodemy.Backend.model.request.AddTransactionsRequest;
import prodemy.Backend.model.response.DetailsTransactionResponse;
import prodemy.Backend.model.response.TransactionsResponse;
import prodemy.Backend.model.response.WebResponse;
import prodemy.Backend.service.TransactionsService;

@RestController
@RequestMapping("/pos/api")
public class TransactionsController {

    @Autowired
    private TransactionsService tService;

    @GetMapping("/listtransaction")
    public WebResponse<List<TransactionsResponse>> allTransactions() {
        List<TransactionsResponse> tR = tService.getAllTransactions();

        return WebResponse.<List<TransactionsResponse>>builder()
                .data(tR)
                .message("success")
                .status(HttpStatus.OK)
                .build();
    }

    @GetMapping("/detailtransaction/{id}")
    public WebResponse<DetailsTransactionResponse> transactionsById(@PathVariable Long id) {
        DetailsTransactionResponse tR = tService.getTransactionsById(id);

        return WebResponse.<DetailsTransactionResponse>builder()
                .data(tR)
                .message("success")
                .status(HttpStatus.OK)
                .build();
    }

    @PostMapping("/addtransaction")
    public WebResponse<String> postAddTransactions(@RequestBody AddTransactionsRequest request) {

        tService.addTransactionDetails(request);

        return WebResponse.<String>builder()
                .data("Transaksi Berhasil Ditambahkan")
                .message("success")
                .status(HttpStatus.OK)
                .build();

    }
}
