package com.dev.wannabe.domain.home.controller;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.domain.home.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    public String Notice(Model model,
                         @RequestParam(name = "limit", defaultValue = "10") int limit,  // 기본값 10
                         @RequestParam(name = "offset", defaultValue = "0") int offset,
                         @RequestParam(required = false) String noticeType,
                         @RequestParam(required = false) String field,
                         @RequestParam(required = false) String keyword) {




        // 파라미터를 Map에 담아서 전달
        Map<String, Object> params = new HashMap<>();
        params.put("limit", limit);
        params.put("offset", offset);
        params.put("noticeType", noticeType);
        params.put("field", field);
        params.put("keyword", keyword);

        // Map을 NoticeService로 전달
        List<NoticeDTO> noticeList = noticeService.getFilteredNotices(params);


        // 날짜 범위를 동적으로 계산해서 사용
        for (NoticeDTO notice : noticeList) {
            notice.getDateRange();  // 날짜 범위 계산
        }

        // 페이징 계산
        int totalNoticesCount = noticeService.getFilteredNoticesCount(params);
        int totalPages = (int) Math.ceil((double) totalNoticesCount / limit);

        // 현재 페이지 번호 (0부터 시작하므로, 실제 페이지는 offset / limit + 1)
        int currentPage = offset / limit + 1;

        // 1페이지부터 totalPages까지 페이지 번호 계산(페이지 버튼 목록 생성)
        int startPage = ((currentPage - 1)/10)*10 + 1; // 앞쪽 페이지 시작 (현재 페이지 기준으로 2개 앞)
        int endPage = Math.min(startPage + 9, totalPages); // 뒤쪽 페이지 끝 (현재 페이지 기준으로 2개 뒤)

        // 페이징 계산 model
        model.addAttribute("notices", noticeList);  // 뷰로 공지사항 데이터 전달
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("currentPage", currentPage);  // 현재 페이지
        model.addAttribute("startPage", startPage);  // 시작 페이지
        model.addAttribute("endPage", endPage);  // 끝 페이지
        model.addAttribute("offset", offset);  // offset (현재 페이지)
        model.addAttribute("limit",limit);

        //검색 키워드 model
        model.addAttribute("noticeType", noticeType);
        model.addAttribute("field", field);
        model.addAttribute("keyword", keyword);

        System.out.println(totalPages + "+" + currentPage + "+" + startPage + "+" + endPage + "+" + limit);

        return "home/notice/notice";
    }


    @GetMapping("/view")
    public String NoticeView(){
        return "home/notice/noticeView";
    }
}
