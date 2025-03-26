package com.dev.wannabe.domain.home.controller;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.domain.home.service.NoticeService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.extern.slf4j.Slf4j;
import org.mariadb.jdbc.client.socket.impl.SocketUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("")
    public String Notice(HttpSession session, Model model,
                         @RequestParam(name = "limit", defaultValue = "10") int limit,
                         @RequestParam(name = "offset", defaultValue = "0") int offset,
                         @RequestParam(name = "Type", required = false) String noticeType,
                         @RequestParam(name = "field", required = false) String field,
                         @RequestParam(name = "keyword", required = false) String keyword) {

        if (offset < 0) offset = 0;  // offset 음수 방지



        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");
        String userRole = user.getRole();  // 유저 권한 정보

        // Service에 모든 로직 위임
        Map<String, Object> result = noticeService.getNoticePage(limit, offset, noticeType, field, keyword, userRole);

        // model에 담기
        model.addAllAttributes(result);

//        // 권한 정보를 모델에 추가
//        model.addAttribute("userRole", userRole);

        return "home/notice/notice";
    }

    @GetMapping("/view")
    public String getNoticeView(){

        return "home/notice/noticeView";
    }

    @PostMapping("/view")
    public String NoticeView(){


        return "home/notice/noticeView";
    }
}
