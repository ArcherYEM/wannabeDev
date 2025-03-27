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
    public String popupMessageList(HttpServletRequest requset, Model model){

        String userId = requset.getParameter("userId");
        List<PopupMessageDTO> popupMessageDTO = popupMessageService.getMessageList(userId);
        model.addAttribute("msgList", popupMessageDTO);
        System.out.println("메세지리스트진입 :: "+ popupMessageDTO);
        return "common/popup/inc/popupMessageList";
    }

}
