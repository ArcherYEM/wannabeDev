package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserUpdateMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserUpdateService {
    private final UserUpdateMapper userUpdateMapper;

    // 회원정보 조회
    public SignupUserDTO getMyInfo(String userName) {

        SignupUserDTO a = userUpdateMapper.getMyInfo(userName);
        return a;
    }
}
