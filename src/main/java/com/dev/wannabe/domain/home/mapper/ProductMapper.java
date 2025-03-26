package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ProductMapper {
    // 기존의 쿼리 수정
    List<ProductDTO> selectTop3ByProductTypeSortedByInsertDt(@Param("productType") String category);
}