package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductPriceDTO {

    private Long productId;
    private Integer availDay;
    private BigDecimal price;
    private String useYn;
    private Long insertUserId;

}
