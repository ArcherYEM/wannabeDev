package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.mapper.HompiBoardMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBoardDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mini-hompi/board")
public class BoardController {

    private final HompiBoardMapper hompiBoardMapper;

    @GetMapping("/All-BoardList")
    public Map<String, Object> getBoardAllList(
            @RequestParam("hompiId") Long hompiId,
            @RequestParam("offset") int offset,
            @RequestParam("pageSize") int pageSize) {

        Long folderId = 1L;

        // 총 게시물 수
        Long boardCount = hompiBoardMapper.getBoardListCount(hompiId, folderId);

        // 리스트 조회
        Map<String, Object> paramMap = Map.of(
                "param1", hompiId,
                "param2", offset,
                "param3", pageSize
        );
        List<HompiBoardDTO> boardList = hompiBoardMapper.getBoardAllList(paramMap);
        
        Map<String, Object> result = new HashMap<>();
        result.put("boardList", boardList);     // 게시글 리스트
        result.put("boardCount", boardCount);   // 전체 게시글 수
        
        /*System.out.println(" /All-BoardList 진입 :::: hompiId : " + hompiId);
        System.out.println(" /All-BoardList 진입 :::: offset : " + offset);
        System.out.println(" /All-BoardList 진입 :::: pageSize : " + pageSize);
        System.out.println(" /All-BoardList 진입 :::: boardCount : " + boardCount);
        System.out.println(" /All-BoardList 진입 :::: boardList : " + boardList);*/

        return result;
    }
    
    @GetMapping("/BoardView")
    public List<HompiBoardDTO> getBoardView(
            @RequestParam("hompiBoardId") Long hompiBoardId){
        List<HompiBoardDTO> BoardViewDTO = hompiBoardMapper.getBoardView(hompiBoardId);
        System.out.println(" /BoardView 진입 :::: BoardViewDTO : " + BoardViewDTO);

        return BoardViewDTO;
    }
    
}
