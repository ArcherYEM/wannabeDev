package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class HompiDailyStats {

    private long dayStatsDate;
    private long hompiId;
    private int todayCnt;
    private long insertUserId;
    private long updateUserId;

}
