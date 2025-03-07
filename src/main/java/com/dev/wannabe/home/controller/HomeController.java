package com.dev.wannabe.home.controller;

import com.dev.wannabe.home.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class HomeController {

    private final TestMapper testMapper;

    @RequestMapping("/home")
    public String home(){
        Map<String, Object> stringObjectMap = testMapper.testQuery();

        for (String s : stringObjectMap.keySet()) {
            log.info("s => {}", s);
        }
        
        return "home";
    }
}
