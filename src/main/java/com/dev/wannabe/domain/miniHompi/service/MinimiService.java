package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.MinimiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.MinimiInfoDTO;
import com.dev.wannabe.domain.minihompi.model.vo.MinimiBasic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MinimiService {

    private final MinimiMapper minimiMapper;

    @Transactional
    public void createMinimi(MinimiInfoDTO minimiInfoDTO) {
        MinimiBasic minimiBasic = MinimiBasic.builder()
                .userId(minimiInfoDTO.getUserId())
                .productId(minimiInfoDTO.getProductId())
                .faceDirectionCode("01")
                .xPosition(0F)
                .yPosition(0F)
                .zPosition(0F)
                .mainYN("N")
                .useYN("N")
                .insertUserId(minimiInfoDTO.getUpsertUserId())
                .build();

        minimiMapper.saveMinimiBasic(minimiBasic);
    }
}
