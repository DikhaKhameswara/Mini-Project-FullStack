package prodemy.Backend.controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<List<TransactionsResponse>> allTransactions(
            @RequestParam Map<String, String> params) {

        List<TransactionsResponse> tR = tService.getAllTransactions(params);

        return new ResponseEntity<List<TransactionsResponse>>(tR, HttpStatus.OK);
    }

    @GetMapping(path = "/detailtransaction/{id}")
    public ResponseEntity<Object> transactionsById(@PathVariable Long id) {
        DetailsTransactionResponse tR = new DetailsTransactionResponse();

        try {
            tR = tService.getTransactionsById(id);

        } catch (NoSuchElementException e) { // HANDLER IF tR VALUE IS NULL
            return new ResponseEntity<Object>("{}", HttpStatus.OK);

        } catch (Exception e) { // HANDLER FOR GLOBAL CASE EXCEPTION
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(tR, HttpStatus.OK);
    }

    @PostMapping("/addtransaction")
    public ResponseEntity<ResponseSuccess> postAddTransactions(@RequestBody AddTransactionsRequest request) {

        tService.addTransactionDetails(request);

        return new ResponseEntity<ResponseSuccess>(
                ResponseSuccess.builder().build(),
                HttpStatus.OK);

    }
}
