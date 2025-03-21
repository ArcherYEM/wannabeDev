package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.model.vo.MinihompiTotal;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MinihompiService {

    private final com.dev.wannabe.domain.minihompi.mapper.MinihompiMapper minihompiMapper;

    public Map<String, Object> getMinihompiPopup(Long hompiId, SessionUserDTO userData) {
        Map<String, Object> result = new HashMap<>();
        LocalDate today = LocalDate.now();
        Long userId = userData != null ? userData.getUserId() : null;

        MinihompiTotal ownerUser = minihompiMapper.findOwnerUserId(hompiId);
        Long ownerId = (ownerUser != null) ? ownerUser.getOwnerUserId() : null;

        Map<String, Object> map = new HashMap<>();
        map.put("ownerUserId", ownerId);
        map.put("userId", userId);
        map.put("today", today);
        map.put("hompiId", hompiId);

        MinihompiTotal minihompi = minihompiMapper.findMyhompi(map);
        String myHompi;

        if (userData == null) {
            myHompi = "1"; // 비로그인
        } else if (ownerId != null && userId.equals(ownerId)) {
            myHompi = "0"; // 내 미니홈피
        } else {
            myHompi = "2"; // 남의 미니홈피
            // minihompiMapper.insertTodayCount(map);
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
