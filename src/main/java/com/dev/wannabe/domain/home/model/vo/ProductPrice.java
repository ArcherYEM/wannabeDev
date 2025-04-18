package com.dev.wannabe.domain.home.model.vo;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class ProductPrice {

    private Long productId;
    private Integer availDay;
    private BigDecimal price;
    private String useYn;
    private String remarks;
    private Long insertUserId;
    private LocalDateTime insertDt;
    private Long updateUserId;
    private LocalDateTime updateDt;
}
