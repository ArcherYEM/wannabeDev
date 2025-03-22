package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.MinihompiMapper;
import com.dev.wannabe.domain.minihompi.model.vo.MinihompiTotal;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class MinihompiService {

    private final MinihompiMapper minihompiMapper;

    @Transactional
    public Map<String, Object> getMinihompiPopup(Long hompiId, SessionUserDTO userData, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        LocalDate now = LocalDate.now();
        String today = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));


        Long userId = (userData != null) ? userData.getUserId() : null;

        // 홈피 주인 조회
        MinihompiTotal ownerUser = minihompiMapper.findOwnerUserId(hompiId);
        Long ownerId = (ownerUser != null) ? ownerUser.getOwnerUserId() : null;

        // 미니홈피 정보 조회
        Map<String, Object> map = new HashMap<>();
        map.put("ownerUserId", ownerId);
        map.put("userId", userId);
        map.put("today", today);
        map.put("hompiId", hompiId);

        MinihompiTotal minihompi = minihompiMapper.findMyhompi(map);

        // 세션에서 오늘 방문한 hompiId 확인
        @SuppressWarnings("unchecked")
        Set<Long> viewed = (Set<Long>) session.getAttribute("viewedHompiIDs");
        if (viewed == null) {
            viewed = new HashSet<>();
        }

        String myHompi;

        if (userData == null) {
            myHompi = "1"; // 비로그인
        } else if (userId.equals(ownerId)) {
            myHompi = "0"; // 내 미니홈피
        } else {
            myHompi = "2"; // 남의 미니홈피

            if (!viewed.contains(hompiId)) {
                int todayCount = minihompiMapper.selectTodayCount(map);

                if (todayCount == 0) {
                    // 방문 기록 없을 경우 → INSERT + HOMPI 업데이트
                    minihompiMapper.insertTodayCount(map);
                    minihompiMapper.updateTotalCount(map);
                } else {
                    // 이미 오늘 방문 기록 있을 경우 → TODAY_CNT만 +1
                    minihompiMapper.updateTodayCount(map);
                }

                // 세션에 방문 기록 저장
                viewed.add(hompiId);
                session.setAttribute("viewedHompiIDs", viewed);
            }
        }

        result.put("hompiId", hompiId);
        result.put("myHompi", myHompi);
        result.put("minihompi", minihompi);

        return result;
    }


    public Map<String, Object> updateMinihompiTitle(SessionUserDTO userData, String title) {
        Map<String, Object> response = new HashMap<>();
        if (title == null || title.trim().isEmpty()) {
            response.put("status", "fail");
            response.put("message", "타이틀은 비어있을 수 없습니다.");
            return response;
        }

        Map<String, Object> param = new HashMap<>();
        param.put("hompiId", userData.getHompiId());
        param.put("title", title);

        int result = minihompiMapper.updateTitle(param);

        if (result == 0) {
            response.put("status", "fail");
            response.put("message", "타이틀 변경에 실패했습니다.");
        } else {
            response.put("status", "success");
            response.put("message", "타이틀 변경 성공");
        }

        return response;
    }

    public Map<String, Object> saveMood(Long hompiId, String moodRaw) {
        String mood = URLDecoder.decode(moodRaw, StandardCharsets.UTF_8);
        mood = mood.replace("=", "").trim();

        Map<String, Object> param = new HashMap<>();
        param.put("hompiId", hompiId);
        param.put("mood", mood);

        return minihompiMapper.moodSave(param);
    }
}
