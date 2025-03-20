package com.dev.wannabe.domain.miniHompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import com.dev.wannabe.domain.minihompi.service.BgmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/mini-hompi")
@RequiredArgsConstructor
public class BgmController {

    private final BgmService bgmService;

    @GetMapping("/user-bgm/{hompiId}")
    public ResponseEntity<HompiBgmDTO> findUserBgm(@PathVariable Long hompiId){
        HompiBgmDTO ownerBgmList = bgmService.getOwnerBgmList(hompiId);
        if(ownerBgmList == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(ownerBgmList);
    }
}