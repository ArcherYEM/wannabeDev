package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.MonthDayDTO;
import com.dev.wannabe.domain.minihompi.service.DiaryService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

    @GetMapping("/checkStatus/{hompiId}")
    public ResponseEntity<Boolean> checkStatus(@PathVariable Long hompiId, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return ResponseEntity.ok(false);
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        if(!userData.getHompiId().equals(hompiId)){
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }
}
