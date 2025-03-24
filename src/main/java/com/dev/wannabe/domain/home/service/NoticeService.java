package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.NoticeMapper;
import com.dev.wannabe.domain.home.model.dto.NoticeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

//    public int getTotalNoticesCount(){
//        return noticeMapper.getTotalNoticesCount();
//    }
//
//    public List<NoticeDTO> getNoticesPage(Map<String, Object> params) {
//        return noticeMapper.getNoticesPage(params);
//    }

    public List<NoticeDTO> getFilteredNotices(Map<String, Object> params) {
        return noticeMapper.getFilteredNotices(params);
    }

    public int getFilteredNoticesCount(Map<String, Object> params) {
        return noticeMapper.getFilteredNoticesCount();
    }
}

