package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.BgmProductDTO;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import com.dev.wannabe.domain.home.model.dto.ProductPriceDTO;
import com.dev.wannabe.domain.home.model.vo.Product;
import com.dev.wannabe.domain.home.model.vo.ProductPrice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    // 기존의 쿼리 수정
    List<ProductDTO> selectTop6ByProductTypeSortedByInsertDt(@Param("productType") String category);
    List<ProductDTO> getGiftShopList(@Param("productType") String productType, @Param("offset") Integer offset, @Param("searchText")String searchText);
    Integer getProductCount(@Param("productType") String productType,@Param("searchText") String searchText);

    List<ProductDTO> getNewItem();
    List<ProductDTO> getPopularProduct();
    ProductDTO getProductDTO(Long productId);
    void addProductItem(Product product);
    void addProductPrice(List<ProductPriceDTO> list);
}