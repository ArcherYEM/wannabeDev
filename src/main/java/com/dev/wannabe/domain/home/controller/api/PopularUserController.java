package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.PopularUserDTO;
import com.dev.wannabe.domain.home.service.PopularUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/popular-user")
public class PopularUserController {

    private final PopularUserService popularUserService;
    @GetMapping("/read")
    public ResponseEntity<List<PopularUserDTO>> getTodayTopTenUser(){
        return popularUserService.findTopTenUser();
    }
}
