package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.mapper.HompiBoardMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBoardDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/minihompi/board")
public class BoardController {

    private final HompiBoardMapper hompiBoardMapper;
    
    @GetMapping("/writeBoardFrom")
    public String writeBoardFrom() {

        return "minihompi/board/minihompiBoardWriteFrom";
    }
   
}

