package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.service.HomeService;
import com.dev.wannabe.domain.home.service.LoginService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    private final LoginService loginService;

    @GetMapping("/")
    public String home() {
        return "home/main";
    }

    // 클라이언트 아이피 가져오기
    @GetMapping("/getIp")
    @ResponseBody
    public String getIp(HttpServletRequest req) {
        SessionUserDTO sessionUser = loginService.getSessionUserData(req);
        return sessionUser.getAccessIp();
    }

    @RequestMapping("/signup")
    public String signup(){
        return "home/signup";
    }

    @GetMapping("/userInfo")
    public ResponseEntity<SessionUserDTO> userInfo(HttpServletRequest request){
        SessionUserDTO userData = homeService.getUserData(request);
        if(userData == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(userData);
    }
}
