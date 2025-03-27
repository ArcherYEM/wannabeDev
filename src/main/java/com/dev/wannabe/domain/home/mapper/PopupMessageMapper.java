package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface PopupMessageMapper {

    public List<PopupMessageDTO> getMessageList(String userId);

}
