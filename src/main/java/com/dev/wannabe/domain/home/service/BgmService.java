package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.AttachFileManageMapper;
import com.dev.wannabe.domain.home.mapper.BgmMapper;
import com.dev.wannabe.domain.home.model.dto.InsertBgmDTO;
import com.dev.wannabe.domain.home.model.vo.AttachFileManage;
import com.dev.wannabe.domain.home.model.vo.Bgm;
import com.dev.wannabe.domain.home.model.vo.BgmPrice;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BgmService {

    private final BgmMapper bgmMapper;
    private final AttachFileManageMapper fileManageMapper;

    @Transactional
    public Boolean saveBgm(InsertBgmDTO insertBgmDTO, HttpServletRequest request) {
        SessionUserDTO sessionUserDTO = getSessionUserDTO(request);
        if(sessionUserDTO == null){
            return false;
        }

        if(sessionUserDTO.getRole().equals("03")){
            return false;
        }

        try {
            MultipartFile uploadFile = insertBgmDTO.getUploadFile();
            String originalFilename = uploadFile.getOriginalFilename();
            String storeFileName = getStoreName(originalFilename);

            String uploadDir = System.getProperty("user.dir") + "/uploads/images/bgm/cover/";
            File folder = new File(uploadDir);

            if(!folder.exists()){
                folder.mkdirs();
            }
            File dest = new File(folder, storeFileName);
            uploadFile.transferTo(dest);

            String imgFilePath = "/images/bgm/cover/" + storeFileName;

            AttachFileManage attachFileManage = AttachFileManage.builder()
                    .fileOriginName(originalFilename)
                    .filePath(imgFilePath)
                    .fileExtension(getExtension(originalFilename))
                    .fileSize(uploadFile.getSize())
                    .build();

            fileManageMapper.addAttachFileManage(attachFileManage);

            MultipartFile audioFile = insertBgmDTO.getAudioFile();
            String audioOriginalFilename = audioFile.getOriginalFilename();
            String audioStoreFileName = getStoreName(audioOriginalFilename);

            String audioDir = System.getProperty("user.dir") + "/uploads/audio/bgm/";
            File audioFolder = new File(audioDir);

            if(!audioFolder.exists()){
                audioFolder.mkdirs();
            }

            File audioDest = new File(audioFolder, audioStoreFileName);
            audioFile.transferTo(audioDest);

            audioStoreFileName = UriUtils.encodePathSegment(audioStoreFileName, StandardCharsets.UTF_8);
            String audioFilePath = "/audio/bgm/" + audioStoreFileName;

            AttachFileManage attachAudioFileManage = AttachFileManage.builder()
                    .fileOriginName(audioOriginalFilename)
                    .filePath(audioFilePath)
                    .fileExtension(getExtension(audioOriginalFilename))
                    .fileSize(audioFile.getSize())
                    .build();

            fileManageMapper.addAttachFileManage(attachAudioFileManage);

            Bgm bgm = Bgm.builder()
                    .bgmLength(insertBgmDTO.getAudioLength())
                    .bgmName(insertBgmDTO.getBgmName())
                    .bgmFileAttachId(attachAudioFileManage.getAttachFileId())
                    .imageFileAttachId(attachFileManage.getAttachFileId())
                    .artist(insertBgmDTO.getArtist())
                    .insertUserId(sessionUserDTO.getUserId())
                    .genreCode(insertBgmDTO.getGenreCode())
                    .lyrics(insertBgmDTO.getLyrics())
                    .build();

            bgmMapper.saveBgm(bgm);

            BgmPrice bgmPrice = BgmPrice.builder()
                    .bgmId(bgm.getBgmId())
                    .price(insertBgmDTO.getPrice())
                    .availDay("99999")
                    .insertUserId(sessionUserDTO.getUserId())
                    .build();

            bgmMapper.saveBgmPrice(bgmPrice);

        }catch (Exception e){
            throw new RuntimeException("BGM 저장에 실패했습니다");
        }
        return true;
    }

    private static SessionUserDTO getSessionUserDTO(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session == null){
            return null;
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        return userData;
    }

    private static String getStoreName(String originalFileName){
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        String extension = getExtension(originalFileName);
        return FilenameUtils.getBaseName(originalFileName) + LocalDateTime.now().format(fmt) + "." + extension;
    }
    private static String getExtension(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos + 1);
    }
}
