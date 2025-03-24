package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.KakaoPayReadyRequestDTO;
import com.dev.wannabe.domain.home.model.dto.KakaoPayReadyResponseDTO;
import com.dev.wannabe.domain.home.service.PayService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/pay")
public class PayController {

    private final PayService payService;

    // 카카오페이 결제준비(ready)
    @PostMapping("/kakaoReady")
    @ResponseBody
    public ResponseEntity<String> kakaoReady(@RequestBody KakaoPayReadyRequestDTO kakaoPayReadyRequest, HttpServletRequest request) throws JsonProcessingException {
        String response = payService.kakaopayReady(kakaoPayReadyRequest, request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/saveKakaoApproveRequest")
    @ResponseBody
    public ResponseEntity<Void> saveKakaoApproveRequest(@RequestBody KakaoPayReadyResponseDTO kakaoPayReadyResponse, HttpServletRequest request) {
        payService.saveApproveResponseInSession(kakaoPayReadyResponse, request);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/kakaoApprove")
    @ResponseBody
    public ResponseEntity<String> kakaoApprove(@RequestParam String pg_token, HttpServletRequest request) {
        String response = payService.kakaoApprove(pg_token, request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/kakaoCancel")
    public String kakaoCancel() {
        return "kakaoCancel";
    }

    @GetMapping("/kakaoFail")
    public String kakaoFail() {
        return "kakaoFail";
    }
}