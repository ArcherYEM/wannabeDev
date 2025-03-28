package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import com.dev.wannabe.domain.minihompi.service.HompiBgmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mini-hompi")
@RequiredArgsConstructor
public class BgmRestController {

    private final HompiBgmService bgmService;

    //홈피 주인이 등록한 BGM가져오기
    @GetMapping("/user-bgm/{hompiId}")
    public ResponseEntity<List<HompiBgmDTO>> findUserBgm(@PathVariable Long hompiId,
                                                         @RequestParam(required = false) Integer offset,
                                                         @RequestParam(defaultValue = "10") Integer limit,
                                                         @RequestParam(required = false) String useYn,
                                                         @RequestParam(required = false) String searchStatus,
                                                         @RequestParam(required = false) String search){
        Map<String, Object> bgmMap = new HashMap<>();

        bgmMap.put("hompiId",hompiId);
        bgmMap.put("offset",offset);
        bgmMap.put("limit", limit);
        bgmMap.put("useYn", useYn);
        bgmMap.put("searchStatus", searchStatus);
        bgmMap.put("search",search);

        List<HompiBgmDTO> ownerBgmList = bgmService.getOwnerBgmList(bgmMap);
        if(ownerBgmList == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(ownerBgmList);
    }

    //홈피 주인이 가지고있는 BGM개수 가져오기
    @GetMapping("/user-bgm/count/{hompiId}")
    public ResponseEntity<Integer> getBgmCount(@PathVariable Long hompiId,
                                               @RequestParam(required = false) String searchStatus,
                                               @RequestParam(required = false) String search){

        Map<String, Object> countMap = new HashMap<>();
        countMap.put("hompiId",hompiId);
        countMap.put("searchStatus", searchStatus);
        countMap.put("search",search);

        Integer bgmCount = bgmService.getBgmCount(countMap);
        return ResponseEntity.ok(bgmCount);
    }

    //BGM PLAYER에 주크박스에 있는 노래 등록
    @PostMapping("/user-bgm/use-yn/{hompiId}")
    public ResponseEntity<Boolean> setBackGroundBgm(@PathVariable Long hompiId,
                                                    @RequestParam List<Long> bgmIds){
        Map<String, Object> bgmIdMap = new HashMap<>();

        bgmIdMap.put("hompiId",hompiId);
        bgmIdMap.put("bgmIds",bgmIds);

        Boolean check = bgmService.setBackGroundBgm(bgmIdMap);
        if(!check){
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }
}