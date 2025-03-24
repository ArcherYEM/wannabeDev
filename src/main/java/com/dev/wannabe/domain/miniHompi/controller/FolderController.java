package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.dto.FolderContentsDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.service.FolderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/folder")
public class FolderController {

    private final FolderService folderService;

    @PostMapping("/save/{folderName}/{contentsType}")
    @ResponseBody
    public ResponseEntity<Void> save(@PathVariable String folderName, @PathVariable String contentsType, HttpServletRequest request) {
        folderService.saveFolder(folderName, contentsType, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getFolders/{contentsType}")
    @ResponseBody
    public ResponseEntity<List<FolderDTO>> getFolder(@PathVariable String contentsType, HttpServletRequest request) {
        List<FolderDTO> folders = folderService.getFolder(contentsType, request);
        return ResponseEntity.ok(folders);
    }

    @GetMapping("/getFolderContents/{folderId}/{contentsType}")
    @ResponseBody
    public ResponseEntity<List<FolderContentsDTO>> getFolderContents(@PathVariable Long folderId, @PathVariable String contentsType, HttpServletRequest request) {
        List<FolderContentsDTO> contents = folderService.getFolderContents(folderId, contentsType, request);
        return ResponseEntity.ok(contents);
    }

}
