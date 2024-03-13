package prodemy.Backend.model.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddTransactionsRequest {

    private Long total_amount;
    private Long total_pay;
    private List<AddTransactionDetailsRequest> transaction_details;
}
