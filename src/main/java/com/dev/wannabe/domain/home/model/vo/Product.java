package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Product {

    private Long productId;
    private String productType;
    private String productAuthor;
    private String productName;
    private String productDesc;
    private String useYn;
    private Long attachFileId;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;
}
