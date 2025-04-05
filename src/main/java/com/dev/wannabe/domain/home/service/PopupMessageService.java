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

    public List<PopupMessageDTO> getReceiveMsglist(String userId, String offset, String pageSize) {
        return popupMessageMapper.getReceiveMsglist(userId, offset, pageSize);
    }

    public int rceiveMsgCount(String userId) {
        return popupMessageMapper.receiveMsgCount(userId);
    }

    public int receiveUnreadMsgCount(String userId) {
        return popupMessageMapper.receiveUnreadMsgCount(userId);
    }

    public List<PopupMessageDTO> getMsgView(String messageId) {
        return popupMessageMapper.getMsgView(messageId);
    }

    public int messageReadUpdate(String messageId) {
        return popupMessageMapper.messageReadUpdate(messageId);
    }

    public List<PopupMessageDTO> getSendSearchName(String userId, String searchName) {
        return popupMessageMapper.getSendSearchName(userId, searchName);
    }

    public boolean SendFriendMessage(Map<String,Object> map) {
        return popupMessageMapper.SendFriendMessage(map);
    }

    public List<PopupMessageDTO> getSendMsglist(String userId, String offset, String pageSize) {
        return popupMessageMapper.getSendMsglist(userId, offset, pageSize);
    }

    public int sendMsgCount(String userId) {
        return popupMessageMapper.sendMsgCount(userId);
    }

    public boolean msgDelete(String messageId) { return popupMessageMapper.msgDelete(messageId); }
}