package com.dev.wannabe.domain.sample.service;

import com.dev.wannabe.domain.sample.mapper.SampleMapper;
import com.dev.wannabe.domain.sample.model.SampleCriteria;
import com.dev.wannabe.domain.sample.model.SampleModel;
import com.dev.wannabe.global.model.CustomPageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SampleService {

    private final SampleMapper sampleMapper;

    public CustomPageDTO<SampleModel> samplePage(int page, int size, SampleCriteria condition) {
        int startIdx = (page - 1) * size;
        List<SampleModel> boards = sampleMapper.findAllSampleBoard(startIdx, size, condition);
        int totalElements = sampleMapper.countSampleBoard(condition);

        return new CustomPageDTO(boards, totalElements, page, size);
    }
}
