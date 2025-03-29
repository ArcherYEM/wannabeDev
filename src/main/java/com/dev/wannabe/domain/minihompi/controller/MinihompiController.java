package com.dev.wannabe.domain.minihompi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/mini-hompi")
public class MinihompiController {
    //TODO 미니홈피 메뉴 테이블에서 메뉴 공개 값 가져와서 json에 추가하고 공개범위 정하기(현재의 MyHompi 역할)
    @GetMapping("/hompiMain")
    public String popupHompMain() {return "minihompi/minihompiMain";}

    @GetMapping("/main/{hompiId}")
    public String minihompiWrap(@PathVariable Long hompiId) {return "minihompi/minihompiWrap";}

    @GetMapping("/profile")
    public String Profile() {return "minihompi/profile/minihompiProfile";}

    @GetMapping("/diary")
    public String Dairy() {
        return "minihompi/dairy/minihompiDairy";
    }

    @GetMapping("/jukebox")
    public String Jukebox() {return "minihompi/jukebox/minihompiJukebox";}

    @GetMapping("/album")
    public String Photo() {return "minihompi/photo/minihompiPhoto";}

    @GetMapping("/board")
    public String Board() {return "minihompi/board/minihompiBoard";}

    @GetMapping("/visitor")
    public String Visitor() {return "minihompi/visitor/minihompiVisitor";}

    @GetMapping("/setting")
    public String Setting() {return "minihompi/setting/minihompiSetting";}

    @GetMapping("/newMessage")
    public String message() {return "common/popup/newMessage";}
}
