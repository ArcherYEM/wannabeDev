package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class Hompi {

    private long hompiId;
    private String hompiUrl;
    private String hompiTitle;
    private long ownerUserId;
    private long insertUserId;
    private long updateUserId;

}
