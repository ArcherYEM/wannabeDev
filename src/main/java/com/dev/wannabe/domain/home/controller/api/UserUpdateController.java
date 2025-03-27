package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.service.UserUpdateService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
public class UserUpdateController {
    private final UserUpdateService userUpdateService;

    // 회원정보 조회
    @GetMapping("/getMyInfo")
    public SignupUserDTO getMyInfo(HttpServletRequest req){
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("userData") == null) {
            return null;
        }

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if (userData.getName() == null){
            return null;
        }

        String userName = userData.getName();

        return userUpdateService.getMyInfo(userName);
    }
}
