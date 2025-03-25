package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.ProductMapper;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    // insert_dt 값을 1분씩 감소시키며 갱신하는 메서드
    public void updateInsertDtValues() {
        productMapper.initInsertTime();
        productMapper.updateInsertDtWithInterval();
    }

    // 상품 분류별 최근 3개 상품 조회 메서드
    public List<ProductDTO> getTop3ProductsByType() {
        return productMapper.selectTop3ByProductType();
    }
}