package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.FriendCommentDTO;
import com.dev.wannabe.domain.minihompi.model.vo.MinihompiTotal;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MinihompiMapper {

    MinihompiTotal findMyhompi(Map<String, Object> map);

    int updateTitle(Map<String, Object> minihompi);

    Map<String, Object> moodSave(Map<String, Object> param);

    MinihompiTotal findOwnerUserId(Long hompiId);

    int selectTodayCount(Map<String, Object> map);

    int updateTodayCount(Map<String, Object> map);

    void insertTodayCount(Map<String, Object> map);

    void updateTotalCount(Map<String, Object> map);

    Map<String, Object> updateHompiConfig(Map<String, Object> param);

    List<FriendCommentDTO> getFriendComment(Long hompiId);

    int friendCheck(Map<String, Object> map);
}

