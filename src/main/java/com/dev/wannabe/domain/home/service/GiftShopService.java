package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.BgmMapper;
import com.dev.wannabe.domain.home.mapper.ProductMapper;
import com.dev.wannabe.domain.home.model.dto.BgmProductDTO;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GiftShopService {

    private final ProductMapper productMapper;
    private final BgmMapper bgmMapper;

    public ResponseEntity<List<ProductDTO>> getGiftShopList(String productType, Integer offset, String searchText) {
        return ResponseEntity.ok(productMapper.getGiftShopList(productType,offset,searchText));
    }

    public ResponseEntity<Integer> getProductCount(String productType,String searchText) {
        if(productType.equals("BGM")){
            return ResponseEntity.ok(bgmMapper.getBgmCount(searchText));
        }
        return ResponseEntity.ok(productMapper.getProductCount(productType,searchText));
    }

    public ResponseEntity<List<ProductDTO>> getNewItem(){
        List<ProductDTO> newItem = productMapper.getNewItem();
        for (ProductDTO item : newItem) {
            if(item.getProductType().equals("10")){
                item.setProductType("미니홈피 스킨");
            }else if(item.getProductType().equals("01")){
                item.setProductType("미니미");
            }else if(item.getProductType().equals("02")){
                item.setProductType("미니룸");
            }else if(item.getProductType().equals("11")){
                item.setProductType("메뉴스킨");
            }else{
                item.setProductType("글자스킨");
            }
        }
        return ResponseEntity.ok(newItem);
    }

    public ResponseEntity<List<BgmProductDTO>> getBgmList(Integer offset,String searchText){
        return ResponseEntity.ok(bgmMapper.getBgmList(offset,searchText));
    }

    public ResponseEntity<List<BgmProductDTO>> getPopularBgm(){
        List<BgmProductDTO> items = bgmMapper.getPopularBgmList();
        return ResponseEntity.ok(items);
    }

    public ResponseEntity<List<ProductDTO>> getProductPopularList(){
        return ResponseEntity.ok(productMapper.getPopularProduct());
    }

    public String getBgmAudioPath(Long bgmId) {
        String audioPath = bgmMapper.getBgmAudioPath(bgmId);
        if(audioPath == null){
            return null;
        }
        return audioPath;
    }

    public BgmProductDTO getBgmProductDTO(Long bgmId){
        BgmProductDTO bgmProductDTO = bgmMapper.getBgmProductDTO(bgmId);
        return bgmProductDTO;
    }

    public ProductDTO getProductDTO(Long productId) {
        ProductDTO productDTO = productMapper.getProductDTO(productId);
        return productDTO;
    }
}
