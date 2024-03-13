package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import prodemy.Backend.model.Products;
import prodemy.Backend.model.TransactionDetails;
import prodemy.Backend.model.Transactions;
import prodemy.Backend.model.request.AddTransactionDetailsRequest;
import prodemy.Backend.model.request.AddTransactionsRequest;
import prodemy.Backend.model.response.DetailsTransactionProduct;
import prodemy.Backend.model.response.DetailsTransactionResponse;
import prodemy.Backend.model.response.TransactionsResponse;
import prodemy.Backend.repository.ProductsRepository;
import prodemy.Backend.repository.TransactionDetailsRepository;
import prodemy.Backend.repository.TransactionsRepository;
import prodemy.Backend.service.TransactionsService;

@SuppressWarnings("null")
@Service
public class TransactionsServiceI implements TransactionsService {

    @Autowired
    private TransactionsRepository tRepository;

    @Autowired
    TransactionDetailsRepository tDetailsRepository;

    @Autowired
    ProductsRepository pRepository;

    @Override
    public void addTransactionDetails(AddTransactionsRequest request) {
        Transactions tr = new Transactions();

        tr.setTransactionsDate(new Date());
        tr.setTotalPay(request.getTotal_pay());
        tr.setTotalAmount(request.getTotal_amount());

        List<TransactionDetails> tdList = new ArrayList<>();
        for (AddTransactionDetailsRequest tDetails : request.getTransaction_details()) {
            TransactionDetails td = new TransactionDetails();

            Products products = pRepository.findById(tDetails.getProduct_id()).get();
            td.setProductsId(products);
            td.setQuantity(tDetails.getQuantity());
            td.setSubtotal(tDetails.getSubtotal());
            td.setTransactionId(tr);

            tdList.add(td);
        }
        tr.setTransactionDetails(tdList);

        tRepository.save(tr);

    }

    @Override
    public List<TransactionsResponse> getAllTransactions() {

        List<Transactions> transactions = tRepository.findAll();
        List<TransactionsResponse> tResponses = new ArrayList<>();

        for (Transactions t : transactions) {
            TransactionsResponse tR = new TransactionsResponse();
            tR.setTransaction_id(t.getId());
            tR.setTransaction_date(t.getTransactionsDate());
            tR.setTotal_pay(t.getTotalPay());
            tR.setTotal_amount(t.getTotalAmount());

            tResponses.add(tR);
        }

        return tResponses;
    }

    @Override
    public DetailsTransactionResponse getTransactionsById(Long id) {
        Transactions t = tRepository.findById(id).get();

        DetailsTransactionResponse dTResponse = new DetailsTransactionResponse();
        dTResponse.setTransaction_id(t.getId());
        dTResponse.setTransaction_date(t.getTransactionsDate());
        dTResponse.setTotal_pay(t.getTotalPay());
        dTResponse.setTotal_amount(t.getTotalAmount());

        List<DetailsTransactionProduct> dTPList = new ArrayList<>();

        for (TransactionDetails tD : t.getTransactionDetails()) {
            DetailsTransactionProduct dTP = new DetailsTransactionProduct();
            dTP.setProduct_id(tD.getProductsId().getId());
            dTP.setProduct_title(tD.getProductsId().getTitle());
            dTP.setProduct_price(tD.getProductsId().getPrice());
            dTP.setProduct_quantity(tD.getQuantity());
            dTP.setProduct_subtotal(tD.getSubtotal());

            dTPList.add(dTP);
        }
        dTResponse.setProduct_details_transaction(dTPList);
        return dTResponse;
    }

}
