package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.SaveAlbumDTO;
import com.dev.wannabe.domain.minihompi.model.vo.Album;
import com.dev.wannabe.domain.minihompi.model.vo.AlbumContents;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AlbumMapper {

    void saveAlbum(SaveAlbumDTO data);

    SaveAlbumDTO findAlbumByAlbumDTO(SaveAlbumDTO albumDTO);

}
