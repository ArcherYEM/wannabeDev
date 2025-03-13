package com.dev.wannabe.domain.minihompi.mapper.bgm;

import com.dev.wannabe.domain.minihompi.model.bgm.BgmUpdateDto;
import com.dev.wannabe.domain.minihompi.model.bgm.Bgm;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface BgmMapper {

    void save(Bgm bgm);
    Optional<Bgm> findById(Long id);
    List<Bgm> findAll();
    void updateBgm(@Param("id")Long id, @Param("updateBgmDto")BgmUpdateDto bgmUpdateDto);
}
