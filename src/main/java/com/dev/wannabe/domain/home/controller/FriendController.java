package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.FriendPanelDTO;
import com.dev.wannabe.domain.home.model.dto.FriendRequestDTO;
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
import java.nio.file.Path;
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

    @PostMapping("/accept/{friendId}")
    @ResponseBody
    public ResponseEntity<Void> acceptFriend(@PathVariable Long friendId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            friendService.acceptFriend(sessionUser.getUserId(), friendId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/reject/{friendId}")
    @ResponseBody
    public ResponseEntity<Void> rejectFriend(@PathVariable Long friendId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.badRequest().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.badRequest().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            friendService.rejectFriend(sessionUser.getUserId(), friendId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/my/{friendId}")
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

    @GetMapping("/friends/num")
    @ResponseBody
    public ResponseEntity<Long> getFriendsNum(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            Long friendsNum = friendService.getFriendsNum(sessionUser.getUserId());
            return ResponseEntity.ok(friendsNum);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/request/num")
    @ResponseBody
    public ResponseEntity<Long> getFriendsRequestNum(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        try {
            Long friendRequestNum = friendService.getFriendRequestNum(sessionUser.getUserId());
            return ResponseEntity.ok(friendRequestNum);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/info/all")
    @ResponseBody
    public ResponseEntity<List<FriendPanelDTO>> friendInfoAll(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        List<FriendPanelDTO> loggedFriends = friendService.getAllFriendPanelInfo(sessionUser.getUserId());

        return ResponseEntity.ok(loggedFriends);
    }

    @GetMapping("/info/{start}/{size}")
    @ResponseBody
    public ResponseEntity<List<FriendPanelDTO>> fridnInfoPage(@PathVariable Integer start, @PathVariable Integer size, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        List<FriendPanelDTO> loggedFriends = friendService.getFriendPanelByPage(sessionUser.getUserId(), start, size);

        return ResponseEntity.ok(loggedFriends);
    }

    @GetMapping("/logged/num")
    @ResponseBody
    public ResponseEntity<Long> loggedFriendsCnt(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        Long loginFriendsCnt = friendService.logInFriendCount(sessionUser.getUserId());

        return ResponseEntity.ok(loginFriendsCnt);
    }

    @GetMapping("/receive/{start}/{size}")
    @ResponseBody
    public ResponseEntity<List<FriendRequestDTO>> getFriendReceiveByPage(@PathVariable Integer start, @PathVariable Integer size, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        List<FriendRequestDTO> receive = friendService.getFriendReceiveListByPage(sessionUser.getUserId(), start, size);

        return ResponseEntity.ok(receive);
    }

    @GetMapping("/send/{start}/{size}")
    @ResponseBody
    public ResponseEntity<List<FriendRequestDTO>> getFriendSendByPage(@PathVariable Integer start, @PathVariable Integer size, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        List<FriendRequestDTO> receive = friendService.getFriendSendListByPage(sessionUser.getUserId(), start, size);

        return ResponseEntity.ok(receive);
    }

    @DeleteMapping("/send/{friendId}")
    @ResponseBody
    public ResponseEntity<Void> sendCancel(@PathVariable Long friendId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) { return ResponseEntity.ok().build(); }
        Object userData = session.getAttribute("userData");
        if (userData == null) {return ResponseEntity.ok().build(); }
        SessionUserDTO sessionUser = (SessionUserDTO) userData;

        friendService.deleteRequestCancel(sessionUser.getUserId(), friendId);

        return ResponseEntity.ok().build();
    }
}