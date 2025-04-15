package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.BgmProductDTO;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import com.dev.wannabe.domain.home.service.GiftShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/giftShop")
@RequiredArgsConstructor
public class RestGiftShopController {

    private final GiftShopService giftShopService;
    @GetMapping("/read/gift/{productType}")
    public ResponseEntity<List<ProductDTO>> getGiftShop(@PathVariable String productType,
                                                        @RequestParam Integer offset,
                                                        @RequestParam(required = false) String searchText){
        return giftShopService.getGiftShopList(productType, offset, searchText);
    }

    @GetMapping("/read/gift/count/{productType}")
    public ResponseEntity<Integer> getProductCount(@PathVariable String productType,@RequestParam(required = false) String searchText){
        return giftShopService.getProductCount(productType,searchText);
    }

    @GetMapping("/read/gift/bgm")
    public ResponseEntity<List<BgmProductDTO>> getBgmList(@RequestParam Integer offset,
                                                          @RequestParam(required = false) String searchText){
        return giftShopService.getBgmList(offset,searchText);
    }

    @GetMapping("/read/main-gift/new-item")
    public ResponseEntity<List<ProductDTO>> getNewItem(){
        return giftShopService.getNewItem();
    }

    @GetMapping("/read/main-gift/popular-bgm")
    public ResponseEntity<List<BgmProductDTO>> getPopularBgm(){
        return giftShopService.getPopularBgm();
    }

    @GetMapping("/read/main-gift/popular-product")
    public ResponseEntity<List<ProductDTO>> getPopularProduct(){
        return giftShopService.getProductPopularList();
    }

    @GetMapping("/read/gift/bgm/audio-path/{bgmId}")
    public ResponseEntity<String> getBgmAudioPath(@PathVariable Long bgmId){
        String bgmAudioPath = giftShopService.getBgmAudioPath(bgmId);
        return ResponseEntity.ok(bgmAudioPath);
    }

    @GetMapping("/read/gift/bgm/{bgmId}")
    public ResponseEntity<BgmProductDTO> getBgmProductDTO(@PathVariable Long bgmId){
        BgmProductDTO bgmProductDTO = giftShopService.getBgmProductDTO(bgmId);
        return ResponseEntity.ok(bgmProductDTO);
    }

    @GetMapping("/read/gift/product/{productId}")
    public ResponseEntity<ProductDTO> getProductDTO(@PathVariable Long productId){
        ProductDTO ProductDTO = giftShopService.getProductDTO(productId);
        return ResponseEntity.ok(ProductDTO);
    }
}
