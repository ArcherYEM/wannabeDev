package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class HompiConfig {

    private long hompiId;
    private String hompiConfigCode;
    private String hompiConfigContent;
    private long insertUserId;
    private long updateUserId;

}
