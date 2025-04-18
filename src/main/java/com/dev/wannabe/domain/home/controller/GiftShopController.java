package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/giftShop")
public class GiftShopController {

    @GetMapping("")
    public String giftShop(){
        return "home/giftShop/giftShopMain";
    }

    @GetMapping("/sub")
    public String giftShopSub(){
        return "home/giftShop/giftShopTheme";
    }

    @GetMapping("/add-item")
    public String giftShopAddItem(){
        return "/home/giftShop/giftShopItemAdd";
    }

    @GetMapping("/add-bgm")
    public String giftShopAddBgm(){
        return "/home/giftShop/giftShopBgmAdd";
    }

    @GetMapping("/check/role")
    public ResponseEntity<Boolean> checkUserROle(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return ResponseEntity.ok(false);
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if(userData == null){
            return ResponseEntity.ok(false);
        }
        if(!userData.getRole().equals("03")){
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

}
