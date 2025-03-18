package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.minihompi.MiniHompiTotal;
import com.dev.wannabe.domain.minihompi.service.minihompiService.MinihompiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/mini-hompi")
public class MinihompiController {

    private final MinihompiService minihompiService;

    @GetMapping("/hompiMain")
    public String popupHompMain() {

        return "minihompi/minihompiMain";
    }


    @GetMapping("/main/{hompiId}")
    public ResponseEntity<Map<String, Object>> miniHompipopup(@PathVariable("hompiId") Long hompiId, HttpSession session) {
        Integer userId = 1; // 예시 데이터
        String myHompi;
        //TODO 세션 연결해서 login ID 받아 json에 추가해서 홈페이지 우상단 main/joginID로 수정하기
        // 조건에 따라 myHompi 값 설정
        if (hompiId.equals(userId)) { // 내 미니홈피
            myHompi = "0";
        } else if (userId == null) { // 비로그인
            myHompi = "1";
        } else { // 남의 미니홈피
            myHompi = "2";
        }

        // 서비스 호출 및 데이터 구성
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("hompiId", hompiId);

        MiniHompiTotal findMiniHompi = minihompiService.findMiniHompi(map);

        // JSON 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("hompiId", hompiId);
        response.put("myHompi", myHompi);
        response.put("miniHompi", findMiniHompi);

        return ResponseEntity.ok(response); // JSON 형식으로 반환
    }

    @GetMapping("/minihompiWrap")
    public String minihompiWrap() {

        return "minihompi/minihompiWrap";

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
