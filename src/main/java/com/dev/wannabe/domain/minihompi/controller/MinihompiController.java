package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.service.MinihompiService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/mini-hompi")
public class MinihompiController {
    
    //TODO 미니홈피 메뉴 테이블에서 메뉴 공개 값 가져와서 json에 추가하고 공개범위 정하기(현재의 MyHompi 역할)
    //TODO 미니홈피 JSON 널 체크하는 기능 추가

    private final MinihompiService minihompiService;

    @GetMapping("/hompiMain")
    public String popupHompMain() {

        return "minihompi/minihompiMain";
    }


    @GetMapping("/api/{hompiId}")
    public ResponseEntity<Map<String, Object>> miniHompipopup(@PathVariable Long hompiId, HttpServletRequest request) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        Map<String, Object> response = minihompiService.getMinihompiPopup(hompiId, userData);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/main/{hompiId}")
    public String minihompiWrap(@PathVariable Long hompiId) {
        return "minihompi/minihompiWrap";
    }

    @PostMapping("/updateTitle")
    public ResponseEntity<Map<String, Object>> updateTitle(@RequestParam String title, HttpServletRequest request) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        Map<String, Object> response = minihompiService.updateMinihompiTitle(userData, title);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/mood/save/{hompiId}")
    public ResponseEntity<Map<String, Object>> saveMood(@PathVariable Long hompiId, @RequestBody String mood) {
        Map<String, Object> result = minihompiService.saveMood(hompiId, mood);
        return ResponseEntity.ok(result);
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
        return "common/popup/newMessage";
    }

}
