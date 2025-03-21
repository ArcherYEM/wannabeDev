package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UpdateProfileMapper {

        // 사용자 정보를 loginId로 조회
        SignupUserDTO findByLoginId(String loginId);

        // 이메일 중복 확인 (현재 사용자 제외)
        int countByEmailAndNotLoginId(String email, String loginId);

        // 전화번호 중복 확인 (현재 사용자 제외)
        int countByPhoneNoAndNotLoginId(String phoneNo, String loginId);

        // 비밀번호 검증을 위한 사용자 정보 조회
        SignupUserDTO findByLoginIdForPassword(String loginId);

        // 사용자 정보 업데이트
        void updateUser(SignupUserDTO SignupUserDTO);
}
