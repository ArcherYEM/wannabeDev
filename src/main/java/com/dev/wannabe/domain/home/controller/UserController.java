package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userManageService;
    private final HompiService hompiManageService;
    private final MiniroomService miniroomService;
    private final MinimiService minimiService;
    private final FriendService friendService;


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
