package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Getter
@Builder
public class Bgm {

    private Long bgmId;
    private String bgmLength;
    private String bgmName;
    private String artist;
    private String lyrics;
    private String genreCode;
    private String useYn;
    private Long bgmFileAttachId;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long imageFileAttachId;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
