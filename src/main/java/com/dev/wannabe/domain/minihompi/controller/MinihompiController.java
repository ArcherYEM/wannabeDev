package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.minihompi.MiniHompiTotal;
import com.dev.wannabe.domain.minihompi.service.minihompiService.MinihompiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
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


    @GetMapping("/api/{hompiId}")
    public ResponseEntity<Map<String, Object>> miniHompipopup(@PathVariable("hompiId") Long hompiId, HttpSession session) {
        Integer userId = 0;
        String myHompi;
        //TODO 세션 연결해서 login ID 받아 json에 추가해서 홈페이지 우상단 main/joginID로 수정하기
        //TODO 미니홈피 메뉴 테이블에서 메뉴 공개 값 가져와서 json에 추가하고 공개범위 정하기(현재의 MyHompi 역할)
        //TODO 미니홈피 JSON 널 체크하는 기능 추가
        if (hompiId == Long.valueOf(userId)) { // 내 미니홈피
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

    @GetMapping("/main/{hompiId}")
    public String minihompiWrap(@PathVariable("hompiId") Long hompiId) {

        return "minihompi/minihompiWrap";

    }

    @PostMapping("/updateTitle")
    public ResponseEntity<Map<String, Object>> updateTitle(
            @RequestParam("title") String title, HttpSession session) {
        //Integer hompiId = (Integer) session.getAttribute("hompiId");
        Integer hompiId = 0;

        Map<String, Object> response = new HashMap<>();

        // 타이틀 검증
        if (title == null || title.isEmpty()) {
            response.put("status", "fail");
            response.put("message", "타이틀은 비어있을 수 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 서비스 호출 및 타이틀 업데이트
        Map<String, Object> miniHompi = new HashMap<>();
        miniHompi.put("hompiId", hompiId);
        miniHompi.put("title", title);

        int updateTitle = minihompiService.updateTitle(miniHompi);

        // 업데이트 실패 처리
        if (updateTitle == 0) {
            response.put("status", "fail");
            response.put("message", "타이틀 변경에 실패했습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 성공 응답 반환
        response.put("status", "success");
        response.put("message", "타이틀 변경 성공");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/mood/save/{hompiId}")
    public ResponseEntity<Map<String, Object>> saveMood(@PathVariable("hompiId") Long hompiId,
                                                        @RequestBody String mood) {

        String decodedMood = URLDecoder.decode(mood, StandardCharsets.UTF_8);
        decodedMood = decodedMood.replace("=", "").trim();
        System.out.println("mood-->" + mood);
        Map<String, Object> map = new HashMap<>();
        map.put("mood", decodedMood);
        map.put("hompiId", hompiId);
        minihompiService.saveMood(map);
        return ResponseEntity.ok(map);
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
