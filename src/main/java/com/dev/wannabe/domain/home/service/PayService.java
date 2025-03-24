package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.model.dto.KakaoPayReadyRequestDTO;
import com.dev.wannabe.domain.home.model.dto.KakaoPayReadyResponseDTO;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayService {

    private final LoginService loginService;

    @Value("${api.kakaopay.clientId}")
    private String clientId;

    @Value("${api.kakaopay.secretKeyDev}")
    private String secretKeyDev;

    public String kakaopayReady(KakaoPayReadyRequestDTO kakaoPayReadyRequest, HttpServletRequest request) {

        SessionUserDTO sessionUser = loginService.getSessionUserData(request);
        HttpHeaders headers = headersSetting();

        Map<String, String> body = new HashMap<>();
        body.put("cid", clientId);
        body.put("partner_order_id", kakaoPayReadyRequest.getPartner_order_id());
        //body.put("partner_user_id", sessionUser.getUserId().toString()); 테스트 과정 중 세션 대신 직접 값 입력
        body.put("partner_user_id", "WANNABE_USER" + "7");
        body.put("item_name", kakaoPayReadyRequest.getItem_name());
        body.put("item_code", kakaoPayReadyRequest.getItem_code());
        body.put("quantity", kakaoPayReadyRequest.getQuantity().toString());
        body.put("total_amount", kakaoPayReadyRequest.getTotal_amount().toString());
        body.put("tax_free_amount", kakaoPayReadyRequest.getTax_free_amount().toString());
        body.put("approval_url", "http://localhost:8080/api/v1/pay/kakaoApprove");
        body.put("cancel_url", "http://localhost:8080/api/v1/pay/kakaoCancel");
        body.put("fail_url", "http://localhost:8080/api/v1/pay/kakaoFail");

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(
                "https://open-api.kakaopay.com/online/v1/payment/ready",
                requestEntity,
                String.class
            );
    }

    public void saveApproveResponseInSession(KakaoPayReadyResponseDTO kakaoPayReadyResponse, HttpServletRequest request) {

        HttpSession session = request.getSession();
        session.setAttribute("kakaoPayReadyResponse", kakaoPayReadyResponse);
        log.info("tid {} orderId {}", kakaoPayReadyResponse.getTid(), kakaoPayReadyResponse.getPartner_order_id());

    }

    public String kakaoApprove(String pg_token, HttpServletRequest request) {

        HttpSession session = request.getSession();
        KakaoPayReadyResponseDTO kakaoPayReadyResponse = (KakaoPayReadyResponseDTO) session.getAttribute("kakaoPayReadyResponse");
        session.removeAttribute("kakaoPayReadyResponse");

        SessionUserDTO sessionUser = loginService.getSessionUserData(request);
        HttpHeaders headers = headersSetting();

        Map<String, String> body = new HashMap<>();
        body.put("cid", clientId);
        body.put("tid", kakaoPayReadyResponse.getTid());
        body.put("partner_order_id", kakaoPayReadyResponse.getPartner_order_id());
        // 테스트 과정 중 세션 대신 직접 값 입력
        //body.put("partner_user_id", sessionUser.getUserId().toString());
        body.put("partner_user_id", "WANNABE_USER" + "7");
        body.put("pg_token", pg_token);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(
                "https://open-api.kakaopay.com/online/v1/payment/approve",
                requestEntity,
                String.class
        );

    }

    private HttpHeaders headersSetting() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "SECRET_KEY " + secretKeyDev);
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.setContentType(MediaType.APPLICATION_JSON);

        return headers;
    }
}
