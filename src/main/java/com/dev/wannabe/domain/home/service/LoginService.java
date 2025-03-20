package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.LoginMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import com.dev.wannabe.domain.home.model.vo.LoginLog;
import com.dev.wannabe.domain.home.model.dto.UserDataDTO;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiInfoDTO;
import com.dev.wannabe.domain.minihompi.service.HompiService;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiInfoDTO;
import com.dev.wannabe.domain.minihompi.service.HompiService;
import com.dev.wannabe.global.model.SessionUserDTO;
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
    private final HompiMapper hompiMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final HompiService hompiService;

    @Transactional
    public Boolean login(LoginDataDTO loginData) {
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

            LoginLog loginLog = LoginLog.builder()
                    .accessIp(accessIp)
                    .userId(userId)
                    .insertUserId(userId)
                    .build();

            HttpSession session = request.getSession(true);
            session.setAttribute("userData", createUserData(loginLog));
            session.setMaxInactiveInterval(60 * 60); // 단위 : 초

            log.info("login 성공 user ID {}", userId);
            log.info("클라이언트 IP: {}", accessIp);

            loginMapper.saveLoginLog(loginLog);
            return true;
        } catch (Exception e) {
            log.error("로그인 에러 {}", e.getMessage());
            return false;
        }
    }

    @Transactional
    public Boolean logout() {
        try {
            HttpSession session = SessionUtil.getSession();

            Long userId = (Long) session.getAttribute("userId");

            LoginLog loginLog = LoginLog.builder()
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

    private Boolean authenticate(LoginDataDTO loginData) {
        String storedPassword = loginMapper.findPasswordByLoginId(loginData.getLoginId());
        return passwordEncoder.matches(loginData.getPassword(), storedPassword);
    }

    private String getAccessIp(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        return ip.split(",")[0];
    }

    private SessionUserDTO createUserData(LoginLog loginLog) {

        UserDataDTO userData = userMapper.findUserDataByUserId(loginLog.getUserId());
        HompiInfoDTO hompiInfo = hompiService.readHompiInfoByUserId(loginLog.getUserId());

        return SessionUserDTO.builder()
                .accessIp(loginLog.getAccessIp())
                .userId(loginLog.getUserId())
                .email(userData.getEmail())
                .phoneNo(userData.getPhoneNo())
                .name(userData.getName())
                .genderCode(userData.getGenderCode())
                .birthDate(userData.getBirthDate())
                .hompiId(hompiInfo.getHompiId())
                .hompiURL(hompiInfo.getHompiURL())
                .hompiTitle(hompiInfo.getHompiTitle())
                .miniroomId(0L)
                .build();
    }
}