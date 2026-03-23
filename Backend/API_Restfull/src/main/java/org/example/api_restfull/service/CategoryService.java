package org.example.api_restfull.service;


import lombok.RequiredArgsConstructor;
import org.example.api_restfull.dto.CategoryDTO;
import org.example.api_restfull.entity.Category;
import org.example.api_restfull.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public CategoryDTO getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found: " + id));
        return toDTO(category);
    }

    public CategoryDTO create(CategoryDTO dto) {
        Category category = toEntity(dto);
        return toDTO(categoryRepository.save(category));
    }

    public CategoryDTO update(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found: " + id));
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return toDTO(categoryRepository.save(category));
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO toDTO(Category c) {
        return new CategoryDTO(c.getId(), c.getName(), c.getDescription());
    }

    private Category toEntity(CategoryDTO dto) {
        Category c = new Category();
        c.setName(dto.getName());
        c.setDescription(dto.getDescription());
        return c;
    }
}