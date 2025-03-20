package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.LoginLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    String findPasswordByLoginId(String loginId);

    void saveLoginLog(LoginLog loginLog);

}
