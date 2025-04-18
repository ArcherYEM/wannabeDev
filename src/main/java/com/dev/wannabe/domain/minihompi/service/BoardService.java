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

    List<HompiBoardDTO> getBoardAllList(Map<String, Object> map) {
        return hompiBoadrdMapper.getBoardAllList(map);
    }

    Long getBoardListCount(Long hompiId, Long folderId) {
        return hompiBoadrdMapper.getBoardListCount(hompiId, folderId);
    }

    List<HompiBoardDTO> getBoardView(Long hompiBoardId) {
        return hompiBoadrdMapper.getBoardView(hompiBoardId);
    }

    boolean deleteBoardPost(Long deleteList){
        return hompiBoadrdMapper.deleteBoardPost(deleteList);
    }

}