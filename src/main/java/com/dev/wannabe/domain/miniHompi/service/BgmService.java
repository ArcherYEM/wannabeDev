package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.BgmMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import com.dev.wannabe.domain.minihompi.model.vo.Hompi;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BgmService {

    private final BgmMapper bgmMapper;

    public HompiBgmDTO getOwnerBgmList(Long hompiId){
        if(hompiId == null){
            return null;
        }
        return bgmMapper.findOwnerBgmByOwnerId(hompiId);
    }
}
