package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.LoginMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import com.dev.wannabe.domain.home.model.dto.LoginLogDTO;
import com.dev.wannabe.global.util.SessionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserMapper userMapper;
    private final LoginMapper loginMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public boolean login(LoginDataDTO loginData) {
        try {
            HttpServletRequest request = SessionUtil.getRequest();

            if (request == null) {
                log.error("session get request null 반환");
                return false;
            }

            if (!authenticate(loginData)) {
                return false;
            }

            Long userId = userMapper.findUserIdByLoginId(loginData.getLoginId());

            String accessIp = getAccessIp(request);

            HttpSession session = request.getSession(true);
            session.setAttribute("userId", userId);
            session.setAttribute("accessIp", accessIp);

            log.info("login 성공 user ID {}", userId);
            log.info("클라이언트 IP: {}", accessIp);

            LoginLogDTO loginLog = LoginLogDTO.builder()
                    .accessIp(accessIp)
                    .userId(userId)
                    .insertUserId(userId)
                    .build();

            loginMapper.saveLoginLog(loginLog);
            return true;
        } catch (Exception e) {
            log.error("로그인 에러 {}", e.getMessage());
            return false;
        }
    }

    @Transactional
    public boolean logout() {
        try {
            HttpSession session = SessionUtil.getSession();

            Long userId = (Long) session.getAttribute("userId");

            LoginLogDTO loginLog = LoginLogDTO.builder()
                    .accessIp(session.getAttribute("accessIp").toString())
                    .userId(userId)
                    .logoutDt(LocalDateTime.now())
                    .updateUserId(userId)
                    .build();
            loginMapper.saveLoginLog(loginLog);

            if (session != null) {
                session.invalidate();
            }
            log.info("logout 성공");
            return true;
        } catch (Exception e) {
            log.error("로그아웃 에러 {}", e.getMessage());
            return false;
        }
    }

    private boolean authenticate(LoginDataDTO loginData) {
        String storedPassword = loginMapper.findPasswordByLoginId(loginData.getLoginId());
        return passwordEncoder.matches(loginData.getPassword(), storedPassword);
    }

    private String getAccessIp(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        return ip.split(",")[0];
    }
}