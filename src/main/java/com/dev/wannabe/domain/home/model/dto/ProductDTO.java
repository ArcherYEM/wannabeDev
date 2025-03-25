package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data

public class ProductDTO {
    private Long productId;
    private String productType;
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