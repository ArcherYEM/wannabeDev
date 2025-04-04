package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface PopupMessageMapper {

    List<PopupMessageDTO> getMessageList(String userId);

    List<PopupMessageDTO> getReceiveMsglist (String userId, String offset, String pageSize);

    int receiveMsgCount(String userId);

    int receiveUnreadMsgCount(String userId);

    List<PopupMessageDTO> getMsgView (String messageId);

    int messageReadUpdate(String messageId);

    List<PopupMessageDTO> getSendSearchName(String userId, String searchName);

    boolean SendFriendMessage(Map<String,Object> map);

    public List<PopupMessageDTO> getSendMsglist(String userId, String offset, String pageSize);

    int sendMsgCount(String userId);
}
