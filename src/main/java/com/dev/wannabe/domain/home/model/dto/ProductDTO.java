package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ProductDTO {
    private Long productId;
    private String productName;
    private String productType;
    private String filePath;
    private String fileName;

    public String getImageUrl() {
        return filePath + "/" + fileName;
    }
}