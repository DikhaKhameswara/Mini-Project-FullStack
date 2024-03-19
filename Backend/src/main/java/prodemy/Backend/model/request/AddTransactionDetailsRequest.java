package prodemy.Backend.model.request;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddTransactionDetailsRequest {

    @Positive
    private Long product_id;

    @Positive
    private Long quantity;

    @Positive
    private Long subtotal;
}
