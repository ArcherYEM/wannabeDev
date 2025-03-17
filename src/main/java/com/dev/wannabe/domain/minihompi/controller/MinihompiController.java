package com.dev.wannabe.domain.minihompi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/mini-hompi")
public class MinihompiController {

    @GetMapping("/main")
    public String miniHompi() {
        return "minihompi/minihompiMain";
    }

    @GetMapping("/profile")
    public String Profile() {
        return "minihompi/profile/minihompiProfile";
    }

    @GetMapping("/dairy")
    public String Dairy() {
        return "minihompi/dairy/minihompiDairy";
    }

    @GetMapping("/jukebox")
    public String Jukebox() {
        return "minihompi/jukebox/minihompiJukebox";
    }

    @GetMapping("/photo")
    public String Photo() {
        return "minihompi/photo/minihompiPhoto";
    }

    @GetMapping("/board")
    public String Board() {
        return "minihompi/board/minihompiBoard";
    }

    @GetMapping("/visitor")
    public String Visitor() {
        return "minihompi/visitor/minihompiVisitor";
    }

    @GetMapping("/setting")
    public String Setting() {
        return "minihompi/setting/minihompiSetting";
    }

    @GetMapping("/newmessage")
    public String message() {
        return "minihompi/newMessage";
    }


}
