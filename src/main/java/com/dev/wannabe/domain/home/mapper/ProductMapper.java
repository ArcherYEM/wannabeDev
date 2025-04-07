package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.BgmProductDTO;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    // 기존의 쿼리 수정
    List<ProductDTO> selectTop6ByProductTypeSortedByInsertDt(@Param("productType") String category);
    List<ProductDTO> getGiftShopList(@Param("productType") String productType, @Param("offset") Integer offset, @Param("searchText")String searchText);

    Integer getProductCount(@Param("productType") String productType,@Param("searchText") String searchText);

    List<BgmProductDTO> getBgmList(@Param("offset") Integer offset, @Param("searchText")String searchText);
    Integer getBgmCount(String searchText);
    List<ProductDTO> getNewItem();

    List<ProductDTO> getPopularProduct();

    List<BgmProductDTO> getPopularBgm();
}