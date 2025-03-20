package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userManageService;

    /*
     *  uri : /api/user/signup
     *  회원 가입 성공 시 200 OK
     *  loginId, email, phoneNo 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody SignupUserDTO signupUser) {
        if (userManageService.signUpUser(signupUser)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    /*
     *  uri : /api/user/checkLoginId
     *  loginId 검증 성공 시 200 OK
     *  loginId 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkLoginId/{loginId}")
    public ResponseEntity<Void> checkLoginId(@PathVariable String loginId) {
        if (userManageService.checkDuplicationLoginId(loginId)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    /*
     *  uri : /api/user/checkEmail
     *  email 검증 성공 시 200 OK
     *  email 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkEmail/{email}")
    public ResponseEntity<Void> checkEmail(@PathVariable String email) {
        if (userManageService.checkDuplicationEmail(email)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    /*
     *  uri : /api/user/checkPhoneNo
     *  phoneNo 검증 성공 시 200 OK
     *  phoneNo 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkPhoneNo/{phoneNo}")
    public ResponseEntity<Void> checkPhoneNo(@PathVariable String phoneNo) {
        if (userManageService.checkDuplicationPhone(phoneNo)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
