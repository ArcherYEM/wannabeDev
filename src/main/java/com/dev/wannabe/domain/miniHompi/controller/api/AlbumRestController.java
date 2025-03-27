package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.SaveAlbumDTO;
import com.dev.wannabe.domain.minihompi.service.AlbumService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/minihompi")
public class AlbumRestController {

    private final AlbumService albumService;

    //@PostMapping("/saveAlbum/{hompiId}/{folderId}")
    @PostMapping("/saveAlbum/{hompiId}")
    public ResponseEntity<Map<String, String>> saveAlbum(@PathVariable Long hompiId,
                                    //@PathVariable Long folderId,
                                    @RequestBody SaveAlbumDTO albumData,
                                    @RequestParam(value="image", required = false)
                                    MultipartFile image,
                                    HttpSession session){
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        log.info("hompiId: "+ hompiId);
        //log.info("folderId: "+ folderId);
        log.info("albumData: "+ albumData);
        log.info("userData: "+ userData);
        log.info("userData.getUserId: " + userData.getUserId());
        log.info("albumData.getAlbumTitle()" + albumData.getAlbumTitle());

        //여기서 파일 받기 처리
//        try {
//            if( )
//        }

        //매개변수 담기
        albumService.saveAlbum();
        return null;
    }
}
