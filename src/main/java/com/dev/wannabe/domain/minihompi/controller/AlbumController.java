package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.service.AlbumService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mini-hompi/album")
public class AlbumController {

    private final AlbumService albumService;
    
    // 사진첩 폴더 불러오기
    @GetMapping("/leftWrap")
    public String albumLeft(){
        return "minihompi/photo/minihompiPhotoLeft";
    }

    // 자신의 홈피여야만 등록 수정 삭제 버튼 ON. Else, OFF.
    @GetMapping("/checkStatus/{hompiId}")
    public ResponseEntity<Boolean> checkStatus(@PathVariable Long hompiId,
                                                           HttpSession session) {

        // 비로그인일 때
        if (session == null) {
            return ResponseEntity.ok(false);
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");

        // 자신의 홈피가 아닐 때
        if (!userData.getHompiId().equals(hompiId)) {
            return ResponseEntity.ok(false);
        }

        return ResponseEntity.ok(true);
    }
}
