package com.dev.wannabe.domain.home.controller.api;

import com.dev.wannabe.domain.home.model.dto.InsertProductDTO;
import com.dev.wannabe.domain.home.service.ProductService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class RestProductController {

    private final ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<Boolean> addProductItem(@ModelAttribute InsertProductDTO insertProductDTO, HttpServletRequest request){
        Boolean check = productService.addProductItem(insertProductDTO, request);
        if(check.equals(false)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(check);
    }
}
