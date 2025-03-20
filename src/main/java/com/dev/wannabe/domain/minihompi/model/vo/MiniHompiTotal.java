package com.dev.wannabe.domain.minihompi.model.vo;

import lombok.Data;

@Data
public class MiniHompiTotal {

    private Long userId; //유저 ID

    private Long hompiId; //홈피ID
    private String hompiUrl; //홈피 URL
    private String hompiTitle; //홈피 머리글
    private Long ownerUserId; //홈피 주인 ID
    private Long totalCnt; //총 방문 수

    private String hompiConfigCode; //홈피 설정 코드
    private String hompiConfigContent; //홈피 설정 내용

    private String dayStatsDate; //일일 투데이
    private int todayCnt; //투데이 수

    private String hompiMenuCode; //홈피 메뉴 코드
    private String availStatus; //상태

    private Long minimiId; //미니미 ID
    private Long productId; //상품 ID
    private String faceDirectionCode; //미니미 방향
    private float xPosition; //x축
    private float yPosition; //y축
    private float zPosition; //z축
    private String mainYN; //대표 여부
    private String useYN; // 사용 여부

    private Long miniroomId; //미니룸 ID

    private String profileImage; //프로필 사진
    private String introduction; //소개글
    private String friendsCommentYn; //일촌평 공개
    private String mood; //기분
    private String hompiLang; //홈피 소개글 언어


}
