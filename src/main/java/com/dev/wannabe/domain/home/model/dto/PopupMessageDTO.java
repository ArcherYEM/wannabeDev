package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PopupMessageDTO {
    private String name; // 회원의 이름
    private Long messageId; //메세지ID
    private Long userId; //회원ID
    private Long friendUserId; // 일촌회원아이디
    private String message; // 메세지
    private String readYN; //읽음여부
    private String remarks; //비고
    private Long insertUserId; //등록자 ID
    private Date insertDT; //등록일시
    private Long updateUserId; //변경자ID
    private Date updateDT; //변경일시
    private String friendUserNickName; // 친구의 일촌명
}
