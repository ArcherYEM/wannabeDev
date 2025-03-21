package com.dev.wannabe.domain.home.controller;


import com.dev.wannabe.domain.home.model.dto.LoginDataDTO;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
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

    @Autowired
    private UpdateProfileService userService;

    // 회원정보 수정 페이지 표시 (GET 요청)
    @GetMapping("/update-profile")
    public String showUpdateProfile(Model model, HttpServletRequest request, @AuthenticationPrincipal UserDetails user) {
        String loginId = user.getUsername();
        SignupUserDTO SignupUserDTO = UpdateProfileService.getUser(loginId);
        String ipAddress = request.getRemoteAddr();

        model.addAttribute("IP", ipAddress);
        model.addAttribute("name", SignupUserDTO.getname());
        model.addAttribute("LoginId", SignupUserDTO.getLoginId());
        model.addAttribute("username", SignupUserDTO.getname());
        model.addAttribute("birthDate", SignupUserDTO.getBirthDate());
        model.addAttribute("genderCode", SignupUserDTO.getGenderCode());
        model.addAttribute("email", SignupUserDTO.getEmail());
        model.addAttribute("phoneNo", SignupUserDTO.getPhoneNo());

        return "update-profile"; // Thymeleaf 템플릿
    }

    // 이메일 중복 확인 API
    @PostMapping("/check-email-duplicate")
    @ResponseBody
    public Map<String, Boolean> checkEmailDuplicate(@RequestParam String email, @AuthenticationPrincipal UserDetails user) {
        boolean isDuplicate = userService.isEmailDuplicate(email, user.getUsername());
        return Collections.singletonMap("isDuplicate", isDuplicate);
    }

    // 전화번호 중복 확인 API
    @PostMapping("/check-phone-duplicate")
    @ResponseBody
    public Map<String, Boolean> checkPhoneDuplicate(@RequestParam String phone, @AuthenticationPrincipal UserDetails user) {
        boolean isDuplicate = userService.isPhoneNoDuplicate(phone, user.getUsername());
        return Collections.singletonMap("isDuplicate", isDuplicate);
    }

    // 비밀번호 검증 API
    @PostMapping("/verify-password")
    @ResponseBody
    public Map<String, Boolean> verifyPassword(@RequestParam String password, @RequestParam String loginId) {
        boolean isValid = userService.verifyPassword(loginId, password);
        return Collections.singletonMap("isValid", isValid);
    }

    // 회원정보 업데이트 API
    @PostMapping("/update-profile")
    @ResponseBody
    public ResponseEntity<String> updateProfile(@RequestBody SignupUserDTO SignupUserDTO) {
        userService.updateUser(SignupUserDTO);
        return ResponseEntity.ok("Success");
    }
}
