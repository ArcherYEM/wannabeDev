package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.MonthDayDTO;
import com.dev.wannabe.domain.minihompi.service.DiaryService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mini-hompi/diary")
public class DiaryController {

    private final DiaryService diaryService;
    @GetMapping("/leftWrap")
    public String diaryLeft(){
        return "minihompi/dairy/minihompiDairyLeft";
    }

    @GetMapping("/daysInfo")
    public ResponseEntity<MonthDayDTO> datInfo(){
        return ResponseEntity.ok(diaryService.getMonthDays());
    }

    @GetMapping("/check-status/{hompiId}")
    public ResponseEntity<Boolean> checkStatus(@PathVariable Long hompiId, HttpServletRequest request){
        SessionUserDTO userData = (SessionUserDTO)request.getSession().getAttribute("userData");
        if(userData == null){
            return ResponseEntity.ok(false);
        }
        if(!userData.getHompiId().equals(hompiId)){
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }

    @GetMapping("/comment/check-status/{hompiId}")
    public ResponseEntity<String> checkCommentStatus(@PathVariable Long hompiId,HttpServletRequest request){
        return diaryService.checkCommentStatus(hompiId,request);
    }
}
