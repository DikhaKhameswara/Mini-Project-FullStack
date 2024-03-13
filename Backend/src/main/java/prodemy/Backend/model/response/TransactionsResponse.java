package prodemy.Backend.model.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionsResponse {

    private Date transaction_date;
    private Long transaction_id;
    private Long total_pay;
    private Long total_amount;
}
