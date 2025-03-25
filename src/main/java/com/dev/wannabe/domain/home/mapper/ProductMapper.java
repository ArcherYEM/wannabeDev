package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    void initInsertTime();                   // 세션 변수 초기화
    void updateInsertDtWithInterval();       // insert_dt를 1분씩 감소시키며 갱신
    List<ProductDTO> selectTop3ByProductType(); // 분류별 최근 3개 상품
}