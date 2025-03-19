package com.dev.wannabe.domain.home.model.news.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleNewsDTO {

    private String title;
    private String link;

}
