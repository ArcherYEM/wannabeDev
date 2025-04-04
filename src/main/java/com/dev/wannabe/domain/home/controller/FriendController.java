package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.vo.FriendInfo;
import com.dev.wannabe.domain.home.service.FriendService;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/request/{friendId}")
    @ResponseBody
    public ResponseEntity<Void> friendRequest(@PathVariable Long friendId, HttpServletRequest request) {
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
    public ResponseEntity<Void> acceptFriend(@PathVariable Long requestUserId, HttpServletRequest request) {
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
    public ResponseEntity<Void> rejectFriend(@PathVariable Long requestUserId, HttpServletRequest request) {
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

    @DeleteMapping("/myfriend/{friendId}")
    @ResponseBody
    public ResponseEntity<Void> deleteFriend(@PathVariable Long friendId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            friendService.deleteFriend(sessionUser.getUserId(), friendId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/logged/info")
    @ResponseBody
    public ResponseEntity<List<Long>> loggedFriends(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        List<Long> loggedFriends = friendService.getLoggedFriends(sessionUser.getUserId());

        return ResponseEntity.ok(loggedFriends);
    }

    @GetMapping("/logged/num")
    @ResponseBody
    public ResponseEntity<Long> loggedFriendsCnt(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        Long loginFriendsCnt = friendService.logInFriendCount(sessionUser.getUserId());

        return ResponseEntity.ok(loginFriendsCnt);
    }

}