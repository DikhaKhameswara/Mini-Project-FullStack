package prodemy.Backend.service;

import java.util.List;
import java.util.Map;

import prodemy.Backend.model.request.AddTransactionsRequest;
import prodemy.Backend.model.response.DetailsTransactionResponse;
import prodemy.Backend.model.response.TransactionsResponse;

public interface TransactionsService {

    void addTransactionDetails(AddTransactionsRequest request);

    List<TransactionsResponse> getAllTransactions(Map<String, String> params);

    DetailsTransactionResponse getTransactionsById(Long id);
}
