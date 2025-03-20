package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.MiniHompiMapper;
import com.dev.wannabe.domain.minihompi.model.vo.MiniHompiTotal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class MinihompiService {

    private final MiniHompiMapper minihompiMapper;

    public MiniHompiTotal findMiniHompi(Map<String, Object> map) {
        MiniHompiTotal findMiniHompi = minihompiMapper.findMyHompi(map);
        return findMiniHompi;
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
