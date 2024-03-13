package prodemy.Backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddTransactionDetailsRequest {

    private Long product_id;
    private Long quantity;
    private Long subtotal;
}
