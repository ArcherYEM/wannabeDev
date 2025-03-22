package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.dto.UpdateDTO;
import com.dev.wannabe.domain.home.service.UpdateProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;


@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UpdateProfileController {

    // UpdateProfileService를 주입받아 사용합니다.
    // @Autowired: Spring이 자동으로 UpdateProfileService 객체를 주입합니다.
    @Autowired
    private UpdateProfileService userService;

    // 회원정보 수정 페이지를 표시하는 메서드
    // 수정: @PostMapping("/update-profile")이 중복되어 하나를 다른 경로로 변경합니다.
    @GetMapping("/update-profile") // 수정: POST 대신 GET으로 변경, 중복 경로 문제 해결
    public String showUpdateProfile(Model model, HttpServletRequest request, @AuthenticationPrincipal UserDetails user) {

        // 현재 로그인한 사용자의 loginId를 가져옵니다.
        String loginId = user.getUsername();

        // userService를 통해 loginId로 사용자 정보를 조회합니다.
        // 클래스 이름(UpdateProfileService) 대신 주입받은 객체(userService)를 사용합니다.
        SignupUserDTO signupUserDTO = userService.getUser(loginId); // 수정: 변수 이름 소문자로 변경 (SignupUserDTO → signupUserDTO)


        String ipAddress = request.getRemoteAddr();

        // Thymeleaf 템플릿에 데이터를 전달합니다.
        model.addAttribute("IP", ipAddress);
        model.addAttribute("name", signupUserDTO.getname());
        model.addAttribute("LoginId", signupUserDTO.getLoginId());
        model.addAttribute("username", signupUserDTO.getname());
        model.addAttribute("birthDate", signupUserDTO.getBirthDate());
        model.addAttribute("genderCode", signupUserDTO.getGenderCode());
        model.addAttribute("email", signupUserDTO.getEmail());
        model.addAttribute("phoneNo", signupUserDTO.getPhoneNo());

        // "update-profile" 템플릿(HTML)을 반환하여 회원정보 수정 페이지를 표시합니다.
        return "update-profile";
    }

    // 이메일 중복 확인 API
    // @PostMapping("/check-email-duplicate"): "/user/check-email-duplicate" 경로로 POST 요청이 오면 실행
    @PostMapping("/check-email-duplicate")
    @ResponseBody
    public Map<String, Boolean> checkEmailDuplicate(@RequestParam String email, @AuthenticationPrincipal UserDetails user) {
        // userService를 통해 이메일 중복 여부를 확인합니다.
        // 수정: UpdateProfileService → userService로 변경
        boolean isDuplicate = userService.isEmailDuplicate(email, user.getUsername());
        return Collections.singletonMap("isDuplicate", isDuplicate);
    }

    // 전화번호 중복 확인 API
    @PostMapping("/check-phone-duplicate")
    @ResponseBody
    public Map<String, Boolean> checkPhoneDuplicate(@RequestParam String phone, @AuthenticationPrincipal UserDetails user) {
        // userService를 통해 전화번호 중복 여부를 확인합니다.
        boolean isDuplicate = userService.isPhoneNoDuplicate(phone, user.getUsername());
        return Collections.singletonMap("isDuplicate", isDuplicate);
    }

    // 비밀번호 검증 API
    @PostMapping("/verify-password")
    @ResponseBody
    public Map<String, Boolean> verifyPassword(@RequestParam String password, @RequestParam String loginId) {
        // userService를 통해 비밀번호가 일치하는지 검증
        boolean isValid = userService.verifyPassword(loginId, password);

        return Collections.singletonMap("isValid", isValid);
    }

    // 회원정보 업데이트 API
    @PostMapping("/update-profile")
    @ResponseBody
    public ResponseEntity<String> updateProfile(@RequestBody UpdateDTO updateDTO) { // 수정: 변수 이름 소문자로 변경 (UpdateDTO → updateDTO)
        // userService를 통해 사용자 정보를 업데이트
        userService.updateUser(updateDTO);
        // 성공 메시지를 반환
        return ResponseEntity.ok("Success");
    }
}
