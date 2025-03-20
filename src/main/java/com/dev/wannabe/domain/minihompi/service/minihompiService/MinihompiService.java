package com.dev.wannabe.domain.minihompi.service.minihompiService;

import com.dev.wannabe.domain.minihompi.mapper.MiniHompiMapper;
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
}
