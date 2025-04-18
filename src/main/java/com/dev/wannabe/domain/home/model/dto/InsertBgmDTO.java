package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Text;

@Data
@Builder
public class InsertBgmDTO {

    private Long userId;
    private MultipartFile uploadFile;
    private MultipartFile audioFile;
    private String artist;
    private String genreCode;
    private String bgmName;
    private Integer price;
    private String lyrics;
    private String audioLength;
}
