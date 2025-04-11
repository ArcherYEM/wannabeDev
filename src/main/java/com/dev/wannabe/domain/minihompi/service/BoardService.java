package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.HompiBoardMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBoardDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final HompiBoardMapper hompiBoadrdMapper;

    List<HompiBoardDTO> getBoardAllList (Map<String, Object> map){
        return hompiBoadrdMapper.getBoardAllList(map);
    }
}
