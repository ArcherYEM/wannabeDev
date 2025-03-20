package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.model.vo.MinihompiTotal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class MinihompiService {

    private final com.dev.wannabe.domain.minihompi.mapper.MinihompiMapper minihompiMapper;

    public MinihompiTotal findMinihompi(Map<String, Object> map) {
        MinihompiTotal findMinihompi = minihompiMapper.findMyhompi(map);
        return findMinihompi;
    }

    public int updateTitle(Map<String, Object> miniHompi) {
        int updateTitle = minihompiMapper.updateTitle(miniHompi);
        return updateTitle;
    }

    public Map<String, Object> saveMood(Map<String, Object> map) {
        Map<String, Object> moodSave = minihompiMapper.moodSave(map);
        return moodSave;
    }
}
