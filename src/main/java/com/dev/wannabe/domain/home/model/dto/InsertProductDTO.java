package com.dev.wannabe.domain.home.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsertProductDTO {

    private Long userId;
    private MultipartFile uploadFile;
    private String productType;
    private String productAuthor;
    private String productName;
    private String productDesc;
    private List<Integer> availDays;
    private List<Integer> prices;

}
