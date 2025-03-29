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

}
