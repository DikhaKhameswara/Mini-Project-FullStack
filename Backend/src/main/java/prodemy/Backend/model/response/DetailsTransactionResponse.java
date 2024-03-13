package prodemy.Backend.model.response;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailsTransactionResponse {

    private Date transaction_date;
    private Long transaction_id;
    private Long total_pay;
    private Long total_amount;
    private List<DetailsTransactionProduct> product_details_transaction;
}
