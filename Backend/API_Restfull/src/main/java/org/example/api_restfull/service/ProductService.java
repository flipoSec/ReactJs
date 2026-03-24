package org.example.api_restfull.service;


import lombok.RequiredArgsConstructor;
import org.example.api_restfull.dto.ProductDTO;
import org.example.api_restfull.entity.Category;
import org.example.api_restfull.entity.Product;
import org.example.api_restfull.repository.CategoryRepository;
import org.example.api_restfull.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public List<ProductDTO> getAll() {
        return productRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProductDTO create(ProductDTO dto) {
        Product product = toEntity(dto);
        return toDTO(productRepository.save(product));
    }

    public ProductDTO update(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + dto.getCategoryId()));
            product.setCategory(category);
        }
        return toDTO(productRepository.save(product));
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    private ProductDTO toDTO(Product p) {
        return new ProductDTO(
                p.getId(), p.getName(), p.getDescription(),
                p.getPrice(), p.getQuantity(),
                p.getCategory() != null ? p.getCategory().getId() : null,
                p.getCategory() != null ? p.getCategory().getName() : null
        );
    }

    private Product toEntity(ProductDTO dto) {
        Product p = new Product();
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setQuantity(dto.getQuantity());
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + dto.getCategoryId()));
            p.setCategory(category);
        }
        return p;
    }
}
