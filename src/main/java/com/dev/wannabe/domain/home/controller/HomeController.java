package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.service.HomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;

    @GetMapping("/")
    public String home() {
        return "home/main";
    }

    // 클라이언트 아이피 가져오기
    @GetMapping("/getIp")
    @ResponseBody
    public String getIp(HttpServletRequest req) {
        return homeService.getIp(req);
    }

    @RequestMapping("/signup")
    public String signup(){
        return "home/signup";
    }
}
