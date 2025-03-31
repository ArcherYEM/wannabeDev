package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface PopupMessageMapper {

    List<PopupMessageDTO> getMessageList(String userId);

    List<PopupMessageDTO> getReciveMsglist (String userId, String offset, String pageSize);

    int reciveMsgCount(String userId);

}
