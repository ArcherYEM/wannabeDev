package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.FolderMapper;
import com.dev.wannabe.domain.minihompi.model.dto.FolderContentsDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderFindDTO;
import com.dev.wannabe.domain.minihompi.model.dto.UpdateFolderDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiFolder;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public void saveFolder(String folderName, String contentType, String availStatus, SessionUserDTO sessionUser) {

        Long folderId = folderMapper.findMaxFolderId(sessionUser.getHompiId(), contentType) + 1;
        HompiFolder hompiFolder = HompiFolder.builder()
                .hompiId(sessionUser.getHompiId())
                .folderId(folderId)
                .folderName(folderName)
                .contentsType(contentType)
                .availStatus(availStatus)
                .insertUserId(sessionUser.getUserId())
                .build();

        folderMapper.saveFolder(hompiFolder);
    }

    public List<FolderDTO> getFolders(Long hompiId, String contentsType, String availStatus) {

        FolderFindDTO folderFind = FolderFindDTO.builder()
                .hompiId(hompiId)
                .contentsType(contentsType)
                .availStatus(availStatus)
                .build();

        return folderMapper.findAllFolderByFolderFind(folderFind);
    }

    public List<FolderContentsDTO> getFolderContents(Long hompiId, String contentsType, Long folderId) {

        FolderFindDTO folderFind = FolderFindDTO.builder()
                .hompiId(hompiId)
                .contentsType(contentsType)
                .folderId(folderId)
                .build();

        return folderMapper.findAllFolderContentByFolderFind(folderFind);
    }

    public Void updateFolder(Long updateFolderId,String contentType, String updateFolderName) {

        UpdateFolderDTO updateFolder = UpdateFolderDTO.builder()
                .folderId(updateFolderId)
                .folderName(updateFolderName)
                .contentType(contentType)
                .build();

        folderMapper.updateFolder(updateFolder);
        return null;
    }

    public Void updateFolderContents(Long updateFolderId, Long contentId, String contentsType) {

        FolderContentsDTO updateFolderContents = FolderContentsDTO.builder()
                .folderId(updateFolderId)
                .contentsId(contentId)
                .contentsType(contentsType)
                .build();

        folderMapper.updateFolderContent(updateFolderContents);
        return null;
    }

    public ResponseEntity<Boolean> deleteFolder(Long hompiId, Long folderId, String contentType) {
        Integer deleteNum = folderMapper.deleteFolder(hompiId,folderId,contentType);
        if(deleteNum == 0){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(true);
    }
}