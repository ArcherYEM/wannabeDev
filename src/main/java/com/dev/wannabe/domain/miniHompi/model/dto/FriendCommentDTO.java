package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Data;

@Data
public class FriendCommentDTO {

    private Long userId; //기준 유저 아이디
    private Long friendUserId; //일촌 아이디
    private String userNickname; //일촌명
    private String friendUserNickname; //친구일촌명

    private Long hompiId; //홈피아이디
    private Long writeUserId; //일촌평 글쓴이
    private String friendComments; //일촌평 내용
    private String fixedYn; //고정여부
    private String insertDt; //작성일

    private String name; //이름

}
