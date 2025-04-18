package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.mapper.BgmMapper;
import com.dev.wannabe.domain.home.model.dto.InsertBgmDTO;
import com.dev.wannabe.domain.home.service.BgmService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/bgm")
@RequiredArgsConstructor
public class RestBgmController {

    private final BgmService bgmService;

    @PostMapping("/add")
    public ResponseEntity<Boolean> saveBgm(@ModelAttribute InsertBgmDTO insertBgmDTO, HttpServletRequest request){
        Boolean checkSave = bgmService.saveBgm(insertBgmDTO,request);
        if(checkSave.equals(false)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(checkSave);
    }

}
