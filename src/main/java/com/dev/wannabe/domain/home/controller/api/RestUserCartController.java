package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.UserCartBgmDTO;
import com.dev.wannabe.domain.home.model.dto.UserCartFindDTO;
import com.dev.wannabe.domain.home.model.dto.UserCartProductDTO;
import com.dev.wannabe.domain.home.service.UserCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-cart")
public class RestUserCartController {

    private final UserCartService userCartService;
    @GetMapping("/read/product")
    public ResponseEntity<List<UserCartProductDTO>> getCartList(HttpServletRequest request){
            List<UserCartProductDTO> userCartList = userCartService.getUserCartProductList(request);
            if(userCartList == null){
                return ResponseEntity.ok(null);
            }
            return ResponseEntity.ok().body(userCartList);
    }

    @GetMapping("/read/bgm")
    public ResponseEntity<List<UserCartBgmDTO>> getCartBgmList(HttpServletRequest request){
        List<UserCartBgmDTO> userCartBgmDTOList = userCartService.getUserCartBgmList(request);
        if(userCartBgmDTOList == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok().body(userCartBgmDTOList);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addCart(@RequestBody List<UserCartProductDTO> userCartDTOList, HttpServletRequest request){
        Boolean success = userCartService.addCart(userCartDTOList, request);
        if(success.equals(false)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/read/price")
    public ResponseEntity<Integer> getItemPrice(@RequestParam Long itemId, @RequestParam(required = false) Integer availDay,
                                                @RequestParam String itemType){
        Integer itemPrice = userCartService.getItemPrice(itemId,itemType ,availDay);
        if(itemPrice == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(itemPrice);
    }

/*    @PostMapping("/delete/cart")
    public ResponseEntity<Boolean> deleteItemCart(List<UserCartFindDTO> userCartFindDTOS, HttpServletRequest request){
        Boolean deleteCheck = userCartService.deleteItemCart(userCartFindDTOS, request);
        if (deleteCheck == null){

        }
    }*/

}
