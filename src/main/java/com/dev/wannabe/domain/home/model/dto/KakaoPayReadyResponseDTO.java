package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;

@Data
public class KakaoPayReadyResponseDTO {

    private String tid;
    private String partner_order_id;
    private String tms_result;
    private String created_at;

}
