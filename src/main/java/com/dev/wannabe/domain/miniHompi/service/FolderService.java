package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.FolderMapper;
import com.dev.wannabe.domain.minihompi.model.dto.FolderContentsDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderFindDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiFolder;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FolderService {

    private final FolderMapper folderMapper;

    @Transactional
    public Boolean saveFolder(String folderName, String contentType, SessionUserDTO sessionUser) {
        try {
            Long userId = sessionUser.getUserId();
            Long hompiId = sessionUser.getHompiId();

            HompiFolder hompiFolder = HompiFolder.builder()
                    .hompiId(hompiId)
                    .folderName(folderName)
                    .contentType(contentType)
                    .insertUserId(userId)
                    .build();

            folderMapper.saveFolder(hompiFolder);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public List<FolderDTO> getFolder(String contentsType, SessionUserDTO sessionUser) {
        Long hompiId = sessionUser.getHompiId();

        FolderFindDTO folderFind = FolderFindDTO.builder()
                .hompiId(hompiId)
                .contentsType(contentsType)
                .build();

        return folderMapper.findAllFolderByFolderFind(folderFind);
    }

    public List<FolderContentsDTO> getFolderContents(Long folderId, String contentsType, SessionUserDTO sessionUser) {
        Long hompiId = sessionUser.getHompiId();

        FolderFindDTO folderFind = FolderFindDTO.builder()
                .hompiId(hompiId)
                .contentsType(contentsType)
                .folderId(folderId)
                .build();

        return folderMapper.findAllFolderContentByFolderFind(folderFind);
    }

}