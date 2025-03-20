package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.InetAddress;

@Slf4j
@Service
public class HomeService {
    public SessionUserDTO getUserData(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return null;
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if(session.getAttribute("userData") == null){
            return null;
        }
        return userData;
    }
}
