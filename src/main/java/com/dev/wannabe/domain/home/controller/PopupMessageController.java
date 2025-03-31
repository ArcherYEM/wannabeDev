package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import com.dev.wannabe.domain.home.service.LoginService;

import com.dev.wannabe.domain.home.service.PopupMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping("/ReciveMessageBox")
    public String popupReciveMessageBox() {
        return "common/popup/inc/popupReciveMessageBox";
    }

    @GetMapping("/SendMessageBox")
    public String popupSendMessageBox() {
        return "common/popup/inc/popupSendMessageBox";
    }

    @GetMapping("/MessageList")
    public String popupMessageList(HttpServletRequest request, Model model, Map<String, Object> map) {
        String userId = request.getParameter("userId");
        String offset = request.getParameter("offset");
        String pageSize = request.getParameter("pageSize");

        List<PopupMessageDTO> popupMessageDTO2 = popupMessageService.getReciveMsglist(userId, offset, pageSize);

        int reciveMsgCount = popupMessageService.reciveMsgCount(userId);
        model.addAttribute("reciveMsgCount", reciveMsgCount);
        System.out.println("popupMessageDTO2 :::::  "+ popupMessageDTO2);
        // 페이지네이션을 위한 totalPages 계산
        int totalPages = (int) Math.ceil((double) reciveMsgCount / Integer.parseInt(pageSize));
        model.addAttribute("totalPages", totalPages);  // totalPages를 모델에 추가

        model.addAttribute("msgList", popupMessageDTO2);

        return "common/popup/inc/popupMessageList";  // JSP 또는 Thymeleaf 페이지 반환
    }
}
