package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
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
        return ResponseEntity.status(userManageService.signUpUser(signupUser)).build();
    }

    /*
     *  uri : /api/user/checkLoginId
     *  loginId 검증 성공 시 200 OK
     *  loginId 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkLoginId")
    public ResponseEntity<Void> checkLoginId(@RequestParam("loginId") String loginId) {
        return ResponseEntity.status(userManageService.checkDuplicationLoginId(loginId)).build();
    }

    /*
     *  uri : /api/user/checkEmail
     *  email 검증 성공 시 200 OK
     *  email 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkEmail")
    public ResponseEntity<Void> checkEmail(@RequestParam("email") String email) {
        return ResponseEntity.status(userManageService.checkDuplicationEmail(email)).build();
    }

    /*
     *  uri : /api/user/checkPhoneNo
     *  phoneNo 검증 성공 시 200 OK
     *  phoneNo 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkPhoneNo")
    public ResponseEntity<Void> checkPhoneNo(@RequestParam("phoneNo") String phoneNo) {
        return ResponseEntity.status(userManageService.checkDuplicationPhone(phoneNo)).build();
    }

}
