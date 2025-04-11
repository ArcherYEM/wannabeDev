package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCartBgmDTO {

    private Long cartId;
    private Long userId;
    private Long itemId;
    private String itemType;
    private String itemName;
    private String itemPath;
}
