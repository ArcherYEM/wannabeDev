package com.dev.wannabe.domain.minihompi.model.minihompi;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MinihompiDto {
    private Long hompiId; //홈피 id
    private String hompiUrl; //홈피 url
    private String hompiTitle; //홈피 머리글
    private Long ownerUserId; //오너 회원 id
    private String remarks; //비고
    private Long insertUserId; //등록자 id
    private Date insertDt; //등록일시
    private Long updateUserId; //변경자id
    private Date updateDt; //변경일시

}
