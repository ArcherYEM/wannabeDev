package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.LoginDTO;
import com.dev.wannabe.domain.home.model.dto.LoginResponse;
import com.dev.wannabe.domain.home.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class LoginController {
    
    private final LoginService loginService;
    
    /*
     * 입력 : userId와 password 값
     * 로그인 성공 시 200 Ok 반환
     * 로그인 실패 시 400 Bad Request 반환
     */
    // TODO: 아아님 코드 리뷰 요청
/*    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginDTO loginData) {
        // Session add : loginId, accessIp
        if (loginService.login(loginData)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }*/
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginData) {
        try {
            if (loginService.login(loginData)) {
                return ResponseEntity.status(HttpStatus.OK).body(LoginResponse.success());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(LoginResponse.notFound());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(LoginResponse.serverError());
        }
    }
    
    /*
     * 로그아웃 성공 시 200 Ok 반환
     * 로그아웃 실패 시 400 Bad Request 반환
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {

        if (loginService.logout()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
