package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.PopularUserMapper;
import com.dev.wannabe.domain.home.model.dto.PopularUserDTO;
import io.netty.handler.codec.DateFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PopularUserService {

    private final PopularUserMapper popularUserMapper;
    public ResponseEntity<List<PopularUserDTO>> findTopTenUser(){
        LocalDate now = LocalDate.now();
        String todayDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        List<PopularUserDTO> topTenUser = popularUserMapper.findTopTenUser(todayDate);
        if (topTenUser == null){
            ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(topTenUser);
    }
}
