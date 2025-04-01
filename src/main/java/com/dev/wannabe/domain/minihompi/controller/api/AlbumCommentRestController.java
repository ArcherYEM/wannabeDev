package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.AlbumCommentDTO;
import com.dev.wannabe.domain.minihompi.model.vo.AlbumComment;
import com.dev.wannabe.domain.minihompi.service.AlbumCommentService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/minihompi")
public class AlbumCommentRestController {

    private final AlbumCommentService albumCommentService;

    //@PostMapping("/saveComment/{hompiId}")
    @PostMapping("/saveComment")
    public ResponseEntity<Map<String, String>> saveComment(@RequestBody AlbumComment albumComment,
                                                           @RequestParam("availStatus") String availStatus,
                                                           HttpSession session){

        log.info("albumComment: " + albumComment);
        log.info("availStatus: " + availStatus);
        log.info("session: " + session);

        int flag = albumCommentService.saveComment(albumComment, availStatus, session);
        log.info("flag: " + flag);

        Map<String, String> response = new HashMap<>();

        if(flag == 1){
            response.put("status", "success");
            response.put("message", "댓글 등록 성공");
            return ResponseEntity.ok(response);
        } else if (flag == 0){
            response.put("status", "failed");
            response.put("message", "댓글 달기 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            response.put("status", "failed");
            response.put("message", "댓글 달기 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/getComment/{hompiId}/{albumId}")
        public ResponseEntity<List<AlbumCommentDTO>> getComment(
                @PathVariable Long hompiId,
                @PathVariable Long albumId){

            List<AlbumCommentDTO> comment = albumCommentService.getComment(hompiId, albumId);

            log.info("comment: " + comment);

            if(comment == null){
                return ResponseEntity.ok(null);
            }

            return ResponseEntity.ok(comment);
    }

    @PostMapping("/deleteComment")
    public ResponseEntity<Map<String,String>> deleteComment(@RequestBody Map<String, Object> data,
                                                            HttpSession session){

        Long hompiId = ((Number) data.get("hompiId")).longValue();
        Long commentId = ((Number) data.get("commentId")).longValue();

        int flag = albumCommentService.deleteComment(hompiId, commentId, session);
        Map<String, String> response = new HashMap<>();

        if(1 == flag){
            response.put("status", "success");
            response.put("message", "댓글 삭제 성공");
            return ResponseEntity.ok(response);
        } else if(0 == flag){
            response.put("status", "failed");
            response.put("message", "댓글 삭제 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else{
            response.put("status", "failed");
            response.put("message", "댓글 삭제 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/updateComment")
    public ResponseEntity<Map<String,String>> updateComment(@RequestBody Map<String, Object> data,
                                                            HttpSession session){

        Long hompiId;
        Long commentId;

        Object hompiIdObj = data.get("hompiId");
        Object commentIdObj = data.get("commentId");

        if (hompiIdObj instanceof Number) {  // Number 타입일 때
            hompiId = ((Number) hompiIdObj).longValue();
        } else {  // String 타입일 때
            hompiId = Long.parseLong((String) hompiIdObj);
        }

        if (commentIdObj instanceof Number) {  // Number 타입일 때
            commentId = ((Number) commentIdObj).longValue();
        } else {  // String 타입일 때
            commentId = Long.parseLong((String) commentIdObj);
        }
        String comment = (String) data.get("comment");

        int flag  = albumCommentService.updateComment(hompiId, comment, commentId, session);
        log.info("flag: "+ flag);
        return null;
    }
}

