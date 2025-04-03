package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import com.dev.wannabe.domain.home.service.LoginService;

import com.dev.wannabe.domain.home.service.PopupMessageService;
import com.sun.mail.iap.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequiredArgsConstructor
@RequestMapping("/popupMessage")
public class PopupMessageController {

    private final LoginService loginService;
    private final PopupMessageService popupMessageService;

    /*쪽지창 관련*/
    @GetMapping("/main")
    public String popupMessage() {
        return "common/popup/popupMessage";
    }

    @GetMapping("/SendMessage")
    public String popupSendMessage() {
        return "common/popup/inc/popupSendMessage";
    }

    @GetMapping("/SendMessageProc")
    @ResponseBody
    public List<PopupMessageDTO> popupSendMsgProc(HttpServletRequest request) {
        String userId = request.getParameter("userId"); // 쪽지를 보낸이의 userId
        String recipient = request.getParameter("recipient"); // 입력한 쪽지보낼 대상
        String sendMessage = request.getParameter("sendTextArea"); // 입력한 메세지
        System.out.println("/SendMessageProc 진입 :: userId ::" + userId);
        System.out.println("/SendMessageProc 진입 :: recipient ::" + recipient);
        System.out.println("/SendMessageProc 진입 :: sendMessage ::" + sendMessage);
        List<PopupMessageDTO> popupMessageDTO = popupMessageService.getSendSearchName(userId, recipient); // 체크

        System.out.println("/SendMessageProc 진입 :: getFriendUserId ::" + popupMessageDTO.get(0).getFriendUserId());
        Map<String,Object> map = new HashMap<>();
        /*sendMessage = sendMessage.replace("<br>","\r\n");*/
        map.put("userId", userId); // 쪽지 보낸 이
        map.put("recipient", String.valueOf(popupMessageDTO.get(0).getFriendUserId())); // 쪽지 받는 이
        map.put("sendMessage", sendMessage); // 보낸쪽지내용
        int sendChk = popupMessageService.SendFriendMessage(map);

        System.out.println("/SendMessageProc 진입 :: sendMessage내용 ::" + sendMessage);
        if (sendChk == 1) {
            System.out.println(userId+ " 님 이" + String.valueOf(popupMessageDTO.get(0).getFriendUserId()) + " 에게 메세지 전송 성공");
        } else {
            System.out.println(userId+ " 님 이" + String.valueOf(popupMessageDTO.get(0).getFriendUserId()) + " 에게 메세지 전송 실패");
        }
        System.out.println("/SendMessageProc 진입 :: sendChk ::" + sendChk);
        /*
            작업 해야 할것
            "recipient" 를 본인계정의 친구리스트에 존재하는지 확인 존재한다면 보낼친구의 id(int)값 을 가져오고,
            가져온 후 해당유저 id(int)값 을기준 쪽지를보낸유저id(int)값 과 "sendMessage" 를 insert 해준다.
        */
        return popupMessageDTO;
    }

    @GetMapping("/ReciveMessageView")
    public String popupReciveMessageView(HttpServletRequest request, Model model) {
        String messageId = request.getParameter("messageId");
        List<PopupMessageDTO> reciveMsgView = popupMessageService.getReciveMsgView(messageId);
        System.out.println("messageId :::: " + messageId);
        String viewMessage = reciveMsgView.get(0).getMessage().replace("<br>","\r\n");
        reciveMsgView.get(0).setMessage(viewMessage);
        model.addAttribute("reciveMsgView", reciveMsgView);
        popupMessageService.messageReadUpdate(messageId); // 메세지 읽음처리
        return "common/popup/inc/popupRiceveMsgView";
    }

    @GetMapping("/SendMessageBox")
    public String popupSendMessageBox() {
        return "common/popup/inc/popupSendMessageBox";
    }

    @GetMapping("/SendSearchName")
    @ResponseBody
    public List<PopupMessageDTO> popSendMsgSearchName(HttpServletRequest request) {
        String userId = request.getParameter("userId");
        String recipient = request.getParameter("recipient");
        System.out.println("userId :: " + userId);
        System.out.println("recipient :: " + recipient);
        List<PopupMessageDTO> PopupMessageDTO = popupMessageService.getSendSearchName(userId, recipient);
        System.out.println("PopupMessageDTO :: " + PopupMessageDTO);
        return PopupMessageDTO;
    }

    @GetMapping("/MessageList")
    public String popupMessageList(HttpServletRequest request, Model model) {
        String userId = request.getParameter("userId");
        String offset = request.getParameter("offset");
        String pageSize = request.getParameter("pageSize");

        List<PopupMessageDTO> popupMessageDTO = popupMessageService.getReciveMsglist(userId, offset, pageSize); //전체 메세지불러오기
        for (int i = 0; i < popupMessageDTO.size(); i++) {
            String brMsg = popupMessageDTO.get(i).getMessage().replace("<br>","\r\n");
            popupMessageDTO.get(i).setMessage(brMsg);
        }
        model.addAttribute("msgList", popupMessageDTO);

        int reciveMsgCount = popupMessageService.reciveMsgCount(userId); //전체 쪽지 갯수
        model.addAttribute("reciveMsgCount", reciveMsgCount);
        int reciveUnreadMsgCount = popupMessageService.reciveUnreadMsgCount(userId); // 안읽은 쪽지 갯수
        model.addAttribute("reciveUnreadMsgCount", reciveUnreadMsgCount);
        // 페이지네이션을 위한 totalPages 계산
        int totalPages = (int) Math.ceil((double) reciveMsgCount / Integer.parseInt(pageSize));
        model.addAttribute("totalPages", totalPages);  // totalPages를 모델에 추가

        return "common/popup/inc/popupMessageList";
    }

}
