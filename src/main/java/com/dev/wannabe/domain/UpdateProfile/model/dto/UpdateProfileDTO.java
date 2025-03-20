package com.dev.wannabe.domain.UpdateProfile.model.dto;

import lombok.Data;

// DTO: 데이터 전송 객체로, 클라이언트와 서버 간 데이터 교환에 사용
@Data // Lombok 어노테이션으로 getter, setter, toString 자동 생성
public class UpdateProfileDTO {
        private String LoginId;      // 사용자 로그인 ID (수정 불가)
        private String username;     // 사용자 이름 (수정 불가 또는 수정 가능 선택)
        private String birthDate;    // 생년월일 (수정 불가)
        private String genderCode;   // 성별 코드 (수정 불가)
        private String password;     // 비밀번호 (수정 가능)
        private String email;        // 이메일 (수정 가능)
        private String phoneNo;      // 전화번호 (수정 가능)
        private String accessIp;           // 접속 IP (수정 불가, 서버에서 동적 제공
}


