package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.PopupMessageMapper;
import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class PopupMessageService {

    @Autowired
    PopupMessageMapper popupMessageMapper;

    public List<PopupMessageDTO> getMessageList(String userId) {

        return popupMessageMapper.getMessageList(userId);
    }
}
