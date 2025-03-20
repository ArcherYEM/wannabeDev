package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.service.HomeService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;

    @GetMapping("/")
    public String home() {
        return "home/main";
    }

    @RequestMapping("/signup")
    public String signup(){
        return "home/signup";
    }

    @GetMapping("/userInfo")
    public ResponseEntity<SessionUserDTO> userInfo(HttpServletRequest request){
        HttpSession session = request.getSession(false);
            if(session == null){
                return ResponseEntity.ok(null);
            }
            SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
            if(session.getAttribute("userData") == null) {
                return ResponseEntity.ok(null);
            }

            return ResponseEntity.ok(userData);
    }
}
