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
    private Timestamp insertDt;
    private Long updateUserId;
    private Timestamp updateDt;
    private String secretCheck;

    private String loginId;
    private String name;

    private Long ownerUserId;

    public String getInsertDt() {
        if (insertDt != null) {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm").format(insertDt);
        }
        return "";
    }

    public String getUpdateDt() {
        if (updateDt != null) {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm").format(updateDt);
        }
        return "";
    }


}
