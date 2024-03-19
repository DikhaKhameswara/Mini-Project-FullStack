package prodemy.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import prodemy.Backend.model.entity.Transactions;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {

}