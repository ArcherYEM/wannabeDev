package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.vo.UserBasic;
import com.dev.wannabe.domain.home.model.vo.UserDetail;
import com.dev.wannabe.domain.home.model.vo.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Long signUpUser(SignupUserDTO signupUser) {
        Long userId;

        try {
            /*
             * loginId, email, phoneNo 중복 체크
             * 중복되면 예외 처리 발생
             * 이후 400 Bad Request 반환
             */
            if (isUserExist(signupUser.getLoginId()) || isUserExist(signupUser.getEmail()) || isUserExist(signupUser.getPhoneNo())) {
                throw new Exception();
            }

            /*
             * User Basic 생성
             * 이후 User Basic 에서 User Id 추출
             */
            UserBasic newUserBasic = UserBasic.builder()
                    .loginId(signupUser.getLoginId())
                    .email(signupUser.getEmail())
                    .phoneNo(signupUser.getPhoneNo())
                    .password(passwordEncoder.encode(signupUser.getPassword()))
                    .name(signupUser.getName())
                    .genderCode(signupUser.getGenderCode())
                    .birthDate(signupUser.getBirthDate())
                    .userStatus("N")
                    .build();

            userMapper.saveUserBasic(newUserBasic);

            /*
             * User Basic 에서 User Id 추출
             * Optional 을 통해 User Id가 없으면 예외 처리 발생
             * 이후 400 Bad Request 반환
             */
            userId = userMapper.findUserIdByLoginId(signupUser.getLoginId());

            /*
             * User Detail, User Role 테이블 생성 및 저장
             * 회원 가입 축하용 Friend Message 생성 및 저장
             */
            UserDetail newUserDetail = UserDetail.builder()
                    .userId(userId)
                    .friendMessageAvailYN(signupUser.getFriendMessageAvailYN())
                    .confirmYN1(signupUser.getConfirmYN1())
                    .confirmYN2(signupUser.getConfirmYN2())
                    .confirmYN3(signupUser.getConfirmYN3())
                    .insertUserId(userId)
                    .build();

            UserRole newUserRole = UserRole.builder()
                    .roleCd("03")
                    .userId(userId)
                    .insertUserId(userId)
                    .build();

            userMapper.saveUserDetail(newUserDetail);
            userMapper.saveUserRole(newUserRole);

            return userId;
        } catch (Exception e) {
            return 0L;
        }
    }

    public Boolean isUserExist(String data) {
        return userMapper.isUserExist(data) > 0;
    }

    public String findId(String name, String birthDate){
        return userMapper.findIdByNameAndBirthDate(name, birthDate);
    }
}