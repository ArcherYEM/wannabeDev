package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.domain.home.service.NoticeService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/update/{noticeId}")
    @ResponseBody
    public ResponseEntity<String> updateNotice(@RequestBody NoticeDTO noticeDTO,
                                               @PathVariable("noticeId") Long noticeId,
                                               HttpSession session) {
        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }
        else if (!user.getRole().equals("01") && !user.getRole().equals("02")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한이 없습니다.");
        }

        noticeDTO.setNoticeId(noticeId);
        noticeDTO.setUpdateUserId(user.getUserId());
        boolean result = noticeService.updateNotice(noticeDTO);

        if (result) {
            return ResponseEntity.ok("공지 수정 성공");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("공지 수정 실패");
        }
    }
}