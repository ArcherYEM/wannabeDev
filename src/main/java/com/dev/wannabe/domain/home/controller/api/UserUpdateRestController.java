package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.GetUserInfoDTO;
import com.dev.wannabe.domain.home.service.UserUpdateService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
public class UserUpdateRestController {
    private final UserUpdateService userUpdateService;

    //TODO 회원정보 조회 조건문에 userId 추가하기

    // 회원정보 조회
    @GetMapping("/getMyInfo")
    public GetUserInfoDTO getMyInfo(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("userData") == null) {
            return null;
        }

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if (userData.getUserId() == null) {
            return null;
        }

        Long userId = userData.getUserId();

        return userUpdateService.getMyInfo(userId);
    }

    /**
     * 비밀번호 확인
     **/
//    @PostMapping("checkPassword")
//    public ResponseEntity<Map<String, Object>> checkPassword(@RequestParam("password") String password,
//                                                             HttpServletRequest req) {
//        Map<String, Object> result = new HashMap<>();
//
//        HttpSession session = req.getSession(false);
//        if (session == null || session.getAttribute("userData") == null) {
//            result.put("result", -1);
//            return ResponseEntity.badRequest().build();
//        }
//
//        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
//        if (userData.getUserId() == null) {
//            result.put("result", -1);
//            return ResponseEntity.badRequest().build();
//        }
//
//        boolean checkOldPaw = userUpdateService.checkPassword(password, userData);
//
//        result.put("checkOldPaw", checkOldPaw);
//        return ResponseEntity.ok(result);
//    }

    //비밀번호 수정
    @PostMapping("/updateMyPasswd")
    public int updateMyPasswd(@RequestParam("password") String password,
                              HttpServletRequest req) {

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("userData") == null) {
            return -1;
        }

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if (userData.getUserId() == null) {
            return -1;
        }

        int result = userUpdateService.updateMyPasswd(userData, password);
        return result;
    }


    //회원 개인정보 수정
    @PostMapping("/updateMyInfo")
    public int updateMyInfo(@RequestParam("email") String email,
                            @RequestParam("phone") String phone,
                            HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("userData") == null) {
            return -1;
        }

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if (userData.getUserId() == null) {
            return -1;
        }
        int result = userUpdateService.updateMyInfo(email, phone, userData);
        return result;
    }

    @PostMapping("/checkEmail")
    public int checkEmail(@RequestParam("email") String email, HttpServletRequest req) {
        System.out.println(email);
        HttpSession session = req.getSession(false);
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if (userData.getUserId() == null) {
            return -1;
        }
        int result = userUpdateService.checkEmail(email);
        return result;
    }

    @PostMapping("/checkPhone")
    public int checkPhone(@RequestParam("phone") String phone, HttpServletRequest req) {
        System.out.println(phone);
        HttpSession session = req.getSession(false);
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if (userData.getUserId() == null) {
            return -1;
        }
        int result = userUpdateService.checkPhone(phone);
        return result;
    }
}