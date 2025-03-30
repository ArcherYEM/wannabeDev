package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.FolderMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.CreateHompiDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.model.dto.HompiFolderDTO;
import com.dev.wannabe.domain.minihompi.model.vo.Hompi;
import com.dev.wannabe.domain.minihompi.model.vo.HompiConfig;
import com.dev.wannabe.domain.minihompi.model.vo.HompiDailyStats;
import com.dev.wannabe.domain.minihompi.model.vo.HompiMenu;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Slf4j
@Service
@RequiredArgsConstructor
public class HompiService {

    private final HompiMapper hompiMapper;
    private final FolderMapper folderMapper;

    @Transactional
    public Boolean createHompi(CreateHompiDTO createHompi) {
        try {
            log.info("Create Hompi 시작");
            Long hompiId;
            Long userId = createHompi.getUserId();

            Hompi newHompi = Hompi.builder()
                    .hompiURL("http://localhost:8080/mini-hompi/main/" + userId)
                    .hompiTitle(createHompi.getHompiTitle())
                    .ownerUserId(userId)
                    .insertUserId(userId)
                    .build();

            hompiMapper.saveHompi(newHompi);

            hompiId = hompiMapper.findHompiIdByUserId(userId);

            HompiConfig newHompiConfig = HompiConfig.builder()
                    .hompiId(hompiId)
                    .hompiConfigContent(null)
                    .insertUserId(userId)
                    .build();
            // COMMON_CODE_DETAIL의 HOMPI_CONFIG_CODE의 CODE_ID로 동적 생성
            hompiMapper.saveAllHompiConfig(newHompiConfig);

            // 초기값으로 01(프로필 사진 URL 적용)
            HompiConfig updateConfig = HompiConfig.builder()
                    .hompiId(hompiId)
                    .hompiConfigCode("01")
                    .hompiConfigContent("/static/images/common/no-image-mini-room.png")
                    .updateUserId(userId)
                    .build();
            hompiMapper.saveHompiConfig(updateConfig);

            HompiMenu hompiMenu = HompiMenu.builder()
                    .hompiId(hompiId)
                    .availStatus("31")
                    .insertUserId(userId)
                    .build();

            hompiMapper.saveAllHompiMenu(hompiMenu);

            HompiDailyStats hompiDailyStats = HompiDailyStats.builder()
                    .hompiId(hompiId)
                    .dayStatsDate(nowFormatyyyyMMdd())
                    .insertUserId(userId)
                    .build();

            hompiMapper.saveHompiDailyStats(hompiDailyStats);

            HompiFolderDTO hompiFolderDTO = HompiFolderDTO.builder()
                    .hompiId(hompiId)
                    .folderId(1L)
                    .folderName("기본 폴더")
                    .availStatus("33")
                    .insertUserId(userId)
                    .build();

            folderMapper.saveBasicFolder(hompiFolderDTO);

            return true;
        } catch (Exception e) {
            log.error("홈피 생성 에러 {}", e.getMessage());
            return false;
        }
    }

    private String nowFormatyyyyMMdd() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }

}
