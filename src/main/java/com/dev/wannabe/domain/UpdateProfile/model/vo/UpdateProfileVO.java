package com.dev.wannabe.domain.UpdateProfile.model.vo;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

// VO: 데이터베이스와 매핑되는 값 객체로, 주로 영속성 계층에서 사용
 @Data // Lombok으로 getter, setter 자동 생성
@Getter
@Builder(toBuilder = true)
public class UpdateProfileVO {
        private String loginId;      // DB의 사용자 ID 컬럼과 매핑
        private String username;     // DB의 이름 컬럼과 매핑
        private String birthDate;    // DB의 생년월일 컬럼과 매핑
        private String genderCode;   // DB의 성별 컬럼과 매핑
        private String password;     // DB의 비밀번호 컬럼과 매핑 (암호화된 상태로 저장)
        private String email;        // DB의 이메일 컬럼과 매핑
        private String phoneNo;      // DB의 전화번호 컬럼과 매핑
        private String ip;           // DB의 IP 컬럼과 매핑 (선택적)
}
