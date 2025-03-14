package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    /*
     * 회원 가입 기능
     * 중복 검증 후
     * 중복이면 return 400 bad request
     * 저장 후 return 200 ok
     */
    public HttpStatus signUpUser(SignupUserDTO signupUser) {

        String userId = UUID.randomUUID().toString();

        UserBasic newUser = UserBasic.builder()
                .userId(userId)
                .loginId(signupUser.getLoginId())
                .email(signupUser.getEmail())
                .phoneNo(signupUser.getPhoneNo())
                .password(passwordEncoder.encode(signupUser.getPassword()))
                .name(signupUser.getName())
                .genderCode(signupUser.getGenderCode())
                .birthDate(signupUser.getBirthDate())
                .userStatus("N")
                .insertUserId(userId)
                .build();

        if (isExistByLoginId(newUser.getLoginId())) {
            return HttpStatus.BAD_REQUEST;
        }
        if (isExistByEmail(newUser.getEmail())) {
            return HttpStatus.BAD_REQUEST;
        }
        if (isExistByPhoneNo(newUser.getPhoneNo())) {
            return HttpStatus.BAD_REQUEST;
        }

        userMapper.saveUserBasic(newUser);
        return HttpStatus.OK;
    }

    /*
     * Login Id 중복 확인 기능
     * 중복 아니면 return 200 ok
     * 중복이면 return 400 bad request
     */
    public HttpStatus checkDuplicationLoginId(String loginId) {
        if (isExistByLoginId(loginId)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    /*
     * email 중복 확인 기능
     * 중복 아니면 return 200 ok
     * 중복이면 return 400 bad request
     */
    public HttpStatus checkDuplicationEmail(String email) {
        if (isExistByEmail(email)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    /*
     * phone no 중복 확인 기능
     * 중복 아니면 return 200 ok
     * 중복이면 return 400 bad request
     */
    public HttpStatus checkDuplicationPhone(String phoneNo) {
        if (isExistByPhoneNo(phoneNo)) {
            return HttpStatus.BAD_REQUEST;
        }
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
