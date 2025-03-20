package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.GoogleNewsDTO;
import com.dev.wannabe.domain.home.service.GoogleNewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

    private final GoogleNewsService googleNewsService;

    /*
     * page : 뉴스 페이지
     * size : 뉴스 페이지의 아이템 개수
     * 성공 시 GoogleNewsDTO를 size 개 씩 반환
     */

    @GetMapping("/googleNews")
    @ResponseBody
    public ResponseEntity<List<GoogleNewsDTO>> googleNews(@RequestParam(required = false, defaultValue = "1") Integer page,
                                 @RequestParam(required = false, defaultValue = "5") Integer size
    ) {
        try {
            List<GoogleNewsDTO> googleNewsList = googleNewsService.getGoogleNews(page, size);
            return ResponseEntity.ok(googleNewsList);
        } catch (Exception e) {
            log.error("Google News 실패 {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}