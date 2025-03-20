package com.dev.wannabe.domain.minihompi.service.minihompiService;

import com.dev.wannabe.domain.minihompi.mapper.minihompi.MiniHompiMapper;
import com.dev.wannabe.domain.minihompi.model.minihompi.MiniHompiTotal;
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

    public void saveMood(String mood) {
        MiniHompiTotal moodSave = minihompiMapper.moodSave(mood);
    }
}
