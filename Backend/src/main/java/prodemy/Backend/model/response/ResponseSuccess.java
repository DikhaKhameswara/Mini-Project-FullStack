package prodemy.Backend.model.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseSuccess {

    private final String status = "OK";
    private final String message = "success";

}
