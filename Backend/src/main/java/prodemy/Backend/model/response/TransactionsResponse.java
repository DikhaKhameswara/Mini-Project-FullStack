package prodemy.Backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionsResponse {

    private String transaction_date;
    private Long transaction_id;
    private Long total_pay;
    private Long total_amount;
}
