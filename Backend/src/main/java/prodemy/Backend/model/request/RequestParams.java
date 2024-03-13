package prodemy.Backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestParams {

    String titleSearch;
    String categoryId;
    String sortBy;
    String sortAsc;
}
