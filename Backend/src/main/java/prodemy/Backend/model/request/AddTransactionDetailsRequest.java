package prodemy.Backend.model.request;

import jakarta.validation.constraints.NotNull;
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

    @NotNull
    @Positive
    private Long product_id;

    @NotNull
    @Positive
    private Long quantity;

    @NotNull
    @Positive
    private Long subtotal;
}
