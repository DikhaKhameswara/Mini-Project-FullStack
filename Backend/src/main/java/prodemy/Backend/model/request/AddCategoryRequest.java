package prodemy.Backend.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddCategoryRequest {

    @NotBlank(message = "NAMA KATEGORI TIDAK BOLEH KOSONG")
    private String name;
}
