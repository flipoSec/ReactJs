package org.example.api_restfull.repository;


import org.example.api_restfull.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category")
    List<Product> findAll();

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category WHERE p.category.id = :categoryId")
    List<Product> findByCategoryId(Long categoryId);
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category WHERE UPPER(p.name) LIKE UPPER(CONCAT('%', :name, '%'))")
    List<Product> findByNameContainingIgnoreCase(String name);
}