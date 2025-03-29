package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserUpdateMapper;
import com.dev.wannabe.domain.home.model.dto.GetUserInfoDTO;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserUpdateService {
    private final UserUpdateMapper userUpdateMapper;

    private final BCryptPasswordEncoder passwordEncoder;

    // 회원정보 조회
    public GetUserInfoDTO getMyInfo(Long userId) {

        GetUserInfoDTO a = userUpdateMapper.getMyInfo(userId);
        return a;
    }

    public int updateMyInfo(String email, String phone, SessionUserDTO userData) {

        Map<String, Object> param = new HashMap<>();
        param.put("email", email);
        param.put("phone", phone);
        param.put("userId", userData.getUserId());
        int result = userUpdateMapper.updateMyInfo(param);
        return result;
    }

    public int checkEmail(String email) {
        int result = userUpdateMapper.checkEmail(email);
        return result;
    }

    public int checkPhone(String phone) {
        int result = userUpdateMapper.checkPhone(phone);
        return result;
    }

    public int updateMyPasswd(SessionUserDTO userData, String password) {
        Map<String, Object> param = new HashMap<>();
        param.put("password", (passwordEncoder.encode(password)));
        param.put("userId", userData.getUserId());
        int result = userUpdateMapper.updateMyPasswd(param);
        return result;
    }

    public int checkPassword(String password, SessionUserDTO userData) {

        int result = 0;
        return result;
    }
}
