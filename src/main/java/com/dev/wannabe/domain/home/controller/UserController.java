package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.vo.EmailAuth;
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
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
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
        Long userId = userService.signUpUser(signupUser);
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
        if (userService.isUserExist(loginId)) {
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
        if (userService.isUserExist(email)) {
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
        if (userService.isUserExist(phoneNo)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    // TODO : 빈값 입력되었을 때 SweetAlert2 써서 예쁘게 띄우자 앵우야~~ 무조건 기억하거라 까먹지말고
    @PostMapping("/findId")
    @ResponseBody
    public ResponseEntity<Map<String, String>> findId(@RequestParam String name, @RequestParam String birthDate) {

        // 이름과 생년월일을 통해 찾은 loginId
        String foundId = userService.findId(name, birthDate);

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

        Integer userId = userService.findUserIdByLoginIdAndEmail(loginId, email);

        String authCode = emailService.generateAuthCode();

        userService.saveAuthCode(userId, authCode);

        System.out.println("authCode: " + authCode);
        System.out.println("현재 시간: " + LocalDateTime.now());

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

    @PostMapping("/checkAuthCode")
    public ResponseEntity<Map<String, String>> checkAuthCode(@RequestParam String authCode, @RequestParam String loginId, @RequestParam String email){

        Map<String, String> response = new HashMap<>();

        Integer userId = userService.findUserIdByLoginIdAndEmail(loginId,email);

        EmailAuth authInfo = userService.findAuthByUserIdAndAuthCode(userId, authCode);

        LocalDateTime expTime = LocalDateTime.now().plusMinutes(3);
        LocalDateTime insertTime = authInfo.getInsertDt().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        System.out.println("expTime: " + expTime);
        System.out.println("insertTime: " + insertTime);

        if(insertTime.isBefore(expTime)){
            // 인증 상태 1 - > 3 (대기 -> 만료)
            System.out.println("1 -> 3 시작");
            userService.expireAuthStatus(String.valueOf(authInfo.getAuthId()), authInfo.getAuthCode(), expTime);
            System.out.println("1 -> 3 끝");
        }



        //인증 여부 확인
        int flag = userService.checkAuthCode(authCode, String.valueOf(userId));

        if(flag == 1){
            // 인증 상태 1 - > 2 (대기 -> 성공)
            int updateFlag = userService.updateAuthStatus(String.valueOf(authInfo.getAuthId()), authCode);
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

    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, String>> changePassword(@RequestParam String loginId, @RequestParam String email, @RequestParam String password){

        int flag = userService.updatePassword(loginId,email,password);
        System.out.println("flag: " + flag);

        Map<String, String> response = new HashMap<>();

        if(flag == 1){
            response.put("status", "success");
            response.put("messasge", "비밀번호 변경 성공");
        } else if(flag == 0){
            response.put("status", "error");
            response.put("message", "비밀번호 변경 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            response.put("status", "error");
            response.put("message", "비밀번호 변경 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }
}

