package prodemy.Backend.model.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddTransactionsRequest {

    @Positive(message = "total_amount harus > 0")
    private Long total_amount;

    @Positive(message = "total_pay harus > 0")
    private Long total_pay;

    @NotEmpty(message = "transaction_details TIDAK BOLEH KOSONG")
    private List<AddTransactionDetailsRequest> transaction_details;
}
