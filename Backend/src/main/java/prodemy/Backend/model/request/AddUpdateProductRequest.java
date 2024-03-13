package prodemy.Backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddUpdateProductRequest {

    private String title;
    private String image;
    private Long price;
    private Long category_id;
}
