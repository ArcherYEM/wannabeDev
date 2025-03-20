package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HompiBgmDTO {

    private String bgmName;
    private String artist;
    private String bgmPath;

}
