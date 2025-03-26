package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.FriendCommentDTO;
import com.dev.wannabe.domain.minihompi.service.MinihompiService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/minihompi")
public class HomeRestController {
    private final MinihompiService minihompiService;

//    /* 미니홈피 열기 */
    @GetMapping("/{hompiId}")
    public ResponseEntity<Map<String, Object>> miniHompiPopup(@PathVariable Long hompiId, HttpServletRequest request, HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        Map<String, Object> response = minihompiService.getMinihompiPopup(hompiId, userData, session);

        return ResponseEntity.ok(response);
    }

    /* 내 미니홈피인지 체크하기 */
    @GetMapping("/myHompiCheck/{hompiId}")
    public ResponseEntity<Map<String, Object>> myHompiCheck(@PathVariable Long hompiId, HttpServletRequest request, HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        Map<String, Object> result = minihompiService.myHompiCheck(hompiId, userData, session);

        return ResponseEntity.ok(result);
    }

    /* 기분 상태값 저장하기 */
    @PostMapping("/mood-save/{hompiId}")
    public ResponseEntity<Map<String, Object>> saveMood(@PathVariable Long hompiId, @RequestBody String mood) {
        Map<String, Object> result = minihompiService.saveMood(hompiId, mood);

        return ResponseEntity.ok(result);
    }

    /* 타이틀 제거 */
    @PostMapping("/updateTitle/{hompiId}")
    public ResponseEntity<Map<String, Object>> updateTitle(@PathVariable Long hompiId, @RequestParam String title) {
        Map<String, Object> result = minihompiService.updateMinihompiTitle(hompiId, title);

        return ResponseEntity.ok(result);
    }

    /* 프로필 변경 */
    @PostMapping("/updateProfile/{hompiId}")
    public ResponseEntity<Map<String, Object>> updateProfile(@PathVariable Long hompiId,
                                                             @RequestParam("introduction") String introduction,
                                                             @RequestParam(value = "profileImage", required = false)
                                                             MultipartFile profileImage) {
        try {
            // 경로 설정
            String savePath = new ClassPathResource("static/images/personal/").getFile().getAbsolutePath();
            String fileName = "profile" + hompiId + ".jpg";
            String filePath = savePath + File.separator + fileName;
            File dest = new File(savePath, fileName);

            // 이미지 저장
            if (profileImage != null && !profileImage.isEmpty()) {
                profileImage.transferTo(dest);
            }

            Map<String, Object> result = minihompiService.updateHompiConfig(hompiId, introduction, filePath);

            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "fail"));
        }
    }

    /* 일촌평 조회 */
    @GetMapping("/FriendComment/{hompiId}")
    public ResponseEntity<List<FriendCommentDTO>> friendComment (@PathVariable Long hompiId,
                                                                 HttpServletRequest request,
                                                                 HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        List<FriendCommentDTO> result = minihompiService.getFriendComment(hompiId);
        return ResponseEntity.ok(result);
    }

    /* 일촌평 등록 */
    @PostMapping("/insertFriendComment/{hompiId}")
    public ResponseEntity<Integer> insertFriendComment(@PathVariable Long hompiId,
                                                       @RequestParam("fcContent") String fcContent,
                                                       HttpServletRequest request,
                                                       HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        int result = minihompiService.insertFriendComment(hompiId, userData, fcContent, session);
        System.out.println("insert 결과: " + result);
        if (result == 1 | result == 2) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    /* 일촌평 삭제 */
    @DeleteMapping("/friendCommentDelete/{hompiId}/{commentId}")
    public ResponseEntity<Integer> deleteFriendComment(@PathVariable Long hompiId, @PathVariable Long commentId) {
        int result = minihompiService.deleteFriendComment(hompiId, commentId);
        if (result == 1) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
