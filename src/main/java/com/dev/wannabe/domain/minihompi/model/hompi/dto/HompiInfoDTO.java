package com.dev.wannabe.domain.minihompi.model.hompi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HompiInfoDTO {

    private Long hompiId;
    private String hompiURL;
    private String hompiTitle;

}
