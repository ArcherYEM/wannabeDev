package com.dev.wannabe.domain.minihompi.controller.api;

import com.dev.wannabe.domain.home.mapper.FriendMapper;
import com.dev.wannabe.domain.home.model.dto.FriendSettingDTO;
import com.dev.wannabe.domain.home.model.dto.RequestFriendCardDTO;
import com.dev.wannabe.domain.home.service.FriendService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/minihompi/setting")
public class SettingRestController {

    private final FriendService friendService;

    @GetMapping("/friend/{start}/{size}")
    public ResponseEntity<List<FriendSettingDTO>> getFriendSetting(@PathVariable Integer start, @PathVariable Integer size, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        RequestFriendCardDTO requestFriendCard = RequestFriendCardDTO.builder()
                .userId(sessionUser.getUserId())
                .start(start)
                .size(size)
                .build();

        List<FriendSettingDTO> friendSettingList = friendService.getFriendSettingByPage(requestFriendCard);
        return ResponseEntity.ok(friendSettingList);
    }

}
