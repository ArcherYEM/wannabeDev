package com.dev.wannabe.domain.home.service;


import com.dev.wannabe.domain.home.mapper.UpdateProfileMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateProfileService {

        private static final UpdateProfileMapper UpdateProfileMapper = null;
        private final PasswordEncoder passwordEncoder; // Spring Security 비밀번호 암호화

        // 사용자 정보 조회
        public static SignupUserDTO getUser(String loginId) {
            return UpdateProfileMapper.findByLoginId(loginId);
        }

        // 이메일 중복 확인
        public boolean isEmailDuplicate(String email, String loginId) {
            return UpdateProfileMapper.countByEmailAndNotLoginId(email, loginId) > 0;
        }

        // 전화번호 중복 확인
        public boolean isPhoneNoDuplicate(String phoneNo, String loginId) {
            return UpdateProfileMapper.countByPhoneNoAndNotLoginId(phoneNo, loginId) > 0;
        }

        // 비밀번호 검증
        public boolean verifyPassword(String loginId, String rawPassword) {
            SignupUserDTO user = UpdateProfileMapper.findByLoginIdForPassword(loginId);
            if (user == null) return false;
            return passwordEncoder.matches(rawPassword, user.getPassword()); // 암호화된 비밀번호 비교
        }

        // 사용자 정보 업데이트
        public void updateUser(SignupUserDTO SignupUserDTO) {
            // 비밀번호가 변경된 경우 암호화
            if (SignupUserDTO.getPassword() != null && !SignupUserDTO.getPassword().isEmpty()) {
                SignupUserDTO.setPassword(passwordEncoder.encode(SignupUserDTO.getPassword()));
            }
            UpdateProfileMapper.updateUser(SignupUserDTO);
        }
}
