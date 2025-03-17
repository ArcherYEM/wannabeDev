package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.LoginMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import com.dev.wannabe.global.util.SessionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserMapper userMapper;
    private final LoginMapper loginMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public HttpStatus login(LoginDataDTO loginData) {
        try {
            HttpServletRequest request = SessionUtil.getRequest();

            if (request == null) {
                log.error("session get request null 반환");
                return HttpStatus.BAD_REQUEST;
            }

            if (!authenticate(loginData)) {
                return HttpStatus.UNAUTHORIZED;
            }

            log.info("인증 성공");

            long userId = userMapper.findUserIdByLoginId(loginData.getLoginId()).get();

            log.info("1 user id : {}", userId);


            HttpSession session = request.getSession(true);
            session.setAttribute("userId", userId);

            String clientIp = getClientIp(request);

            log.info("login 성공 user ID {}", userId);
            log.info("클라이언트 IP: {}", clientIp);

            return HttpStatus.OK;
        } catch (Exception e) {
            log.error("로그인 에러 {}", e.getMessage());
            return HttpStatus.BAD_REQUEST;
        }
    }

    public HttpStatus logout() {
        try {
            HttpSession session = SessionUtil.getSession();
            if (session != null) {
                session.invalidate();
            }
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    private boolean authenticate(LoginDataDTO loginData) {
        String storedPassword = loginMapper.findPasswordByLoginId(loginData.getLoginId());
        log.info("비밀번호 {} {}", loginData.getLoginId(), storedPassword);
        log.info("비밀 {} ", passwordEncoder.matches(loginData.getPassword(), storedPassword));
        return passwordEncoder.matches(loginData.getPassword(), storedPassword);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        return ip.split(",")[0];
    }

}

