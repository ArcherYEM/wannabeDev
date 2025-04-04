package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.NoticeMapper;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {
    @Autowired
    private NoticeMapper noticeMapper;

    public Map<String, Object> getNoticePage(int limit, int offset, String noticeType, String field, String keyword, String userRole) {
        // null 방지 처리
        if (noticeType == null) {
            noticeType = "";
        }

        if (field == null) {
            field = "";
        }

        if (keyword == null) {
            keyword = "";
        }

        // 권한이 '01'일 경우 url으로 접속을 금지
        if ("01".equals(userRole)) {
            if ("04".equals(noticeType) || "05".equals(noticeType)) {
                noticeType = "";  // 일반 사용자는 '04'와 '05'를 못 보게 함
            }
        }

        // 파라미터 구성
        Map<String, Object> params = new HashMap<>();
        params.put("limit", limit);
        params.put("offset", offset);
        params.put("noticeType", noticeType);
        params.put("field", field);
        params.put("keyword", keyword);
        params.put("userRole",userRole);
        // 3. 권한이 '01'일 경우 noticeType이 '04', '05'는 제외
        if ("01".equals(userRole)) {
            // 일반 사용자는 '04'와 '05'를 제외해야 함
            params.put("excludeNoticeTypes", new String[] {"04", "05"});
        }

        // 데이터 조회
        List<NoticeDTO> notice = noticeMapper.getFilteredNotices(params);
        int totalNoticesCount = noticeMapper.getFilteredNoticesCount(params);

//        System.out.println(notice);
        // 4. 날짜 가공
        for (NoticeDTO noticeday : notice) {
            noticeday.getDateRange();
        }

        // 페이징 계산
        int totalPages = (int) Math.ceil((double) totalNoticesCount / limit);
        int currentPage = offset / limit + 1;
        int startPage = ((currentPage - 1) / 10) * 10 + 1;
        int endPage = totalPages == 0 ? 1 : Math.min(startPage + 9, totalPages);

        // 결과 반환
        Map<String, Object> result = new HashMap<>();
        result.put("notice", notice);
        result.put("totalPages", totalPages);
        result.put("currentPage", currentPage);
        result.put("startPage", startPage);
        result.put("endPage", endPage);
        result.put("limit", limit);
        result.put("offset", offset);
        result.put("noticeType", noticeType);
        result.put("field", field);
        result.put("keyword", keyword);
        result.put("userRole",userRole);

        return result;
    }

    // 공지사항 등록
    @Transactional
    public boolean insertNotice(NoticeDTO noticeDTO){
        try {
            // 날짜/시간 분리
            if (noticeDTO.getStartDateTime() != null && noticeDTO.getStartDateTime().contains("T")) {
                String[] startParts = noticeDTO.getStartDateTime().split("T");
                noticeDTO.setStartDate(startParts[0].replace("-",""));  // 예: 2025-04-04
                noticeDTO.setStartTime(startParts[1].replace(":", "")); // 예: 2005
            }

            if (noticeDTO.getEndDateTime() != null && noticeDTO.getEndDateTime().contains("T")) {
                String[] endParts = noticeDTO.getEndDateTime().split("T");
                noticeDTO.setEndDate(endParts[0].replace("-",""));      // 예: 2025-04-06
                noticeDTO.setEndTime(endParts[1].replace(":", ""));     // 예: 1800
            }

            // 실제 등록
            noticeMapper.insertNotice(noticeDTO);
            return true;
        } catch (Exception e) {
            log.error("공지 등록 중 오류 발생 : ", e);
            return false;
        }
    }

    // 공지사항 상세 페이지
    @Transactional
    public NoticeDTO getNoticeById(Long noticeId){
        try {
            NoticeDTO notice = noticeMapper.getNoticeById(noticeId);
            // 공지가 없을 경우 예외 발생
            if (notice == null) {
                throw new NoSuchElementException("해당 ID의 공지를 찾을 수 없습니다: " + noticeId);
            }

            // XSS 방지: 공지사항 내용 필터링
            String sanitizedContent = Jsoup.clean(notice.getNoticeContents(), Safelist.basic());
            notice.setNoticeContents(sanitizedContent);

            return notice;
        } catch (DataAccessException e) {
            throw new RuntimeException("데이터베이스 접근 중 오류 발생", e);
        }
    }
}

