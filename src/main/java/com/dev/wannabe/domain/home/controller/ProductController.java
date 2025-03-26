package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.service.ProductService;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/top3")
    public List<ProductDTO> getTop3ByType(@RequestParam String productType) {
        return productService.getTop3ProductsByType(productType);
    }
}