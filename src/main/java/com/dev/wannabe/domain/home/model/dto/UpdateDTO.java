package com.dev.wannabe.domain.home.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateDTO {

    private String email;
    private  String phoneNo;
    private  String password;
}
