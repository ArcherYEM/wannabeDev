package com.dev.wannabe.domain.minihompi.model.bgm;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.time.LocalDateTime;

@Getter
@Setter
public class BgmUpdateDto {

    private MultipartFile bgmFileAttachId; // 노래 파일
    private MultipartFile imageFileAttachId; // 이미지 파일
    private String bgmName;
    private String artist;
    private String lyrics; // 가사
    private String genreCode;  //노래 장르
    private Time bgm_length; //노래 시간
    private String remarks; //비고
    private LocalDateTime insertDt;
    private LocalDateTime updateDt;
}
