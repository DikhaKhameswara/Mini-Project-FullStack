package prodemy.Backend.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @Size(max = 255, message = "NAMA KATEGORI TIDAK BOLEH PANJANG")
    private String name;
}
