package com.dev.wannabe.domain.home.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserExistDTO {

    private String loginId;
    private String email;
    private String phoneNo;

}
