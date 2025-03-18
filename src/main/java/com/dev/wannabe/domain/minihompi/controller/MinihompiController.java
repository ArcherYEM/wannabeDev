package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.minihompi.MinihompiDto;
import com.dev.wannabe.domain.minihompi.service.minihompiService.MinihompiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public String getUserMain(@PathVariable("") String ownerUserId, Model model) {
        Map<String, String> map = new HashMap<>();
        map.put("loginId", loginId);
        map.put("ownerUserId", ownerUserId);
        MinihompiDto findMiniHompi = MinihompiService.findMiniHompi(map);
        //홈피url을 이용해서 미니 홈피로 이동함 , 세션으로부터 로그인 id, 홈피url 맵에 삽입
        //로그인 id는 null일 경우가 있음. 컨트롤러-> 서비스->매퍼로 맵을 던짐
        //서비스 if문 써서 같으면 내 미니홈피 myHome y/n 리턴시켜서 ajax에서 해당요소 디스플레이 설정
        //다르면 다른 사람 미니홈피(투데이 증가 로직 시작)
        //select 결과가 없을 경우에는 공사판 페이지가 뜬다.....

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
