package prodemy.Backend.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TRANSACTIONS")
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TRANSACTION_DATE")
    private Date transactionsDate;

    @Column(name = "TOTAL_AMOUNT")
    private Long totalAmount;

    @Column(name = "TOTAL_PAY")
    private Long totalPay;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "transactionId")
    private List<TransactionDetails> transactionDetails;
}
