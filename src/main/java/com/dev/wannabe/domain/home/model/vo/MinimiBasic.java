package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class MinimiBasic {

    private long minimiId;
    private long productId;
    private long userId;
    private String faceDirectionCode;
    private int xPosition;
    private int yPosition;
    private int zPosition;
    private String mainYN;
    private String useYN;
    private long insertUserId;
    private long updateUserId;

}
