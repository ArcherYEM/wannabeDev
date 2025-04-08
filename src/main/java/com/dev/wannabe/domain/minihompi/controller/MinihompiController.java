package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.home.mapper.PopupMessageMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import com.dev.wannabe.domain.home.service.PopupMessageService;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mini-hompi")
public class MinihompiController {
    private final UserMapper userMapper;

    @Autowired
    private PopupMessageMapper PopupMessageMapper;
    @Autowired
    private HompiMapper hompiMapper;

    public MinihompiController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

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

//    @GetMapping("/visitor")
//    public String Visitor() {return "minihompi/visitor/minihompiVisitor";}

    @GetMapping("/setting")
    public String Setting() {return "minihompi/setting/minihompiSetting";}

    @GetMapping("/newMessage")
    public String message(@RequestParam Long userId,
                          @RequestParam Long recipient,
                          Model model) {
        String recipientView = userMapper.findUserNameByUserId(recipient);

        model.addAttribute("userId", userId);
        model.addAttribute("recipientView", recipientView);
        model.addAttribute("recipient", recipient);
        return "common/popup/newMessage";
    }

    @PostMapping(value = "/SendMessageProc", produces = "text/plain; charset=UTF-8")
    @ResponseBody
    public ResponseEntity<String> popupSendMsgProc(
            @RequestParam("sendUserId") String userId,// 쪽지를 보낸이의 userId
            @RequestParam("recipient") String recipient,// 입력한 쪽지보낼 대상
            @RequestParam("sendTextArea") String sendTextArea// 입력한 메세지
            ) {

        Map<String,Object> map = new HashMap<>();

        map.put("userId", userId); // 쪽지 보낸 이
        map.put("recipient", recipient); // 쪽지 받는 이
        map.put("sendMessage", sendTextArea); // 보낸쪽지내용

        boolean sendChk = PopupMessageMapper.SendFriendMessage(map);

        if (sendChk) {
            System.out.println(userId+ " 님 이" + recipient + " 에게 메세지 전송 성공");
            return ResponseEntity.ok("쪽지가 정상적으로 전송되었습니다.");
        } else {
            System.out.println(userId+ " 님 이" + recipient + " 에게 메세지 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("쪽지 전송에 실패했습니다.");
        }
    }

    @GetMapping("/id/{hompiId}")
    @ResponseBody
    public ResponseEntity<Long> id(@PathVariable Long hompiId) {
        Long hompiUserId = hompiMapper.findUserIdByHompiId(hompiId);
        return ResponseEntity.ok(hompiUserId);
    }

}
