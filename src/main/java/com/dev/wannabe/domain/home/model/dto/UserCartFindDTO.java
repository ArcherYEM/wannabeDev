package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCartFindDTO {

    private Long itemId;
    private String itemType;
    private Integer availDay;
}
