package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Data;

@Data
public class SaveAlbumDTO {

    private Long hompiId;
    private Long folderId;
    private String albumTitle;
    private String availStatus;
    private String albumContent;
    private Long userId;
    private String albumImage;

}
