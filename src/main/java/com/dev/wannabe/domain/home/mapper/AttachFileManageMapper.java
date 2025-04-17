package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.AttachFileManage;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AttachFileManageMapper {
    void addAttachFileManage(AttachFileManage attachFileManage);
}
