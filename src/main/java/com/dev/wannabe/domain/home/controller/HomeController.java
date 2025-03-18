package com.dev.wannabe.domain.home.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {

    @RequestMapping("/home")
    public String home(){
        return "home/main";
    }

    @RequestMapping("/signup")
    public String signup(){
        return "home/signup";
    }
}
