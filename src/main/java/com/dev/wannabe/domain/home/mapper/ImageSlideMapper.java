package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.ImageSlideDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ImageSlideMapper {

    List<ImageSlideDTO> getImageSlide(String imgFileName);

}
