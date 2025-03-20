package com.dev.wannabe.domain.home.controller.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    @GetMapping("")
    public String Notice(){
        return "home/notice/notice";
    }

    @GetMapping("/view")
    public String NoticeView(){
        return "home/notice/noticeView";
    }
}