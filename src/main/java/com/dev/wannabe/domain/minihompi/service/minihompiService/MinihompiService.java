package com.dev.wannabe.domain.minihompi.service.minihompiService;

import com.dev.wannabe.domain.minihompi.mapper.minihompi.MiniHompiMapper;
import com.dev.wannabe.domain.minihompi.model.minihompi.MinihompiDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class MinihompiService {

    private final MiniHompiMapper miniHompiMapper;


    public static MinihompiDto findMiniHompi(Map<String, String> map) {
        
    }
}
