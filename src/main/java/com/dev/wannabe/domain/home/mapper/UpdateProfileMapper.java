package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.dto.UpdateDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UpdateProfileMapper {

        // 사용자 정보를 loginId로 조회합니다.
        // 매개변수: loginId (사용자 ID, String 타입)
        // 반환값: SignupUserDTO (사용자 정보를 담은 DTO 객체)
        SignupUserDTO findByLoginId(String loginId);

        // 이메일 중복 확인 (현재 사용자 제외) 메서드입니다.
        // 매개변수: email (확인할 이메일), loginId (현재 사용자 ID)
        // 수정: 반환 타입을 String → int로 변경
        // 중복 개수를 세는 메서드는 숫자(int)를 반환해야 합니다.
        int countByEmailAndNotLoginId(String email, String loginId);

        // 전화번호 중복 확인 (현재 사용자 제외) 메서드입니다.
        // 매개변수: phoneNo (확인할 전화번호), loginId (현재 사용자 ID)
        // 수정: 반환 타입을 String → int로 변경
        // 중복 개수를 세는 메서드는 숫자(int)를 반환해야 합니다.
        int countByPhoneNoAndNotLoginId(String phoneNo, String loginId);

        // 비밀번호 검증을 위한 사용자 정보 조회 메서드입니다.
        // 매개변수: loginId (사용자 ID)
        // 반환값: SignupUserDTO (사용자 정보를 담은 DTO 객체)
        SignupUserDTO findByLoginIdForPassword(String loginId);

        // 사용자 정보를 업데이트하는 메서드입니다.
        // 매개변수: updateDTO (수정할 사용자 정보를 담은 UpdateDTO 객체)
        // 수정: 반환 타입을 String → void로 변경
        // DB 업데이트는 반환값이 필요 없으므로 void로 설정합니다.
        // 수정: 변수 이름을 UpdateDTO → updateDTO로 변경 (소문자 네이밍 규칙 준수)
        void updateUser(UpdateDTO updateDTO);
}
