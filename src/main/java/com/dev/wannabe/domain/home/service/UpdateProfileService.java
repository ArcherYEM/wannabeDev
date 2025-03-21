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

    // MyBatis 매퍼 인터페이스로, DB와 상호작용합니다.
    private final UpdateProfileMapper updateProfileMapper;

    // Spring Security의 PasswordEncoder 인터페이스로, 비밀번호를 암호화하거나 검증합니다.
    private final PasswordEncoder passwordEncoder;

    // 사용자의 loginId를 기반으로 사용자 정보를 조회하는 메서드입니다.
    public SignupUserDTO getUser(String loginId) {
        return updateProfileMapper.findByLoginId(loginId);
    }

    // 이메일 중복 여부를 확인하는 메서드입니다.
    public boolean isEmailDuplicate(String email, String loginId) {
        return updateProfileMapper.countByEmailAndNotLoginId(email, loginId) > 0;
    }

    // 전화번호 중복 여부를 확인하는 메서드입니다.
    public boolean isPhoneNoDuplicate(String phoneNo, String loginId) {
        return updateProfileMapper.countByPhoneNoAndNotLoginId(phoneNo, loginId) > 0;
    }

    // 현재 비밀번호가 일치하는지 검증하는 메서드입니다.
    public boolean verifyPassword(String loginId, String rawPassword) {
        SignupUserDTO user = updateProfileMapper.findByLoginIdForPassword(loginId);
        if (user == null) return false;
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // 사용자 정보를 업데이트하는 메서드입니다.
    // 매개변수: updateDTO (수정할 사용자 정보를 담은 UpdateDTO 객체)
    public void updateUser(UpdateDTO updateDTO) {
        // 수정: updateDTO가 null인지 확인하는 로직 추가
        // null이면 에러를 발생시켜 문제를 미리 방지합니다.
        if (updateDTO == null) {
            throw new IllegalArgumentException("수정할 사용자 정보가 없습니다!");
        }
        // 사용자가 새 비밀번호를 입력했는지 확인합니다.
        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isEmpty()) {
            // 비밀번호를 암호화하여 설정합니다.
            updateDTO.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        }
        // DB에 사용자 정보를 업데이트합니다.
        // 수정: UpdateDTO UpdateDTO = null; 제거
        // 메서드 매개변수로 받은 updateDTO를 사용합니다.
        updateProfileMapper.updateUser(updateDTO);
    }
}
