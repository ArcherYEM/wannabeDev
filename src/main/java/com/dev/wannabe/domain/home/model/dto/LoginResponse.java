package com.dev.wannabe.domain.home.model.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class LoginResponse {
	
	private int code;
	private int status;
	private String data;
	
	// static factory
	public static LoginResponse success() {
		return new LoginResponse(HttpStatus.OK.value(), HttpStatus.OK.value(), "로그인 성공");
	}
	
	public static LoginResponse notFound() {
		return new LoginResponse(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.value(), "로그인 정보를 확인해주세요.");
	}
	
	public static LoginResponse serverError() {
		return new LoginResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "서버 오류가 발생하였습니다.");
	}
}
