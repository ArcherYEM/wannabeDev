package com.dev.wannabe.domain.minihompi.service.bgm;

import com.dev.wannabe.domain.minihompi.mapper.bgm.BgmMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class BgmFileService {

    private final BgmMapper bgmMapper;
    private final String audioFolderPath = "src/main/resources/static/audio";

    @Scheduled(fixedRate = 30000)
    public void registerBgmFile() {
        File mp3File = new File(audioFolderPath);   // audioFolderPath 경로의 File 가져오기

        // 파일 존재 여부 검증 코드
        if(!mp3File.exists()){
            System.out.println("해당 경로의 MP3파일은 존재하지 않습니다.");
            return;
        }




    }

}
