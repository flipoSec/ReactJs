package org.example.api_restfull.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Long categoryId;      // ← avoids circular JSON serialization
    private String categoryName;  // ← useful for the frontend
}