package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import com.dev.wannabe.domain.home.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    // 상품 분류별 최신 3개 상품 조회
    public List<ProductDTO> getTop6ProductsByType(String productType) {
        return productMapper.selectTop6ByProductTypeSortedByInsertDt(productType);
    }
}