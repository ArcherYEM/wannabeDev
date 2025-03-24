package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.FolderContentsDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.service.FolderService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/folder")
public class FolderController {

    private final FolderService folderService;

    @PostMapping("/save/{folderName}/{contentsType}")
    @ResponseBody
    public ResponseEntity<Void> save(@PathVariable String folderName, @PathVariable String contentsType, HttpServletRequest request) {
        Object userData = request.getSession().getAttribute("userData");
        if (userData == null) {
            return ResponseEntity.noContent().build();
        }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;
        if (folderService.saveFolder(folderName, contentsType, sessionUser)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/read/{contentsType}")
    @ResponseBody
    public ResponseEntity<List<FolderDTO>> getFolder(@PathVariable String contentsType, HttpServletRequest request) {
        Object userData = request.getSession().getAttribute("userData");
        if (userData == null) {
            return ResponseEntity.noContent().build();
        }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;
        List<FolderDTO> folders = folderService.getFolder(contentsType, sessionUser);
        return ResponseEntity.ok(folders);
    }

    @GetMapping("/read/{contentsType}/{folderId}")
    @ResponseBody
    public ResponseEntity<List<FolderContentsDTO>> getFolderContents(@PathVariable String contentsType, @PathVariable Long folderId, HttpServletRequest request) {
        Object userData = request.getSession().getAttribute("userData");
        if (userData == null) {
            return ResponseEntity.noContent().build();
        }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;
        List<FolderContentsDTO> contents = folderService.getFolderContents(folderId, contentsType, sessionUser);
        return ResponseEntity.ok(contents);
    }

}
