package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {

    // 공지사항 목록 조회
    List<NoticeDTO> getNotices();


}