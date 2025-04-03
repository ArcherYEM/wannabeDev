package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.NoticeMapper;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        try{
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
        return noticeMapper.getNoticeById(noticeId);
    }
}

