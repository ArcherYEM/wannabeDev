package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.friend.vo.FriendMessage;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FriendMapper {

    void saveFriendMessage(FriendMessage friendMessage);

}
