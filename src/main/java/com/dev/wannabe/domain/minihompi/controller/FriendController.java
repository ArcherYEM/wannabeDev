package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.model.vo.FriendInfo;
import com.dev.wannabe.domain.minihompi.service.FriendService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/request/{friendId}")
    @ResponseBody
    public ResponseEntity<Void> FriendRequest(@PathVariable Long friendId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        FriendInfo friendRequestInfo = FriendInfo.builder()
                .userId(sessionUser.getUserId())
                .friendUserId(friendId)
                .build();
        try {
            friendService.requestNewFriend(friendRequestInfo);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/accept/{requestUserId}")
    @ResponseBody
    public ResponseEntity<Void> AcceptFriend(@PathVariable Long requestUserId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            friendService.acceptFriend(sessionUser.getUserId(), requestUserId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/reject/{requestUserId}")
    @ResponseBody
    public ResponseEntity<Void> RejectFriend(@PathVariable Long requestUserId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            friendService.rejectFriend(requestUserId, sessionUser.getUserId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


}