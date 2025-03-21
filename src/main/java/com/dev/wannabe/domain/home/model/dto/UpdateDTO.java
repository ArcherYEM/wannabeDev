package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
//정보 업데이트 DTO
public class UpdateDTO {

    private String email;
    private  String phoneNo;
    private  String password;
}
