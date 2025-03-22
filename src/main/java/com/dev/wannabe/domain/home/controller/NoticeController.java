package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.domain.home.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("")
    public String Notice(Model model) {
        List<NoticeDTO> noticeList = noticeService.getAllNotices();

        // 날짜 범위를 동적으로 계산해서 사용
        for (NoticeDTO notice : noticeList) {
            notice.getDateRange();  // 날짜 범위 계산
        }

        model.addAttribute("notices", noticeList);

        System.out.println("notices:::::"+ noticeList);
        return "home/notice/notice";
    }

    @GetMapping("/view")
    public String NoticeView(){
        return "home/notice/noticeView";
    }
}
