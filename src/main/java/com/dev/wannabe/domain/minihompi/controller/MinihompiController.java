package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.FriendCommentDTO;
import com.dev.wannabe.domain.minihompi.service.MinihompiService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/mini-hompi")
public class MinihompiController {

    //TODO 미니홈피 메뉴 테이블에서 메뉴 공개 값 가져와서 json에 추가하고 공개범위 정하기(현재의 MyHompi 역할)

    private final MinihompiService minihompiService;

    @GetMapping("/hompiMain")
    public String popupHompMain() {

        return "minihompi/minihompiMain";
    }


    @GetMapping("/api/{hompiId}")
    public ResponseEntity<Map<String, Object>> miniHompipopup(@PathVariable Long hompiId, HttpServletRequest request, HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        Map<String, Object> response = minihompiService.getMinihompiPopup(hompiId, userData, session);
        return ResponseEntity.ok(response);
    }

    @GetMapping("api/myHompiCheck/{hompiId}")
    public ResponseEntity<Map<String, Object>> myHompiCheck(@PathVariable Long hompiId, HttpServletRequest request, HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        Map<String, Object> result = minihompiService.myHompiCheck(hompiId, userData, session);
        return ResponseEntity.ok(result);

    }

    @GetMapping("/main/{hompiId}")
    public String minihompiWrap(@PathVariable Long hompiId) {
        return "minihompi/minihompiWrap";
    }

    @PostMapping("/updateTitle/{hompiId}")
    public ResponseEntity<Map<String, Object>> updateTitle(@PathVariable Long hompiId, @RequestParam String title) {
        Map<String, Object> result = minihompiService.updateMinihompiTitle(hompiId, title);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/api/mood-save/{hompiId}")
    public ResponseEntity<Map<String, Object>> saveMood(@PathVariable Long hompiId, @RequestBody String mood) {
        Map<String, Object> result = minihompiService.saveMood(hompiId, mood);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/api/updateProfile/{hompiId}")
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

    @GetMapping("/api/FriendComment/{hompiId}")
    public ResponseEntity<List<FriendCommentDTO>> friendComment
            (@PathVariable Long hompiId,
             HttpServletRequest request,
             HttpSession session) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        List<FriendCommentDTO> result = minihompiService.getFriendComment(hompiId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/api/insertFriendComment/{hompiId}")
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

    @DeleteMapping("/api/friendCommentDelete/{hompiId}/{commentId}")
    public ResponseEntity<Integer> deleteFriendComment(@PathVariable Long hompiId, @PathVariable Long commentId) {
        int result = minihompiService.deleteFriendComment(hompiId, commentId);
        if (result == 1) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/profile")
    public String Profile() {

        return "minihompi/profile/minihompiProfile";
    }

    @GetMapping("/dairy")
    public String Dairy() {
        return "minihompi/dairy/minihompiDairy";
    }

    @GetMapping("/jukebox")
    public String Jukebox() {

        return "minihompi/jukebox/minihompiJukebox";
    }

    @GetMapping("/photo")
    public String Photo() {

        return "minihompi/photo/minihompiPhoto";
    }

    @GetMapping("/board")
    public String Board() {

        return "minihompi/board/minihompiBoard";
    }

    @GetMapping("/visitor")
    public String Visitor() {

        return "minihompi/visitor/minihompiVisitor";
    }

    @GetMapping("/setting")
    public String Setting() {

        return "minihompi/setting/minihompiSetting";
    }

    @GetMapping("/newmessage")
    public String message() {
        return "common/popup/newMessage";
    }

}
