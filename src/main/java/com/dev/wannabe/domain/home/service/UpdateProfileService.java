package com.dev.wannabe.domain.home.service;


import com.dev.wannabe.domain.home.mapper.UpdateProfileMapper;
import com.dev.wannabe.domain.home.model.dto.SignupUserDTO;
import com.dev.wannabe.domain.home.model.dto.UpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateProfileService {

    private final UpdateProfileMapper updateProfileMapper;

    // Spring Security의 PasswordEncoder 인터페이스로, 비밀번호를 암호화하거나 검증
    private final PasswordEncoder passwordEncoder;

    // 사용자의 loginId를 기반으로 사용자 정보를 조회
    public SignupUserDTO getUser(String loginId) {
        return updateProfileMapper.findByLoginId(loginId);
    }

    // 이메일 중복 여부를 확인
    public boolean isEmailDuplicate(String email, String loginId) {
        return updateProfileMapper.countByEmailAndNotLoginId(email, loginId) > 0;
    }

    // 전화번호 중복 여부를 확인
    public boolean isPhoneNoDuplicate(String phoneNo, String loginId) {
        return updateProfileMapper.countByPhoneNoAndNotLoginId(phoneNo, loginId) > 0;
    }

    // 현재 비밀번호가 일치하는지 검증
    public boolean verifyPassword(String loginId, String rawPassword) {
        SignupUserDTO user = updateProfileMapper.findByLoginIdForPassword(loginId);
        if (user == null) return false;
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // 사용자 정보를 업데이트
    public void updateUser(UpdateDTO updateDTO) {
        // updateDTO가 null인지 확인
        // null이면 에러를 발생시켜 문제를 미리 방지
        if (updateDTO == null) {
            throw new IllegalArgumentException("수정할 사용자 정보가 없습니다!");
        }

        // 수정: 전화번호 형식 검증 추가
        // 전화번호가 null이 아니고, 숫자 11자리가 아니면 에러를 발생
        if (updateDTO.getPhoneNo() != null && !updateDTO.getPhoneNo().matches("\\d{11}")) {
            throw new IllegalArgumentException("전화번호는 숫자 11자리로 입력해주세요. 예: 01012345678");
        }

        // 수정: 전화번호가 010으로 시작하는지 확인
        // 전화번호가 null이 아니고, 010으로 시작하지 않으면 에러를 발생
        if (updateDTO.getPhoneNo() != null && !updateDTO.getPhoneNo().startsWith("010")) {
            throw new IllegalArgumentException("전화번호는 010으로 시작해야 합니다.");
        }

        // 사용자가 새 비밀번호를 입력했는지 확인
        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isEmpty()) {
            // 비밀번호를 암호화하여 설정
            updateDTO.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        }

        // DB에 사용자 정보를 업데이트
        updateProfileMapper.updateUser(updateDTO);
    }
}
