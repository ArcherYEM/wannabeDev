package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.domain.home.service.NoticeService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeRestController {
    private final NoticeService noticeService;

    @PostMapping("/insert_notice")
    public boolean insertNotice(HttpServletRequest req, @RequestBody NoticeDTO noticeDTO){
        SessionUserDTO userData = (SessionUserDTO) req.getSession().getAttribute("userData");
        if (userData == null) {
            return false;
        }

        Long userId = userData.getUserId();

        noticeDTO.setInsertUserId(userId);
        noticeDTO.setUpdateUserId(userId);
        return noticeService.insertNotice(noticeDTO);
    }
}