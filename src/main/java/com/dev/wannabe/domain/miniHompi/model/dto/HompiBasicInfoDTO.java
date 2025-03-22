package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HompiBasicInfoDTO {

    private Long hompiId;
    private String hompiURL;
    private String hompiTitle;

}
