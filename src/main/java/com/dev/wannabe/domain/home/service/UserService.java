package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.dto.UserExistDTO;
import com.dev.wannabe.domain.home.model.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
    public HttpStatus signUpUser(SignupUserDTO signupUser) {
        long userId;
        long hompiId;

        try {
            UserExistDTO userExist = UserExistDTO.builder()
                    .loginId(signupUser.getLoginId())
                    .email(signupUser.getEmail())
                    .phoneNo(signupUser.getPhoneNo())
                    .build();

            if (isUserExist(userExist)) {
                return HttpStatus.BAD_REQUEST;
            }

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

            Optional<Long> userIdData = userMapper.findUserIdByEmail(signupUser.getEmail());
            if (userIdData.isPresent()) {
                userId = userIdData.get();
            } else {
                throw new Exception();
            }

            UserDetail newUserDetail = UserDetail.builder()
                    .userId(userId)
                    .friendMessageAvailYN(signupUser.getFriendMessageAvailYN())
                    .hompiUseYN(signupUser.getHompiUseYN())
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

            FriendMessage friendMessage = FriendMessage.builder()
                    .userId(userId)
                    .friendUserId(0)
                    .message("가입을 축하합니다")
                    .insertUserId(0)
                    .build();

            userMapper.saveUserDetail(newUserDetail);
            userMapper.saveUserRole(newUserRole);
            userMapper.saveFriendMessage(friendMessage);

            Hompi newHompi = Hompi.builder()
                    .hompiUrl("test")
                    .hompiTitle("testTitle")
                    .ownerUserId(userId)
                    .insertUserId(userId)
                    .build();
            //hompiId


            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }

    }

    /*
     * Login Id 중복 확인 기능
     * 중복 아니면 return 200 ok
     * 중복이면 return 400 bad request
     */
    public HttpStatus checkDuplicationLoginId(String loginId) {
        UserExistDTO userExist = UserExistDTO.builder()
                .loginId(loginId)
                .build();

        if (isUserExist(userExist)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    /*
     * email 중복 확인 기능
     * 중복 아니면 return 200 ok
     * 중복이면 return 400 bad request
     */
    public HttpStatus checkDuplicationEmail(String email){
        UserExistDTO userExist = UserExistDTO.builder()
                .email(email)
                .build();

        if (isUserExist(userExist)) {
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
        UserExistDTO userExist = UserExistDTO.builder()
                .phoneNo(phoneNo)
                .build();

        if (isUserExist(userExist)) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    private boolean isUserExist(UserExistDTO userExist) {
        return userMapper.isUserExist(userExist) > 0;
    }


}
