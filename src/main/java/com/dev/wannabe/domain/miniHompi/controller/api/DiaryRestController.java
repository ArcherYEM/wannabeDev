package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.HompiDiaryDTO;
import com.dev.wannabe.domain.minihompi.service.DiaryService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/minihompi")
@RequiredArgsConstructor
public class DiaryRestController {

    private final DiaryService diaryService;

    @PostMapping("/addDiary/{folderId}/{hompiId}")
    public ResponseEntity<Boolean> addDiary(@PathVariable Long folderId, @PathVariable Long hompiId,
                                            @RequestParam String availStatus, @RequestParam String diaryContent,
                                            HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session == null){
            return ResponseEntity.badRequest().build();
        }
        SessionUserDTO userDTO = (SessionUserDTO)session.getAttribute("userData");
        Boolean bool = diaryService.addDiary(hompiId, folderId, session, diaryContent, availStatus);
        if(!bool){
            return ResponseEntity.badRequest().body(false);
        }
        return ResponseEntity.ok(true);
    }

    @GetMapping("/getDiary/{diaryId}/{hompiId}")
    public ResponseEntity<HompiDiaryDTO> getDiary(@PathVariable Long diaryId, @PathVariable Long hompiId,
                                                  HttpServletRequest request){
        HompiDiaryDTO diary = diaryService.getDiary(diaryId, hompiId, request);
        if(diary == null){
            ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(diary);
    }

}
