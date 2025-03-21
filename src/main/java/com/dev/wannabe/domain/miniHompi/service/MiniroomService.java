package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.MiniroomMapper;
import com.dev.wannabe.domain.minihompi.model.dto.MiniroomInfoDTO;
import com.dev.wannabe.domain.minihompi.model.vo.MiniroomBasic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MiniroomService {

    private final MiniroomMapper miniroomMapper;

    @Transactional
    public void createMiniroom(MiniroomInfoDTO miniroomInfo) {
        try {
            MiniroomBasic miniroomBasic = MiniroomBasic.builder()
                    .userId(miniroomInfo.getUserId())
                    .productId(miniroomInfo.getProductId())
                    .insertUserId(miniroomInfo.getUpsertUserId())
                    .build();

            miniroomMapper.saveMiniroomBasic(miniroomBasic);
        } catch (Exception e) {
            return;
        }

    }
}
