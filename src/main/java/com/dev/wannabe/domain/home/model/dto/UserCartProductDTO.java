package com.dev.wannabe.domain.home.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCartProductDTO {

    private Long cartId;
    private Long userId;
    private Long itemId;
    private String itemType;
    private Integer availDay;
    private String itemName;
    private String itemPath;
    private Integer itemCount;
    private String category;

}
