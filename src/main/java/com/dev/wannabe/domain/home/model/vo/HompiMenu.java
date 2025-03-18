package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class HompiMenu {

    private String hompiMenuCode;
    private long hompiId;
    private String availStatus;
    private long insertUserId;
    private long updateUserId;

}
