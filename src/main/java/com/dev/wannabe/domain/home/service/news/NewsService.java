package com.dev.wannabe.domain.home.service.news;

import com.dev.wannabe.domain.home.model.news.dto.SearchDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class NewsService {

    @Value("${api.naverOpenApi.client.id}")
    private String clientId;

    @Value("${api.naverOpenApi.client.secret}")
    private String clientSecret;

    private final String apiUrl = "https://openapi.naver.com/v1/search/news.json";
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> searchNews(SearchDTO searchData) {
        URI uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("query", searchData.getQuery())
                .queryParam("display", searchData.getDisplay())
                .queryParam("start", searchData.getStart())
                .queryParam("sort", searchData.getSort())
                .build()
                .encode()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
    }

}
