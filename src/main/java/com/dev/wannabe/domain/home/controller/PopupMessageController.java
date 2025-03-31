package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import com.dev.wannabe.domain.home.service.LoginService;

import com.dev.wannabe.domain.home.service.PopupMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


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

    @GetMapping("/ReciveMessageView")
    public String popupReciveMessageView(HttpServletRequest request, Model model) {
        String messageId = request.getParameter("messageId");
        List<PopupMessageDTO> reciveMsgView = popupMessageService.getReciveMsgView(messageId);
        System.out.println("messageId :::: " + messageId);

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
