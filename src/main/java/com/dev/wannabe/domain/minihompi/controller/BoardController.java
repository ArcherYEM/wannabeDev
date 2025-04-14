package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.mapper.HompiBoardMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiBoardDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            @RequestParam("folderId") Long folderId,
            @RequestParam("offset") int offset,
            @RequestParam("pageSize") int pageSize) {


        // 총 게시물 수
        Long boardCount = hompiBoardMapper.getBoardListCount(hompiId, folderId);

        // 리스트 조회
        Map<String, Object> paramMap = Map.of(
                "param1", hompiId,
                "param2", folderId,
                "param3", offset,
                "param4", pageSize
        );
        List<HompiBoardDTO> boardList = hompiBoardMapper.getBoardAllList(paramMap);
        
        Map<String, Object> result = new HashMap<>();
        result.put("boardList", boardList);     // 게시글 리스트
        result.put("boardCount", boardCount);   // 전체 게시글 수
        
        /*System.out.println(" /All-BoardList 진입 :::: hompiId : " + hompiId);
        System.out.println(" /All-BoardList 진입 :::: folderId : " + folderId);
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
        /*System.out.println(" /BoardView 진입 :::: BoardViewDTO : " + BoardViewDTO);*/

        return BoardViewDTO;
    }

    @GetMapping(value = "/deleteBoardPost", produces = "text/plain; charset=UTF-8")
    @ResponseBody
    public ResponseEntity<String> getFolderName(
            @RequestParam("boardId") List<Long> boardId)
            {
                boolean deleteChk = false;
                if (boardId.size() > 1) {
                    for(int i=0; boardId.size() > i; i++) {
                        System.out.println(" /deleteBoardPost 1개이상 진입 :::: boardId : " + boardId.get(i));
                        deleteChk = hompiBoardMapper.deleteBoardPost(boardId.get(i));
                    }
                } else {
                    System.out.println(" /deleteBoardPost 1개 진입 :::: boardId : " + boardId.get(0));
                    deleteChk = hompiBoardMapper.deleteBoardPost(boardId.get(0));
                }

                if (deleteChk) {
                    System.out.println("( boardId : " + boardId + " ) 메세지 삭제 성공");
                    return ResponseEntity.ok("게시물을 삭제 하였습니다.");
                } else {
                    System.out.println("( boardId : " + boardId + " ) 메세지 삭제 실패");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("게시물을 삭제하는 도중 오류가 발생하였습니다.\r\n 다시 시도하여 주세요");
                }
    }

    @GetMapping("/writeBoardFrom")
    public String writeBoardFrom(){

        return "minihompi/board/minihompiBoardWriteFrom";
    }
}
