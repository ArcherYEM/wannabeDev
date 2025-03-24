package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class KakaoPayApproveReqeustDTO {

    //private String cid;                 // 가맹점 코드, 10자
    private String tid;                 // 결제 고유 번호, 결제 준비 응답에 포함
    private String partner_order_id;    // 가맹점 주문번호, 결제 준비 요청과 동일해야 함
    //private String partner_user_id;     // 가맹점 회원 Id, 결제 준비 요청과 동일해야 함
    private String pg_token;            // 결제 승인 인증 토큰
    private String payload;             // 결제 승인 요청에 대해 저장하고 싶은 값, 최대 200자, Not Required
    private LocalDateTime total_amount; // 상품 총액, 결제 준비 요청과 동일해야 함, Not Required

}
