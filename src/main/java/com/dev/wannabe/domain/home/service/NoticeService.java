package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.NoticeMapper;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

        // 권한이 '03'일 경우 url으로 접속을 금지
        if ("03".equals(userRole)) {
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
        // 3. 권한이 '03'일 경우 noticeType이 '04', '05'는 제외
        if ("03".equals(userRole)) {
            params.put("excludeNoticeTypes", new String[] {"04", "05"});
        }

        // 데이터 조회
        List<NoticeDTO> notice = noticeMapper.getFilteredNotices(params);
        int totalNoticesCount = noticeMapper.getFilteredNoticesCount(params);

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
            // XSS 방지 처리
            String cleanTitle = Jsoup.clean(noticeDTO.getNoticeTitle(), Safelist.basic());

            Safelist safelist = Safelist.relaxed()
                .addTags("h1", "h2", "h3", "h4", "h5", "h6","ol", "ul", "li", "p", "span", "hr", "s", "del", "strike")
                    .addAttributes("li", "class")
                    .addAttributes("hr", "class");


            String cleanContents = Jsoup.clean(noticeDTO.getNoticeContents(), safelist);

            noticeDTO.setNoticeTitle(cleanTitle);
            noticeDTO.setNoticeContents(cleanContents);

            splitDateTime(noticeDTO);

            noticeMapper.insertNotice(noticeDTO);
            return true;
        } catch (Exception e) {
            log.error("공지 등록 중 오류 발생 : ", e);
            return false;
        }
    }

    private void splitDateTime(NoticeDTO dto) {
        if (dto.getStartDateTime() != null) {
            String[] parts = dto.getStartDateTime().contains("T")
                    ? dto.getStartDateTime().split("T")
                    : dto.getStartDateTime().split(" ");
            if (parts.length == 2) {
                dto.setStartDate(parts[0].replace("-", ""));
                dto.setStartTime(parts[1].replace(":", ""));
            }
        }

        if (dto.getEndDateTime() != null) {
            String[] parts = dto.getEndDateTime().contains("T")
                    ? dto.getEndDateTime().split("T")
                    : dto.getEndDateTime().split(" ");
            if (parts.length == 2) {
                dto.setEndDate(parts[0].replace("-", ""));
                dto.setEndTime(parts[1].replace(":", ""));
            }
        }
    }



    // 공지사항 상세 페이지
    @Transactional
    public NoticeDTO getNoticeById(Long noticeId,String userRole){
        try {
            Map<String, Object> param = new HashMap<>();
            param.put("noticeId", noticeId);
            param.put("userRole", userRole);

            // 3. 권한이 '03'일 경우 noticeType이 '04', '05'는 제외
            if ("03".equals(userRole)) {
                param.put("excludeNoticeTypes", new String[] {"04", "05"});
            }

            NoticeDTO notice = noticeMapper.getNoticeById(param);

            if (notice == null) {
                throw new NoSuchElementException("해당 ID의 공지를 찾을 수 없습니다: " + noticeId);
            }

            // XSS 방지: 공지사항 내용 필터링
            String sanitizedContent = Jsoup.clean(notice.getNoticeContents(), Safelist.relaxed());
            notice.setNoticeContents(sanitizedContent);

            return notice;
        } catch (DataAccessException e) {
            throw new RuntimeException("데이터베이스 접근 중 오류 발생", e);
        }
    }
    public NoticeDTO getPreviousNotice(Long currentNoticeId, LocalDateTime sortDate, String userRole) {
        Map<String, Object> param = new HashMap<>();
        param.put("noticeId", currentNoticeId);
        param.put("sortDate", sortDate);
        param.put("userRole", userRole);


        if ("03".equals(userRole)) {
            param.put("excludeNoticeTypes", new String[] {"04", "05"});
        }

        return noticeMapper.findPreviousNotice(param);
    }

    public NoticeDTO getNextNotice(Long currentNoticeId, LocalDateTime sortDate, String userRole) {
        Map<String, Object> param = new HashMap<>();
        param.put("noticeId", currentNoticeId);
        param.put("sortDate", sortDate);
        param.put("userRole", userRole);

        if ("03".equals(userRole)) {
            param.put("excludeNoticeTypes", new String[] {"04", "05"});
        }

        System.out.println("after currentNoticeId: " + param.get("noticeId"));
        System.out.println("after excludeNoticeTypes: " + param.get("excludeNoticeTypes"));


        return noticeMapper.findNextNotice(param);
    }


    // 공지사항 수정
    @Transactional
    public boolean updateNotice(NoticeDTO noticeDTO) {
        try {
            // XSS 방지 처리
            String cleanTitle = Jsoup.clean(noticeDTO.getNoticeTitle(), Safelist.basic());
            Safelist safelist = Safelist.relaxed()
                    .addTags("h1", "h2", "h3", "h4", "h5", "h6","ol", "ul", "li", "p", "span", "hr", "s", "del", "strike")
                    .addAttributes("li", "class")
                    .addAttributes("hr", "class");
            String cleanContents = Jsoup.clean(noticeDTO.getNoticeContents(), safelist);
            String original = noticeDTO.getNoticeContents();
            original = original.replace("<hr />", "<hr>").replace("<hr/>", "<hr>");
            cleanContents = Jsoup.clean(original, safelist);



            noticeDTO.setNoticeTitle(cleanTitle);
            noticeDTO.setNoticeContents(cleanContents);

            splitDateTime(noticeDTO);
            noticeMapper.updateNotice(noticeDTO);

            int result = noticeMapper.updateNotice(noticeDTO);
            return result > 0;
        } catch (Exception e) {
            log.error("공지 수정 중 오류 발생: ", e);
            return false;
        }
    }

    //delete
    @Transactional
    public void deleteNotices(List<Long> notices) {
        if (notices == null || notices.isEmpty()) return;
        noticeMapper.deleteNoticesByNotices(notices);
    }

}

