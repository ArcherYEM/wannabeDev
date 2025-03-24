package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.FolderContentsDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderDTO;
import com.dev.wannabe.domain.minihompi.model.dto.FolderFindDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiFolder;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FolderMapper {

    // folder 저장
    void saveFolder(HompiFolder folder);

    List<FolderDTO> findAllFolderByFolderFind(FolderFindDTO folderFind);

    List<FolderContentsDTO> findAllFolderContentByFolderFind(FolderFindDTO folderFind);

}
