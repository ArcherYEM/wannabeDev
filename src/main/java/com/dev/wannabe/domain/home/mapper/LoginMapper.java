package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.vo.LoginLog;
import com.dev.wannabe.global.model.SessionUserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    String findPasswordByLoginId(String loginId);

    SessionUserDTO findSessionUserByUserId(Long userId);

    void saveLoginLog(LoginLog loginLog);

}
