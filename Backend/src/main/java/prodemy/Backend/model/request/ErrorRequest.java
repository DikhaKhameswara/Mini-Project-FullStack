package prodemy.Backend.model.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorRequest {

    private final String message = "Salah Bang";
    private final String reason = "Cek Input";

}
