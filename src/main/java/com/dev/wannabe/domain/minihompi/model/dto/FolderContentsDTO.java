package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class FolderContentsDTO {
    private Long contentsId;
    private String contentsName;
    private String contentsType;
    private Long folderId;
}
