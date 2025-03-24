package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HompiBgmDTO {

    private Long id;
    private String title;
    private String artist;
    private String lyrics;
    private String path;


}
