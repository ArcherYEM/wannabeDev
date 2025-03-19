package com.dev.wannabe.domain.home.controller.news;

import com.dev.wannabe.domain.home.model.news.dto.SearchDTO;
import com.dev.wannabe.domain.home.service.news.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/naverNews")
    public ResponseEntity<String> naverNews() {
        SearchDTO search = SearchDTO.builder()
                .query("비트코인")
                .display(10)
                .build();
        return newsService.searchNews(search);
    }

}
