package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.HompiBgmMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HompiBgmService {
    private final HompiBgmMapper bgmMapper;
    public List<HompiBgmDTO> getOwnerBgmList(Map<String,Object> bgmMap){
        if(bgmMap.get("hompiId") == null){
            return null;
        }
        return bgmMapper.findBgmByBgmMap(bgmMap);
    }

    public Integer getBgmCount(Long hompiId) {
        return bgmMapper.selectBgmCount(hompiId);
    }

    @Transactional
    public Boolean setBackGroundBgm(Map<String, Object> bgmIds) {
        Integer i = bgmMapper.updateBackgroundBgm(bgmIds);
        System.out.println(i + "<>");
        if(i == 0){
            return false;
        }
        return true;
    }
}
