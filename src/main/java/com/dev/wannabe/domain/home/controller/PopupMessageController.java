package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.service.LoginService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequiredArgsConstructor
@RequestMapping("/popupMessage")
public class PopupMessageController {

    private final LoginService loginService;

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
    public String popupMessageList(){
        return "common/popup/inc/popupMessageList";
    }

}
