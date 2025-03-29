package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.AlbumMapper;
import com.dev.wannabe.domain.minihompi.model.dto.SaveAlbumDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumService {

    private final AlbumMapper albumMapper;

    @Transactional
    public void saveAlbum(SaveAlbumDTO data){
        albumMapper.saveAlbum(data);
    }


}
