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
import lombok.extern.slf4j.Slf4j;
import prodemy.Backend.model.entity.Products;
import prodemy.Backend.model.entity.TransactionDetails;
import prodemy.Backend.model.entity.Transactions;
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
@Slf4j
public class TransactionsServiceI implements TransactionsService {

    @Autowired
    private TransactionsRepository tRepository;

    @Autowired
    private TransactionDetailsRepository tDetailsRepository;

    @Autowired
    private ProductsRepository pRepository;

    @Autowired
    private Validator validator;

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

        // VALIDATION FOR TRANSACTION_DETAILS OF EACH PRODUCTS
        Set<ConstraintViolation<AddTransactionDetailsRequest>> cViolationsTDR = new HashSet<>();
        for (AddTransactionDetailsRequest tDetails : request.getTransaction_details()) {

            log.info("loop");

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

        // SET DATE ON TRANSACTION
        tr.setTransactionsDate(new Date());

        // SET TOTAL_PAY AND TOTAL_AMOUNT ON TRANSACTION
        tr.setTotalPay(request.getTotal_pay());
        tr.setTotalAmount(request.getTotal_amount());

        List<TransactionDetails> tdList = new ArrayList<>();

        // SET TRANSACTION_DETAILS OF EACH PRODUCT AND ADD TO TRANSACTION
        for (AddTransactionDetailsRequest tDetails : request.getTransaction_details()) {
            TransactionDetails td = new TransactionDetails();

            Products products = pRepository.findById(tDetails.getProduct_id())
                    .orElseThrow(
                            () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID PRODUK TIDAK DITEMUKAN"));
            td.setProductsId(products);
            td.setQuantity(tDetails.getQuantity());
            td.setSubtotal(tDetails.getSubtotal());
            td.setTransactionId(tr);

            tdList.add(td);
        }
        tr.setTransactionDetails(tdList);

        // SAVE TRANSACTION TO DATABASE
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
