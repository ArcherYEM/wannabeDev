package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.vo.AlbumComment;
import com.dev.wannabe.domain.minihompi.service.AlbumCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
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

        albumCommentService.saveComment(albumComment, availStatus, session);




        return null;
    }

}
