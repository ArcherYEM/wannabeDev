package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.NoticeMapper;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    public List<NoticeDTO> getAllNotices() {
        return noticeMapper.getNotices();  // Mapper를 호출하여 공지사항 목록을 가져옴
    }


}

