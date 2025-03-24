package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.ImageSlideDTO;
import com.dev.wannabe.domain.home.service.ImageSlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ImageSlideController {

    private final ImageSlideService imageSlideService;

    @GetMapping(value="/imageSlide")
    public String imageSlideList(Model model){
        String imgFileName = "%ggum_0%"; // 공지에띄울 FILE_ORIGIN_NAME 명
        List<ImageSlideDTO> imageSlideList = imageSlideService.getImageSlide(imgFileName);
       /* System.out.println("imageSlideList :" + imageSlideList.toArray().length);*/
        model.addAttribute("imageSlideList", imageSlideList);
        return "imageslide";
    }

}
