package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.LoginMapper;
import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.home.model.dto.LoginDTO;
import com.dev.wannabe.domain.home.model.vo.LoginLog;
import com.dev.wannabe.domain.home.model.vo.UserRole;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBasicInfoDTO;
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

    @Transactional
    public Boolean login(LoginDTO loginData) {
        try {
            HttpServletRequest request = SessionUtil.getRequest();

            if (request == null) {
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
            SessionUserDTO sessionUserDTO = createSessionUserData(loginLog);
            session.setAttribute("userData", sessionUserDTO);
            session.setMaxInactiveInterval(60 * 60); // 단위 : 초 -> null point exception

            loginMapper.saveLoginLog(loginLog);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public Boolean logout() {
        try {
            HttpServletRequest request = SessionUtil.getRequest();
            SessionUserDTO sessionUser = getSessionUserData(request);

            LoginLog loginLog = LoginLog.builder()
                    .accessIp(sessionUser.getAccessIp())
                    .userId(sessionUser.getUserId())
                    .logoutDt(LocalDateTime.now())
                    .updateUserId(sessionUser.getUserId())
                    .build();
            loginMapper.saveLoginLog(loginLog);

            HttpSession session = SessionUtil.getSession();
            if (session != null) {
                session.removeAttribute("userData");
                session.invalidate();
            }
            return true;
        } catch (Exception e) {
            log.error("로그아웃 실패 {}", e.getMessage());
            return false;
        }
    }

    public SessionUserDTO getSessionUserData(HttpServletRequest request) {
        return (SessionUserDTO) request.getSession().getAttribute("userData");
    }

    private Boolean authenticate(LoginDTO loginData) {
        String storedPassword = loginMapper.findPasswordByLoginId(loginData.getLoginId());
        return passwordEncoder.matches(loginData.getPassword(), storedPassword);
    }

    // 클라이언트 ip 가져오기
    private String getAccessIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");

        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        if ("0:0:0:0:0:0:0:1".equals(ip)){
            ip = "127.0.0.1";
        }
        return ip;
    }

    private SessionUserDTO createSessionUserData(LoginLog loginLog) {

        Long userId = loginLog.getUserId();
        String userName = userMapper.findUserNameByUserId(userId);
        String userRoleCD = userMapper.findUserRoleByUserID(userId);
        HompiBasicInfoDTO hompiBasicInfo = hompiMapper.findHompiBasicInfoByUserId(userId);

        return SessionUserDTO.builder()
                .accessIp(loginLog.getAccessIp())
                .userId(userId)
                .name(userName)
                .role(userRoleCD)
                .hompiId(hompiBasicInfo.getHompiId())
                .hompiURL(hompiBasicInfo.getHompiURL())
                .hompiTitle(hompiBasicInfo.getHompiTitle())
                .build();
    }

}