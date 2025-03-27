package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.HompiDiaryDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiDiary;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HompiDiaryMapper {
    Integer saveDiary(HompiDiary diary);
    HompiDiaryDTO findDiaryByDiaryDTO(HompiDiaryDTO diaryDTO);
}
