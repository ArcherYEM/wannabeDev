package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.service.EmailService;
import com.dev.wannabe.domain.home.service.UserService;
import com.dev.wannabe.domain.minihompi.model.dto.CreateHompiDTO;
import com.dev.wannabe.domain.minihompi.model.dto.MinimiInfoDTO;
import com.dev.wannabe.domain.minihompi.model.dto.MiniroomInfoDTO;
import com.dev.wannabe.domain.minihompi.model.dto.SendMessageDTO;
import com.dev.wannabe.domain.minihompi.service.FriendService;
import com.dev.wannabe.domain.minihompi.service.HompiService;
import com.dev.wannabe.domain.minihompi.service.MinimiService;
import com.dev.wannabe.domain.minihompi.service.MiniroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userManageService;
    private final HompiService hompiManageService;
    private final MiniroomService miniroomService;
    private final MinimiService minimiService;
    private final FriendService friendService;
    private final EmailService emailService;


    /*
     *  uri : /api/user/signup
     *  회원 가입 성공 시 200 OK
     *  loginId, email, phoneNo 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody SignupUserDTO signupUser) {
        Long userId = userManageService.signUpUser(signupUser);
        if (userId == 0L) {
            return ResponseEntity.badRequest().build();
        }
        CreateHompiDTO createHompi = CreateHompiDTO.builder()
                .userId(userId)
                .hompiTitle(signupUser.getName())
                .build();
        if (!hompiManageService.createHompi(createHompi)) {
            return ResponseEntity.badRequest().build();
        }
        SendMessageDTO sendMessage = SendMessageDTO.builder()
                .toUserId(userId)
                .fromUserId(0L)
                .message("회원 가입을 환영합니다")
                .build();
        friendService.sendFriendMessage(sendMessage);

        MiniroomInfoDTO miniroomInfo = MiniroomInfoDTO.builder()
                .userId(userId)
                .productId(1L)
                .upsertUserId(userId)
                .build();
        miniroomService.createMiniroom(miniroomInfo);

        MinimiInfoDTO minimiInfo = MinimiInfoDTO.builder()
                .userId(userId)
                .productId(1L)
                .upsertUserId(userId)
                .build();
        minimiService.createMinimi(minimiInfo);
        return ResponseEntity.ok().build();
    }

    /*
     *  uri : /api/user/checkLoginId
     *  loginId 검증 성공 시 200 OK
     *  loginId 검증 실패 400 Bad Request 반환
     */
    @PostMapping("/checkLoginId/{loginId}")
    public ResponseEntity<Void> checkLoginId(@PathVariable String loginId) {
        if (userManageService.isUserExist(loginId)) {
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
        if (userManageService.isUserExist(email)) {
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
        if (userManageService.isUserExist(phoneNo)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    // TODO : 빈값 입력되었을 때 SweetAlert2 써서 예쁘게 띄우자 앵우야~~ 무조건 기억하거라 까먹지말고
    @PostMapping("/findId")
    @ResponseBody
    public ResponseEntity<Map<String, String>> findId(@RequestParam String name, @RequestParam String birthDate) {

        // 이름과 생년월일을 통해 찾은 loginId
        String foundId = userManageService.findId(name, birthDate);

        Map<String, String> response = new HashMap<>();

        if (foundId != null) {
            response.put("id", foundId);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "이름 또는 생년월일을 확인해주세요.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/sendCode")
    public ResponseEntity<Map<String, String>> sendAuthCode(@RequestParam String loginId, @RequestParam String email){

        Integer userId = userManageService.findUserIdByLoginIdAndEmail(loginId, email);

        String authCode = emailService.generateAuthCode();

        userManageService.saveAuthCode(userId, authCode);

        Map<String, String> response = new HashMap<>();

        if(userId != null && userId > 0) {
            try {
                emailService.sendEmail(email, authCode);

                response.put("status", "success");
                response.put("message", "인증 코드가 이메일로 전송되었습니다.");
                response.put("authCode", authCode);
            } catch (MessagingException e) {

                response.put("status", "error");
                response.put("message", "이메일 전송에 실패하였습니다.");
                return ResponseEntity.status(500).body(response);
            }
        } else {
            response.put("status", "error");
            response.put("message", "이메일 전송에 실패하였습니다.");
            return ResponseEntity.status(404).body(response);
        }
        return ResponseEntity.ok(response);
    }

    //TODO: 1일 때 AUTH_STATUS 업데이트시켜주는 쿼리 후, 인증 성공했습니다 후, 비밀번호 변경 창
    @PostMapping("/checkAuthCode")
    public ResponseEntity<Map<String, String>> checkAuthCode(@RequestParam String authCode){

        System.out.println("authCode: " + authCode);
        int flag = userManageService.checkAuthCode(authCode);
        System.out.println("flag: " + flag);
        String authId = userManageService.findAuthIdByAuthCode(authCode);
        System.out.println("authId: " + authId);

        Map<String, String> response = new HashMap<>();

        if(flag == 1){
            int updateFlag = userManageService.updateAuthStatus(authId, authCode);
            System.out.println("updateFlag: " + updateFlag);

            if(updateFlag == 2){
                response.put("status", "success");
                response.put("message", "인증 상태 업데이트 성공");
            } else {
                response.put("status", "error");
                response.put("message", "인증 상태 업데이트 실패");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } else {
            response.put("status", "error");
            response.put("message", "인증 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }
}
