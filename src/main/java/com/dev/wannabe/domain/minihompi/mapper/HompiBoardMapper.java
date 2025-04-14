package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.HompiBoardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface HompiBoardMapper {
    List<HompiBoardDTO> getBoardAllList(Map<String, Object> map);
    Long getBoardListCount(Long hompiId, Long folderId);
    List<HompiBoardDTO> getBoardView(Long hompiBoardId);
    boolean deleteBoardPost(Long deleteList);
}
