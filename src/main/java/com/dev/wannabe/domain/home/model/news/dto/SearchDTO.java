package com.dev.wannabe.domain.home.model.news.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchDTO {

    private String query;
    private Integer display;
    private Integer start;
    private String sort;

}
