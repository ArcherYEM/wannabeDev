package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.home.mapper.UserMapper;
import com.dev.wannabe.domain.minihompi.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.FolderContentsDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.model.vo.FriendInfo;
import com.dev.wannabe.domain.minihompi.service.FolderService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Objects;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/folder")
public class FolderController {

    private final UserMapper userMapper;
    private final HompiMapper hompiMapper;
    private final FriendMapper friendMapper;
    private final FolderService folderService;

    @PostMapping("/save/{contentsType}/{folderName}/{availStatus}")
    @ResponseBody
    public ResponseEntity<Void> save(@PathVariable String folderName, @PathVariable String contentsType, @PathVariable String availStatus, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        folderService.saveFolder(folderName, contentsType, availStatus, sessionUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/read/{hompiId}/{contentsType}")
    @ResponseBody
    public ResponseEntity<List<FolderDTO>> getFolder(@PathVariable Long hompiId, @PathVariable String contentsType, HttpServletRequest request) {

        Object userData = request.getSession().getAttribute("userData");
        String availStatus;
        if (userData == null) {
            availStatus = "33";
        } else {
            SessionUserDTO visitUser = (SessionUserDTO) userData;
            Long userId = hompiMapper.findUserIdByHompiId(hompiId);

            Long visitUserId = visitUser.getUserId();
            Long visitHompiId = visitUser.getHompiId();

            if (hompiId == visitHompiId) {
                availStatus = "31";
            } else if (friendMapper.existsByUserIdAndFriendId(userId, visitUserId)) {
                availStatus = "32";
            } else {
                availStatus = "33";
            }
        }
        List<FolderDTO> folders = folderService.getFolders(hompiId, contentsType, availStatus);

        return ResponseEntity.ok(folders);
    }

    @GetMapping("/read/{hompiId}/{contentsType}/{folderId}")
    @ResponseBody
    public ResponseEntity<List<FolderContentsDTO>> getFolderContents(@PathVariable Long hompiId, @PathVariable String contentsType, @PathVariable Long folderId) {
        List<FolderContentsDTO> contents = folderService.getFolderContents(hompiId, contentsType, folderId);
        return ResponseEntity.ok(contents);
    }

    @PutMapping("update/{hompiId}/{updateFolderId}/{updateFolderName}")
    @ResponseBody
    public ResponseEntity<Void> updateFolder(@PathVariable Long hompiId, @PathVariable Long updateFolderId, @PathVariable String updateFolderName, HttpServletRequest request) {
        Object userData = request.getSession().getAttribute("userData");
        if (userData == null) { return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;
        if (hompiId != sessionUser.getHompiId()) {
            return ResponseEntity.badRequest().build();
        }
        folderService.updateFolder(updateFolderId, updateFolderName);
        return ResponseEntity.ok().build();
    }

    @PutMapping("update/{hompiId}/{contentsType}/{updateFolderId}/{contentId}")
    @ResponseBody
    public ResponseEntity<Void> updateFolderContent(@PathVariable Long hompiId, @PathVariable String contentsType, @PathVariable Long updateFolderId, @PathVariable Long contentId, HttpServletRequest request) {Object userData = request.getSession().getAttribute("userData");
        if (userData == null) { return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;
        if (hompiId != sessionUser.getHompiId()) {
            return ResponseEntity.badRequest().build();
        }
        folderService.updateFolderContents(updateFolderId, contentId, contentsType);
        return ResponseEntity.ok().build();
    }

}
