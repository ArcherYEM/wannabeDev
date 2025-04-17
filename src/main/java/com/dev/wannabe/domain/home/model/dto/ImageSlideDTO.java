package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ImageSlideDTO {
    private Long attachFileID; //첨부파일 ID
    private String fileOriginName; //원본파일 이름
    private Long fileSize; // 파일크기
    private String filePath; //파일 경로
    private String fileExtension; //파일확장자
    private String reMarks; //비고
    private Long insertUserId; //등록자 아이디
    private Date insertDT; //등록일시
    private Long updateUserId; //수정자 아이디
    private Date updateDT; //수정 일시
}
