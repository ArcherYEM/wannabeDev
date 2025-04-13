package com.dev.wannabe.domain.home.controller;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.domain.home.service.NoticeService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.extern.slf4j.Slf4j;
import org.mariadb.jdbc.client.socket.impl.SocketUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        // DB에 검색 데이터 가 없으면 offset 이 음수로 나와서 오류발생 offset 음수 방지함수
        if (offset < 0) offset = 0;


        // 유저 권한 정보
        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");
        String userRole = "03"; // default role
        if (user != null){
            userRole = user.getRole();
        }

        // Service에 모든 로직 위임
        Map<String, Object> result = noticeService.getNoticePage(limit, offset, noticeType, field, keyword, userRole);

        // model에 담기
        model.addAllAttributes(result);

        return "home/notice/notice";
    }

    @GetMapping("/view/{noticeId}")
    public String NoticeView(@PathVariable("noticeId") Long noticeId,HttpSession session, HttpServletRequest req, Model model){

        SessionUserDTO user = (SessionUserDTO)session.getAttribute("userData");
        String userRole = "03"; // default role
        if (user != null){
            userRole = user.getRole();
        }

        NoticeDTO notice = noticeService.getNoticeById(noticeId,userRole);
        System.out.println("Controller UserRole : " + userRole);
        model.addAttribute("notice", notice);
        model.addAttribute("userRole",userRole);

        //현재 공지의 정렬 기준값 생성
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime currentSortDate = (notice.getUpdateDT() != null && !notice.getUpdateDT().isEmpty())
                ? LocalDateTime.parse(notice.getUpdateDT(), formatter)
                : LocalDateTime.parse(notice.getInsertDT(), formatter);

        // 이전/다음 공지 조회
        NoticeDTO previousNotice = noticeService.getPreviousNotice(noticeId, currentSortDate, userRole);
        NoticeDTO nextNotice = noticeService.getNextNotice(noticeId, currentSortDate, userRole);

        model.addAttribute("nextNotice", nextNotice);
        model.addAttribute("previousNotice",previousNotice);

        return "home/notice/noticeView";
    }

    // 공지사항 등록페이지 이동
    @GetMapping("/insert_page")
    public String insertPage(){ return "home/notice/insert_page";}

    // 공지사항 업데이트
    @GetMapping("/update/{noticeId}")
    public String editNotice(@PathVariable("noticeId") Long noticeId, Model model,HttpSession session) {

        SessionUserDTO user = (SessionUserDTO)session.getAttribute("userData");
        String userRole = "03";
        if (user != null){
            userRole = user.getRole();
        }
        NoticeDTO notice = noticeService.getNoticeById(noticeId,userRole);
        model.addAttribute("notice", notice);
        return "home/notice/update_page"; // 등록 폼과 동일한 HTML 사용 가능
    }



    @PostMapping(value = "/delete", produces = "text/plain; charset=UTF-8")
    @ResponseBody
    public ResponseEntity<String> deleteNotices(@RequestBody List<Long> notices, HttpSession session) {

        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");
        if (user == null || !(user.getRole().equals("01") || user.getRole().equals("02"))) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("권한이 없습니다.");
        }

        try {
            noticeService.deleteNotices(notices);

            //성공 응답 (UTF-8로 인코딩된 한글 메세지)
            return ResponseEntity
                    .ok()
                    .body("선택한 공지가 삭제되었습니다.");
        } catch (Exception e) {
            log.error("공지 삭제 오류", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("삭제 중 오류가 발생했습니다. 다시 시도 해주세요.");
        }
    }


}
