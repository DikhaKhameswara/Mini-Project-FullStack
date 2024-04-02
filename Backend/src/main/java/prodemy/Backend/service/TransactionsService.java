package prodemy.Backend.service;

import java.util.List;

import prodemy.Backend.model.request.AddTransactionsRequest;
import prodemy.Backend.model.response.DetailsTransactionResponse;
import prodemy.Backend.model.response.TransactionsResponse;

public interface TransactionsService {

    void addTransactionDetails(AddTransactionsRequest request);

    List<TransactionsResponse> getAllTransactions(List<String> products);

    DetailsTransactionResponse getTransactionsById(Long id);
}
