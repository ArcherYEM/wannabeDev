package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FolderContentsDTO {
    private Long contentsId;
    private String contentsName;
}
