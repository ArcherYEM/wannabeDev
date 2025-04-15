package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BgmProductDTO {

    private Long bgmId;
    private String bgmName;
    private String artist;
    private String lyrics;
    private String filePath;
    private Integer price;

}
