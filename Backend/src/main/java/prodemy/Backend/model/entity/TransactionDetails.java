package prodemy.Backend.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TRANSACTION_DETAILS")
public class TransactionDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "QUANTITY")
    private Long quantity;

    @Column(name = "SUBTOTAL")
    private Long subtotal;

    @ManyToOne(targetEntity = Transactions.class)
    @JoinColumn(name = "TRANSACTION_ID")
    private Transactions transactionId;

    @ManyToOne(targetEntity = Products.class)
    @JoinColumn(name = "PRODUCTS_ID")
    private Products productsId;
}
