package com.dev.wannabe.domain.minihompi.service.bgm;

import com.dev.wannabe.domain.minihompi.mapper.bgm.BgmMapper;
import com.dev.wannabe.domain.minihompi.model.bgm.Bgm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BgmService {

    private final BgmMapper bgmMapper;
    private static long sequence = 0L;

    public void save(Bgm bgm) {
        bgmMapper.save(bgm);
    }

    public Bgm findById(Long id) {
        return bgmMapper.findById(id).orElseThrow(() ->
                new RuntimeException("해당 BGM ID값으로 조회가 되지 않습니다:ID" + id));
    }


}
