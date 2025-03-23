package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FolderDTO {

    private Long folderId;
    private String folderName;

}
