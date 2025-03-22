package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.HompiBgmDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HompiBgmMapper {

    HompiBgmDTO findOwnerBgmByOwnerId(Long ownerId);
}
