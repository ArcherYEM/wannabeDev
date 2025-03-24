package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface NoticeMapper {

//    // 공지사항 목록 조회
    int getFilteredNoticesCount();

    List<NoticeDTO> getFilteredNotices(Map<String, Object> params);
}