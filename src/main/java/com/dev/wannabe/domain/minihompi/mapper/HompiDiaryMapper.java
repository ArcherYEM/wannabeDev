package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.DiaryExistenceDTO;
import com.dev.wannabe.domain.minihompi.model.dto.HompiDiaryDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiDiary;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface HompiDiaryMapper {
    Integer saveDiary(HompiDiary diary);
    HompiDiaryDTO findDiaryByDiaryDTO(HompiDiaryDTO diaryDTO);
    Integer deleteDiary(@Param("diaryId")Long diaryId , @Param("hompiId")Long hompiId);
    Integer updateDiary(HompiDiaryDTO diaryDTO);
    HompiDiaryDTO findDiaryByDay(@Param("day") LocalDate day, @Param("hompiId")Long hompiId, @Param("folderId") Long folderId);

    List<String> checkDiary(DiaryExistenceDTO diaryExistenceDTO);
}
