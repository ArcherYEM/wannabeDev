package com.dev.wannabe.domain.home.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/giftShop")
public class GiftShopController {

    @GetMapping("")
    public String giftShop(){
        return "home/giftShop/giftShopMain";
    }
}
