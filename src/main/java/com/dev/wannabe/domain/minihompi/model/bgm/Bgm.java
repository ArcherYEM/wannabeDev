package com.dev.wannabe.domain.minihompi.model.bgm;

import com.dev.wannabe.domain.minihompi.model.bgm.enums.BgmCategory;
import com.dev.wannabe.domain.minihompi.model.bgm.enums.UseStatus;
import lombok.*;

import java.sql.Time;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Bgm {

    private Long id;
    private Long bgmFileAttachId; // 첨부 파일 ID
    private Long imageFileAttachId; // 이미지 파일 ID
    private String bgmName;
    private String artist;
    private String lyrics; // 가사
    private BgmCategory genreCode;
    private Time bgm_length;
    private UseStatus useYn; // 유저 사용 여부  사용하기 기능 눌러야 사용 가능한듯..?
    private String remarks; //비고
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;

}
