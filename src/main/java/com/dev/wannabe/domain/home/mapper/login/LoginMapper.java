package com.dev.wannabe.domain.home.mapper.login;

import com.dev.wannabe.domain.home.model.dto.login.LoginLogDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    String findPasswordByLoginId(String loginId);

    void saveLoginLog(LoginLogDTO loginLog);

}
