package prodemy.Backend.service.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.entity.TransactionDetails;
import prodemy.Backend.model.entity.Transactions;
import prodemy.Backend.model.request.AddTransactionDetailsRequest;
import prodemy.Backend.model.request.AddTransactionsRequest;
import prodemy.Backend.model.response.DetailsTransactionProduct;
import prodemy.Backend.model.response.DetailsTransactionResponse;
import prodemy.Backend.model.response.TransactionsResponse;
import prodemy.Backend.repository.ProductsRepository;
import prodemy.Backend.repository.TransactionsRepository;
import prodemy.Backend.service.TransactionsService;

@SuppressWarnings("null")
@Service
public class TransactionsServiceI implements TransactionsService {

    @Autowired
    private TransactionsRepository tRepository;

    @Autowired
    private ProductsRepository pRepository;

    @Autowired
    private Validator validator;

    @Override
    @Transactional(readOnly = true)
    public List<TransactionsResponse> getAllTransactions() {

        // GET DATA FROM DATABASE
        List<Transactions> transactions = tRepository.findAll();

        // TRANSFORM DATA FROM DATABASE TO RESPONSE
        List<TransactionsResponse> tResponses = new ArrayList<>();
        for (Transactions t : transactions) {
            TransactionsResponse tR = new TransactionsResponse();
            tR.setTransaction_id(t.getId());
            tR.setTransaction_date(t.getTransactionsDate().toString());
            tR.setTotal_pay(t.getTotalPay());
            tR.setTotal_amount(t.getTotalAmount());

            tResponses.add(tR);
        }

        // RETURN DATA RESPONSE TO CONTROLLER
        return tResponses;
    }

    @Override
    @Transactional(readOnly = true)
    public DetailsTransactionResponse getTransactionsById(Long id) {

        // GET DATA FROM DATABASE BY ID
        Transactions t = tRepository.findById(id).get();

        // SET DTO FOR RETURN VALUE
        DetailsTransactionResponse dTResponse = new DetailsTransactionResponse();
        dTResponse.setTransaction_id(t.getId());
        dTResponse.setTransaction_date(t.getTransactionsDate().toString());
        dTResponse.setTotal_pay(t.getTotalPay());
        dTResponse.setTotal_amount(t.getTotalAmount());

        List<DetailsTransactionProduct> dTPList = new ArrayList<>();

        // ADD EACH TRANSACTION_DETAILS TO TRANSACTIONS
        for (TransactionDetails tD : t.getTransactionDetails()) {
            DetailsTransactionProduct dTP = new DetailsTransactionProduct();
            dTP.setProduct_id(tD.getProduct().getId());
            dTP.setProduct_title(tD.getProduct().getTitle());
            dTP.setProduct_price(tD.getProduct().getPrice());
            dTP.setProduct_quantity(tD.getQuantity());
            dTP.setProduct_subtotal(tD.getSubtotal());

            dTPList.add(dTP);
        }
        dTResponse.setProduct_details_transaction(dTPList);

        return dTResponse;
    }

    @Override
    @Transactional
    public void addTransactionDetails(AddTransactionsRequest request) {
        Transactions tr = new Transactions();

        // VALIDATION FOR TRANSACTION LIKE @POSITIVE FOR TOTAL_AMOUNT
        Set<ConstraintViolation<AddTransactionsRequest>> cViolationsTR = validator.validate(request);
        if (cViolationsTR.size() != 0) {
            throw new ConstraintViolationException(cViolationsTR);
        }

        int totalAmount = 0;

        // VALIDATION FOR TRANSACTION_DETAILS TYPE OF EACH PRODUCTS
        Set<ConstraintViolation<AddTransactionDetailsRequest>> cViolationsTDR = new HashSet<>();
        for (AddTransactionDetailsRequest tDetails : request.getTransaction_details()) {

            cViolationsTDR = validator.validate(tDetails);
            if (cViolationsTDR.size() != 0) {
                throw new ConstraintViolationException(cViolationsTDR);
            }
            totalAmount += tDetails.getSubtotal();
        }

        // VALIDATING IF TOTAL_AMOUNT == TOTAL SUBTOTAL EACH PRODUCTS
        if (!(totalAmount == request.getTotal_amount())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "TOTAL SUBTOTAL TIDAK SESUAI DENGAN TOTAL AMOUNT");
        }

        // TOTAL PAY LESS THAN TOTAL PRICE
        if (totalAmount > request.getTotal_pay()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "PEMBAYARAN BELUM MELEBIHI TOTAL AMOUNT");
        }

        // VALIDATING PRODUCT FROM REQUEST TO PRODUCT FROM DATABASE
        ArrayList<Long> idProducts = new ArrayList<>();
        request.getTransaction_details().forEach(tD -> idProducts.add(tD.getProduct_id()));

        // GETTING DATA FROM DATABASE
        List<Products> products = pRepository.findAllById(idProducts);

        // LENGTH OF TRANSACTION DETAILS MUST BE EQUAL TO PRODUCTS LENGTH
        if (products.size() != idProducts.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID PRODUK TIDAK DITEMUKAN");
        }

        List<TransactionDetails> tdList = new ArrayList<>();

        // SET TRANSACTION_DETAILS OF EACH PRODUCT THEN ADD TO TRANSACTION
        for (AddTransactionDetailsRequest tDetails : request.getTransaction_details()) {
            TransactionDetails td = new TransactionDetails();

            // FILTERING BY ID PRODUCT TO GET SAME PRODUCT
            Products product = products.stream()
                    .filter(p -> p.getId() == tDetails.getProduct_id())
                    .findFirst().get();

            // VALIDATING PRICE OF EACH SUBTOTAL SHOULD BE EQUAL TO QUANTITY * PRICE PRODUCT
            if (tDetails.getSubtotal() != (tDetails.getQuantity() * product.getPrice())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "SUBTOTAL BERMASALAH");
            }

            // SET EACH PRODUCT
            td.setProduct(product);
            td.setQuantity(tDetails.getQuantity());
            td.setSubtotal(tDetails.getSubtotal());
            td.setTransaction(tr);

            tdList.add(td);
        }
        // SET TRANSACTION DETAILS
        tr.setTransactionDetails(tdList);

        // SET DATE, TOTAL_PAY AND TOTAL_AMOUNT ON TRANSACTION
        tr.setTransactionsDate(new Date());
        tr.setTotalPay(request.getTotal_pay());
        tr.setTotalAmount(request.getTotal_amount());

        // SAVE TRANSACTION TO DATABASE
        tRepository.save(tr);

    }

}
