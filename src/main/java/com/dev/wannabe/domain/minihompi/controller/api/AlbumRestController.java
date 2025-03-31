package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.SaveAlbumDTO;
import com.dev.wannabe.domain.minihompi.service.AlbumService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/minihompi")
public class AlbumRestController {

    private final AlbumService albumService;

    @PostMapping("/saveAlbum/{hompiId}")
    public ResponseEntity<Map<String, String>> saveAlbum(@PathVariable Long hompiId,
                                                         @RequestParam("albumFolderId") Long albumFolderId,
                                                         @RequestParam("albumTitle") String albumTitle,
                                                         @RequestParam("albumAvailStatus") String albumAvailStatus,
                                                         @RequestParam("albumContent") String albumContent,
                                                         @RequestParam(value = "albumImg", required = true)
                                                         MultipartFile albumImg,
                                                         HttpSession session) {

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");

        log.info("hompiId: " + hompiId);
        log.info("albumFolderId: " + albumFolderId);
        log.info("albumTitle: " + albumTitle);
        log.info("albumAvailStatus: " + albumAvailStatus);
        log.info("albumContent)" + albumContent);
        log.info("userData.getUserId: " + userData.getUserId());
        log.info("albumImg: " + albumImg);
        Long userId = userData.getUserId();

        //TODO: 서비스 layer에 넣기 밑에 부분
        try {
            if (albumImg == null || albumImg.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // 1. 저장 경로 설정 (외부 경로로 변경)
            String uploadDir = System.getProperty("user.dir") + "/uploads/images/personal";
            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String albumName = albumImg.getOriginalFilename();
            log.info("albumName: " + albumName);

            // 2. 파일 이름 및 저장 경로 구성
            String fileName = "profile" + hompiId + albumName + ".jpg";
            File destination = new File(folder, fileName);

            // 3. 파일 저장
            albumImg.transferTo(destination);
            log.info("Saved profile image to: {}", destination.getAbsolutePath());

            // 4. DB 또는 서비스에 반영 (저장 경로 전달)
            String albumImage = "/images/personal/" + fileName;

            SaveAlbumDTO album = SaveAlbumDTO.builder()
                    .hompiId(hompiId)
                    .folderId(albumFolderId)
                    .albumTitle(albumTitle)
                    .availStatus(albumAvailStatus)
                    .albumContent(albumContent)
                    .userId(userId)
                    .albumImage(albumImage)
                    .build();

            albumService.saveAlbum(album);

            return ResponseEntity.ok().build();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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

    @GetMapping("/getAlbum/{albumId}/{hompiId}")
    public ResponseEntity<SaveAlbumDTO> getAlbum(@PathVariable Long albumId,
                                                 @PathVariable Long hompiId,
                                                 HttpSession session) {

        log.info("albumId: " + albumId);
        log.info("hompiId: " + hompiId);

        SessionUserDTO loginUser = (SessionUserDTO) session.getAttribute("userData");
        SaveAlbumDTO album = albumService.getAlbum(albumId, hompiId, loginUser);
        log.info("album: " + album);

        if (album == null) {
            SaveAlbumDTO defaultAlbum = albumService.getDefaultAlbum(hompiId);
            log.info("defaultAlbum: " + defaultAlbum);
            return ResponseEntity.ok(defaultAlbum);
        }

        return ResponseEntity.ok(album);
    }

    @PostMapping("/deleteAlbum")
    public ResponseEntity<Map<String, String>> deleteAlbum(@RequestBody Map<String, Long> data) {

        Long albumId = data.get("albumId");
        Long hompiId = data.get("hompiId");

        log.info("albumId: " + albumId);
        log.info("hompiId: " + hompiId);

        int flag = albumService.deleteAlbum(albumId, hompiId);
        Map<String, String> response = new HashMap<>();
        if (flag == 1) {
            response.put("status", "success");
            response.put("message", "albumId " + albumId + "가 삭제 성공!");
        } else if (flag == 0) {
            response.put("status", "error");
            response.put("message", "삭제 실패!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            response.put("status", "error");
            response.put("message", "삭제 실패!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/updateAlbum/{hompiId}")
    public ResponseEntity<Map<String, String>> updateAlbum(@PathVariable Long hompiId,
                                                           @RequestParam("albumFolderId") Long albumFolderId,
                                                           @RequestParam("albumTitle") String albumTitle,
                                                           @RequestParam("albumAvailStatus") String albumAvailStatus,
                                                           @RequestParam("albumContent") String albumContent,
                                                           @RequestParam("albumId") Long albumId,
                                                           @RequestParam(value = "albumImg", required = true)
                                                           MultipartFile albumImg,
                                                           HttpSession session) {

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");

        log.info("hompiId: " + hompiId);
        log.info("albumFolderId: " + albumFolderId);
        log.info("albumTitle: " + albumTitle);
        log.info("albumAvailStatus: " + albumAvailStatus);
        log.info("albumContent)" + albumContent);
        log.info("userData.getUserId: " + userData.getUserId());
        log.info("albumId: " + albumId);

        Long userId = userData.getUserId();

        try {
            if (albumImg == null || albumImg.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // 1. 저장 경로 설정 (외부 경로로 변경)
            String uploadDir = System.getProperty("user.dir") + "/uploads/images/personal";
            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String albumName = albumImg.getOriginalFilename();
            log.info("albumName: " + albumName);

            // 2. 파일 이름 및 저장 경로 구성
            String fileName = "profile" + hompiId + albumName +  ".jpg";
            File destination = new File(folder, fileName);

            // 3. 파일 저장
            albumImg.transferTo(destination);

            // 4. DB 또는 서비스에 반영 (저장 경로 전달)
            String albumImage = "/images/personal/" + fileName;

            SaveAlbumDTO album = SaveAlbumDTO.builder()
                    .albumId(albumId)
                    .hompiId(hompiId)
                    .folderId(albumFolderId)
                    .albumTitle(albumTitle)
                    .availStatus(albumAvailStatus)
                    .albumContent(albumContent)
                    .userId(userId)
                    .albumImage(albumImage)
                    .build();

            int flag = albumService.updateAlbum(album);
            log.info("flag: " + flag);

            return ResponseEntity.ok().build();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
