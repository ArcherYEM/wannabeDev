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

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderMapper folderMapper;

    @Transactional
    public void saveFolder(String folderName, String contentType,  HttpServletRequest request) {

        SessionUserDTO sessionUser = (SessionUserDTO) request.getSession().getAttribute("userData");
        Long userId = sessionUser.getUserId();
        Long hompiId = sessionUser.getHompiId();

        HompiFolder hompiFolder = HompiFolder.builder()
                .hompiId(hompiId)
                .folderName(folderName)
                .contentType(contentType)
                .insertUserId(userId)
                .build();

        folderMapper.saveFolder(hompiFolder);
    }

    @Transactional
    public List<FolderDTO> getFolder(String contentsType, HttpServletRequest request) {
        SessionUserDTO sessionUser = (SessionUserDTO) request.getSession().getAttribute("userData");
        Long hompiId = sessionUser.getHompiId();

        FolderFindDTO folderFind = FolderFindDTO.builder()
                .hompiId(hompiId)
                .contentsType(contentsType)
                .build();

        return folderMapper.findAllFolderByFolderFind(folderFind);
    }

    @Transactional
    public List<FolderContentsDTO> getFolderContents(Long folderId, String contentsType, HttpServletRequest request) {
        SessionUserDTO sessionUser = (SessionUserDTO) request.getSession().getAttribute("userData");
        Long hompiId = sessionUser.getHompiId();

        FolderFindDTO folderFind = FolderFindDTO.builder()
                .hompiId(hompiId)
                .contentsType(contentsType)
                .folderId(folderId)
                .build();

        return folderMapper.findAllFolderContentByFolderFind(folderFind);
    }

}
