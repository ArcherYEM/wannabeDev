package com.dev.wannabe.domain.home.model.vo;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@ToString
public class EmailAuth {

    private Long authId;
    private Long userId;
    private String authCode;
    private String authStatus;
    private Date expiredDt;
    private String remarks;
    private Long insertUserId;
    private Date insertDt;
    private Long updateUserId;
    private Date updateDt;

}
