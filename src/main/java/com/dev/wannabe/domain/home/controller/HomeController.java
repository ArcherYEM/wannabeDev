package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.service.HomeService;
import com.dev.wannabe.domain.home.service.LoginService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

//    @GetMapping("/")
//    public String home2() {
//        return "home/main2";
//    }

    // 클라이언트 아이피 가져오기
    @GetMapping("/getIp")
    @ResponseBody
    public String getIp(HttpServletRequest req) {
        SessionUserDTO sessionUser = loginService.getSessionUserData(req);
        return sessionUser.getAccessIp();
    }

    @GetMapping("/signup")
    public String signup(){
        return "home/signup";
    }

    @GetMapping("/recharge")
    public String recharge(){
        return "home/recharge";
    }

    @GetMapping("/userInfo")
    public ResponseEntity<SessionUserDTO> userInfo(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        SessionUserDTO sessionUser;
        if(session == null){
            sessionUser = SessionUserDTO.builder().build();
            return ResponseEntity.ok(sessionUser);
        }
        if(session.getAttribute("userData") == null) {
            sessionUser = SessionUserDTO.builder().build();
            return ResponseEntity.ok(sessionUser);
        }
        sessionUser = (SessionUserDTO) session.getAttribute("userData");
        return ResponseEntity.ok(sessionUser);
    }

    @GetMapping("/userUpdate")
    public String goToUserUpdate(HttpServletRequest request){
        return "home/user/userUpdate";
    }

    @GetMapping("/about-us")
    public String aboutUS (){
        return "home/aboutus";
    }
}
