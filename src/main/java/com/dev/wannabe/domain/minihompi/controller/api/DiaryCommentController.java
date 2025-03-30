package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.DiaryCommentFindDTO;
import com.dev.wannabe.domain.minihompi.service.DiaryCommentService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mini-hompi/diary-comment")
public class DiaryCommentController {

    private final DiaryCommentService commentService;
    @PostMapping("/save/{diaryId}/{hompiId}")
    public ResponseEntity<Boolean> saveDiaryComment(@PathVariable Long hompiId, @PathVariable Long diaryId,
                                                    @RequestParam String comment,@RequestParam String availStatus,
                                                    HttpServletRequest request){
        return commentService.saveDiaryComment(hompiId, diaryId, comment,availStatus, request);
    }
    @GetMapping("/read/{diaryId}/{hompiId}")
    public ResponseEntity<List<DiaryCommentFindDTO>> getDiaryComment(@PathVariable Long diaryId, @PathVariable Long hompiId){
        List<DiaryCommentFindDTO> diaryComments = commentService.getDiaryComment(hompiId, diaryId);
        if(diaryComments == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(diaryComments);
    }

    @DeleteMapping("/delete/{commentId}/{userId}/{hompiId}")
    public ResponseEntity<Boolean> deleteDiaryComment(@PathVariable Long commentId, @PathVariable Long userId,
                                                      @PathVariable Long hompiId, HttpServletRequest request){
        SessionUserDTO visitUser = (SessionUserDTO) request.getSession().getAttribute("userData");
        if(!visitUser.getHompiId().equals(hompiId)){
            return ResponseEntity.badRequest().build();
        }
        if(!visitUser.getUserId().equals(userId)){
            return ResponseEntity.badRequest().build();
        }
        return commentService.deleteDiaryComment(commentId);
    }


}
