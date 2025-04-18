package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.model.dto.HompiVisitorDTO;
import com.dev.wannabe.domain.minihompi.mapper.MinihompiMapper;
import com.dev.wannabe.domain.minihompi.mapper.MinimiMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitorService {

    @Autowired
    private final MinihompiMapper minihompiMapper;

    @Transactional
    public Map<String,Object> getVisitorPage(Long hompiId, int offset){
        if (offset < 0 ) offset = 0;

        List<HompiVisitorDTO> visitorList = minihompiMapper.selectVisitorList(hompiId, offset);
        int totalVisitorCount = minihompiMapper.visitorCount(hompiId);

        // ✅ 각 방명록의 글자 수 계산해서 Map으로 담기
        Map<Long, Integer> contentLengthMap = new HashMap<>();
        for (HompiVisitorDTO dto : visitorList) {
            int length = dto.getGuestBookContent() != null ? dto.getGuestBookContent().length() : 0;
            contentLengthMap.put(dto.getGuestBookId(), length);
        }

        int totalPages = (int) Math.ceil((double) totalVisitorCount / 5);
        int currentPage = offset / 5 + 1;
        int startPage = ((currentPage - 1) / 10) * 10 + 1;
        int endPage = totalPages == 0 ? 1 : Math.min(startPage + 9, totalPages);

        Map<String, Object> result = new HashMap<>();
        result.put("visitorList", visitorList);
        result.put("totalPages", totalPages);
        result.put("currentPage", currentPage);
        result.put("startPage", startPage);
        result.put("endPage", endPage);
        result.put("offset", offset);

        return result;
    }
}
