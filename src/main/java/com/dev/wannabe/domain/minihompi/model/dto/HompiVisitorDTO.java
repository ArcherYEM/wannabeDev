package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;


@Data
@Builder
public class HompiVisitorDTO {
    private Long guestBookId;
    private Long hompiId;
    private String guestBookContent;
    private String remarks;
    private Long insertUserId;
    private String insertDt;
    private Long updateUserId;
    private String updateDt;
    private String secretCheck;

    private String loginId;
    private String name;

    private Long ownerUserId;

}
