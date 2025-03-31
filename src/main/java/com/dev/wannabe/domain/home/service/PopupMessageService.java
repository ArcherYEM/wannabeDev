package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.PopupMessageMapper;
import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;



@Slf4j
@Service
@RequiredArgsConstructor
public class PopupMessageService {

    private final PopupMessageMapper popupMessageMapper;

    public List<PopupMessageDTO> getMessageList(String userId) { return popupMessageMapper.getMessageList(userId); }

    /*아래는 페이징 테스트*/
    public List<PopupMessageDTO> getReciveMsglist(String userId, String offset, String pageSize) {
        return popupMessageMapper.getReciveMsglist(userId, offset, pageSize);
    }

    public int reciveMsgCount(String userId) {
        return popupMessageMapper.reciveMsgCount(userId);
    }
}
