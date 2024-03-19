package prodemy.Backend.model.request;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddUpdateProductRequest {

    @NotEmpty
    @Size(max = 255)
    private String title;

    @NotEmpty
    @Size(max = 255)
    @URL(regexp = "^(http|ftp).*")
    private String image;

    @Min(value = 0L)
    private Long price;

    @Min(value = 0L)
    private Long category_id;
}
