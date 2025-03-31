package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateFolderDTO {

    private Long folderId;
    private String contentType;
    private String folderName;

}
