package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.HompiBgmMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BgmService {

    private final HompiBgmMapper bgmMapper;

    public HompiBgmDTO getOwnerBgmList(Long hompiId){
        if(hompiId == null){
            return null;
        }
        return bgmMapper.findOwnerBgmByOwnerId(hompiId);
    }
}
