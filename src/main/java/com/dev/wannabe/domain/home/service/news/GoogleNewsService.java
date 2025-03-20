package com.dev.wannabe.domain.home.service.news;

import com.dev.wannabe.domain.home.model.news.dto.GoogleNewsDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleNewsService {

    private static final String GOOGLE_NEWS_RSS = "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko";

    // page : 뉴스 페이지
    // size : 뉴스 페이지 당 들어있는 아이템 개수
    public List<GoogleNewsDTO> getGoogleNews(Integer page, Integer size) {
        try {
            JSONArray newsArray = extractNewsArrayFromNewsUrl(GOOGLE_NEWS_RSS);
            Integer start = (page-1) + 1;
            Integer end = Math.min(start + size, newsArray.length());

            List<GoogleNewsDTO> googleNewsList = new ArrayList<>();

            for (int i = start; i < end; i++) {
                JSONObject newsObject = newsArray.getJSONObject(i);

                GoogleNewsDTO googleNews = GoogleNewsDTO
                        .builder()
                        .title(newsObject.getString("title"))
                        .link(newsObject.getString("link"))
                        .build();
                googleNewsList.add(googleNews);
            }

            log.info("구글 뉴스 서비스 성공");
            return googleNewsList;
        } catch (Exception e) {
            log.error("구글 뉴스 서비스 실패 : {}", e.getMessage());
            return new ArrayList<>();
        }

    }

    private JSONArray extractNewsArrayFromNewsUrl(String newsXml) throws Exception {
        try {
            String xmlData = getXmlFromUrl(newsXml);
            JSONObject jsonObject = XML.toJSONObject(xmlData);
            return jsonObject.getJSONObject("rss").getJSONObject("channel").getJSONArray("item");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    private String getXmlFromUrl(String urlStr) throws Exception {
        log.info("get XML from {}", urlStr);
        StringBuilder xmlData = new StringBuilder();
        URL url = new URL(urlStr);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/xml");
        BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));

        String line;
        while ((line = reader.readLine()) != null) {
            xmlData.append(line).append("\n");
        }
        reader.close();
        connection.disconnect();
        log.info("get XML end");
        return xmlData.toString();
    }

}
