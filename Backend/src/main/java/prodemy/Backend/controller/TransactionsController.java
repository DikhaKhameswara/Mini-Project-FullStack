package prodemy.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import prodemy.Backend.model.request.AddTransactionsRequest;
import prodemy.Backend.model.response.DetailsTransactionResponse;
import prodemy.Backend.model.response.ResponseSuccess;
import prodemy.Backend.model.response.TransactionsResponse;
import prodemy.Backend.service.TransactionsService;

@RestController
@RequestMapping("/pos/api")
public class TransactionsController {

    @Autowired
    private TransactionsService tService;

    @GetMapping("/listtransaction")
    public ResponseEntity<List<TransactionsResponse>> allTransactions() {
        List<TransactionsResponse> tR = tService.getAllTransactions();

        return new ResponseEntity<List<TransactionsResponse>>(tR, HttpStatus.OK);
    }

    @GetMapping("/detailtransaction/{id}")
    public ResponseEntity<DetailsTransactionResponse> transactionsById(@PathVariable Long id) {
        DetailsTransactionResponse tR = tService.getTransactionsById(id);

        return new ResponseEntity<DetailsTransactionResponse>(tR, HttpStatus.OK);
    }

    @PostMapping("/addtransaction")
    public ResponseEntity<ResponseSuccess> postAddTransactions(@RequestBody AddTransactionsRequest request) {

        tService.addTransactionDetails(request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);

    }
}
