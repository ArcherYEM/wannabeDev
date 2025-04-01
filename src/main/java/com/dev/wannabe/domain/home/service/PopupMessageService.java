package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.PopupMessageMapper;
import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
public class PopupMessageService {

    private final PopupMessageMapper popupMessageMapper;

    public List<PopupMessageDTO> getMessageList(String userId) {
        return popupMessageMapper.getMessageList(userId);
    }

    /*아래는 페이징 테스트*/
    public List<PopupMessageDTO> getReciveMsglist(String userId, String offset, String pageSize) {
        return popupMessageMapper.getReciveMsglist(userId, offset, pageSize);
    }

    public int reciveMsgCount(String userId) {
        return popupMessageMapper.reciveMsgCount(userId);
    }

    public int reciveUnreadMsgCount(String userId) {
        return popupMessageMapper.reciveUnreadMsgCount(userId);
    }

    public List<PopupMessageDTO> getReciveMsgView(String messageId) {
        return popupMessageMapper.getReciveMsgView(messageId);
    }

    public int messageReadUpdate(String messageId) {
        return popupMessageMapper.messageReadUpdate(messageId);
    }

    public List<PopupMessageDTO> getSendSearchName(String userId, String searchName) {
        return popupMessageMapper.getSendSearchName(userId, searchName);
    }
}