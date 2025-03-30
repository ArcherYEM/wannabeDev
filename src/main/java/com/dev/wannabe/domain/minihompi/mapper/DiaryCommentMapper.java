package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.DiaryCommentFindDTO;
import com.dev.wannabe.domain.minihompi.model.vo.DiaryComment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DiaryCommentMapper {
    Integer saveDiaryComment(DiaryComment diaryComment);

    List<DiaryCommentFindDTO> findDiaryCommentByDiaryId(@Param("hompiId") Long hompiId,@Param("diaryId") Long diaryId);

    Integer deleteDiaryCommentByCommentId(Long commentId);
}
