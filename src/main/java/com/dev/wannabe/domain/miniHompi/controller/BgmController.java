package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import com.dev.wannabe.domain.minihompi.service.HompiBgmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mini-hompi")
@RequiredArgsConstructor
public class BgmController {

    private final HompiBgmService bgmService;
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