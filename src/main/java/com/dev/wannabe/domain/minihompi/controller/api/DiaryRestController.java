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

    @PostMapping("/add/diary/{folderId}/{hompiId}")
    public ResponseEntity<Boolean> addDiary(@PathVariable Long folderId, @PathVariable Long hompiId,
                                            @RequestParam String availStatus, @RequestParam String diaryContent,
                                            HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session == null){
            return ResponseEntity.badRequest().build();
        }
        return diaryService.addDiary(hompiId,folderId,session,diaryContent,availStatus);
    }

    @GetMapping("/get/diary-day/{day}/{folderId}/{hompiId}")
    public ResponseEntity<HompiDiaryDTO> getDiaryByDay(@PathVariable Integer day, @PathVariable Long hompiId,
                                                       @PathVariable Long folderId){
        HompiDiaryDTO diary = diaryService.findDiaryByDay(day, hompiId, folderId);
        if(diary == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(diary);
    }

    @GetMapping("/get/diary/{diaryId}/{hompiId}")
    public ResponseEntity<HompiDiaryDTO> getDiary(@PathVariable Long diaryId, @PathVariable Long hompiId,
                                                  HttpServletRequest request){
        HompiDiaryDTO diary = diaryService.getDiary(diaryId, hompiId, request);
        return ResponseEntity.ok(diary);
    }

    @PostMapping("/update/diary/{diaryId}/{hompiId}")
    public ResponseEntity<Long> updateDiary(@PathVariable Long diaryId, @PathVariable Long hompiId,
                                            @RequestParam String diaryContent,@RequestParam String availStatus,
                                            HttpServletRequest request){
        Boolean result = diaryService.updateDiary(diaryId, hompiId, diaryContent,availStatus,request);
        if(!result){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(diaryId);
    }
    @DeleteMapping("/delete/diary/{diaryId}/{hompiId}")
    public ResponseEntity<Boolean> deleteDiary(@PathVariable Long diaryId, @PathVariable Long hompiId,
                                               HttpServletRequest request){
        Boolean b = diaryService.deleteDiary(diaryId, hompiId, request);
        if(!b){
            return ResponseEntity.badRequest().body(false);
        }
        return ResponseEntity.ok(true);
    }

}
