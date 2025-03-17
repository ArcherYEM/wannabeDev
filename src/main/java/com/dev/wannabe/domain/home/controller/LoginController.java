package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import com.dev.wannabe.domain.home.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginDataDTO loginData) {
        return ResponseEntity.status(loginService.login(loginData)).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.status(loginService.logout()).build();
    }

}
