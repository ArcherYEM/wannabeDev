package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class SaveAlbumDTO {

    private Long albumId;
    private Long hompiId;
    private Long folderId;
    private String albumTitle;
    private String availStatus;
    private String albumContent;
    private Long userId;
    private String albumImage;

}
