package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProductDTO {

    private Long productId;
    private String productName;
    private String productType;
    private String filePath;

    private String productDesc;
    private String prices;

}