package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.AlbumMapper;
import com.dev.wannabe.domain.minihompi.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.SaveAlbumDTO;
import com.dev.wannabe.global.model.SessionUserDTO;
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
    private final HompiMapper hompiMapper;
    private final FriendMapper friendMapper;

    @Transactional
    public void saveAlbum(SaveAlbumDTO data){
        albumMapper.saveAlbum(data);
    }

    public SaveAlbumDTO getAlbum(Long albumId, Long hompiId, SessionUserDTO loginUser){
        Long loginUserId = loginUser.getUserId();
        Long ownerUserId = hompiMapper.findUserIdByHompiId(hompiId);
        String availStatus;

        if (ownerUserId.equals(loginUserId)) {
            availStatus = "31";
        } else if (friendMapper.existsByUserIdAndFriendId(ownerUserId, loginUserId)) {
            availStatus = "32";
        } else {
            availStatus = "33";
        }

        SaveAlbumDTO albumDTO = SaveAlbumDTO.builder()
                .hompiId(hompiId)
                .albumId(albumId)
                .availStatus(availStatus)
                .build();

        return albumMapper.findAlbumByAlbumDTO(albumDTO);
    }

    public SaveAlbumDTO getDefaultAlbum(Long hompiId){
        SaveAlbumDTO albumDTO = SaveAlbumDTO.builder()
                .hompiId(hompiId)
                .build();
        return albumMapper.findDefaultAlbumByAlbumDTO(albumDTO);
    }

    public Integer deleteAlbum(Long albumId, Long hompiId){
        return albumMapper.deleteAlbum(albumId,hompiId);
    }

    public Integer updateAlbum(SaveAlbumDTO data){return albumMapper.updateAlbum(data);}

}
