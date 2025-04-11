package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.mapper.HompiBoardMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBoardDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mini-hompi/board")
public class BoardController {

    private final HompiBoardMapper hompiBoardMapper;

    @GetMapping("/All-BoardList")
    public List<HompiBoardDTO> getBoardAllList (
            @RequestParam("hompiId") Long hompiId,
            @RequestParam("offset") int offset,
            @RequestParam("pageSize") int pageSize,
            Model model) {

        Long folderId = 1L;
        Map<String, Object> map = Map.of(
                "param1", hompiId,
                "param2", folderId,
                "param3", offset,
                "param4", pageSize
        );
        List<HompiBoardDTO> hompiBoardDTO = hompiBoardMapper.getBoardAllList(map);
        System.out.println(" /All-BoardList 진입 :::: hompiId :::: " + hompiId);
        System.out.println(" /All-BoardList 진입 :::: hompiBoardDTO :::: " + hompiBoardDTO);
        System.out.println(" /All-BoardList 진입 :::: offset :::: " + offset);
        System.out.println(" /All-BoardList 진입 :::: pageSize :::: " + pageSize);

        return hompiBoardDTO;
    }

}
