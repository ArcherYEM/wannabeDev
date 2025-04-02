package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PopularUserDTO {
    private Long hompiId;
    private Integer todayCnt;
    private String name;
}
