package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public HttpStatus checkDuplicationLoginId(String loginId) {
        if (isExistByLoginId(loginId)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    public HttpStatus checkDuplicationEmail(String email) {
        if (isExistByEmail(email)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    public HttpStatus checkDuplicationPhone(String phoneNo) {
        if (isExistByPhoneNo(phoneNo)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    public HttpStatus signUpUser(SignupUserDTO signupUser) {

        String userId = UUID.randomUUID().toString();

        UserBasic userBasic = UserBasic.builder()
                .userId(userId)
                .loginId(signupUser.getLoginId())
                .email(signupUser.getEmail())
                .phoneNo(signupUser.getPhoneNo())
                .password(signupUser.getPassword())
                .name(signupUser.getName())
                .genderCode(signupUser.getGenderCode())
                .birthDate(signupUser.getBirthDate())
                .userStatus("N")
                .insertUserId(userId)
                .build();

        if (isExistByLoginId(userBasic.getLoginId())) {
            return HttpStatus.BAD_REQUEST;
        }
        if (isExistByEmail(userBasic.getEmail())) {
            return HttpStatus.BAD_REQUEST;
        }
        if (isExistByPhoneNo(userBasic.getPhoneNo())) {
            return HttpStatus.BAD_REQUEST;
        }

        userMapper.saveUserBasic(userBasic);
        return HttpStatus.OK;
    }

    private boolean isExistByLoginId(String loginId) {
        return userMapper.isExistByLoginId(loginId) > 0;
    }

    private boolean isExistByEmail(String email) {
        return userMapper.isExistByEmail(email) > 0;
    }

    private boolean isExistByPhoneNo(String phoneNo) {
        return userMapper.isExistByPhoneNo(phoneNo) > 0;
    }


}
