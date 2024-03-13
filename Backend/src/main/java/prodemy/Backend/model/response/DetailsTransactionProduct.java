package prodemy.Backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetailsTransactionProduct {

    private Long product_id;
    private String product_title;
    private Long product_price;
    private Long product_quantity;
    private Long product_subtotal;

}
