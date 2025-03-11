package com.dev.wannabe.global.model;

import lombok.Getter;

import java.util.List;

@Getter
public class CustomPageDTO<T> {

    private List<T> pagingContents;// 현재 페이지의 데이터 리스트
    private int totalPages;        // 총 페이지 수
    private int number;            // 현재 페이지 번호 (0부터 시작)
    private int pageSize;          // 페이징 크기
    private boolean first;         // 첫 번째 페이지 여부
    private boolean last;          // 마지막 페이지 여부

    public CustomPageDTO(List<T> pagingContents, int totalElements, int pageNumber, int pageSize) {
        this.pagingContents = pagingContents;
        this.totalPages = (int) Math.ceil((double) totalElements / pageSize);
        this.pageSize = pageSize;
        this.number = pageNumber;
        this.first = pageNumber == 1;
        this.last = pageNumber == totalPages;
    }
}
