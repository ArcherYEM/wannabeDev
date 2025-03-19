package com.dev.wannabe.domain.home.controller.horoscope;

import com.dev.wannabe.domain.home.service.horoscope.FortuneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/main")
@RequiredArgsConstructor
public class FortuneController {

    private final FortuneService fortuneService;

    @ResponseBody
    @GetMapping(value = "/fortune", produces = "text/plain; charset=UTF-8")
    public String getHoroscope() {
        return fortuneService.calculateFortuneMessage(LocalDateTime.now());
    }
}
