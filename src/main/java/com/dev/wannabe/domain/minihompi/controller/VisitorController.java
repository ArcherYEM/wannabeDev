package com.dev.wannabe.domain.minihompi.controller;

import com.dev.wannabe.domain.minihompi.mapper.MinihompiMapper;
import com.dev.wannabe.domain.minihompi.mapper.MinimiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiVisitorDTO;
import com.dev.wannabe.domain.minihompi.model.dto.MinimiInfoDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiVisitor;
import com.dev.wannabe.global.model.SessionUserDTO;
import com.dev.wannabe.domain.minihompi.service.VisitorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor // 생성자 주입
@RequestMapping("/mini-hompi")
public class VisitorController {

    @Autowired
    private final MinimiMapper minimiMapper;

    @Autowired
    private final MinihompiMapper minihompiMapper;

    @Autowired
    private final VisitorService visitorService;

    /**
     * 방명록 진입 - hompiId를 세션에 저장
     **/
    @GetMapping("/visitor/{hompiId}")
    public String visitor(@PathVariable("hompiId") Long hompiId,
                          @RequestParam(name = "offset", defaultValue = "0") int offset,
                          HttpSession session,
                          Model model) {

        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");

        String userRole = "0"; // 기본값: 비로그인

        if (user != null && user.getRole() != null) {
            userRole = user.getRole();
        }
        session.setAttribute("currentHompiId", hompiId);

        Map<String, Object> result = visitorService.getVisitorPage(hompiId, offset);
        model.addAttribute("result", result);
        model.addAttribute("userRole", userRole);
        model.addAttribute("hompiId", hompiId);

        return "minihompi/visitor/minihompiVisitor";
    }

    @PostMapping("/visitor/page/{hompiId}")
    public String reloadVisitorPage(@PathVariable("hompiId") Long hompiId,
                                    @RequestParam(name = "offset", defaultValue = "0") int offset,
                                    HttpSession session,
                                    Model model) {

        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");

        String userRole = "0"; // 기본값: 비로그인

        if (user != null && user.getRole() != null) {
            userRole = user.getRole();
        }

        Map<String, Object> result = visitorService.getVisitorPage(hompiId, offset);
        model.addAttribute("result", result);
        model.addAttribute("userRole", userRole);
        model.addAttribute("hompiId", hompiId);

        return "minihompi/visitor/minihompiVisitor :: #visit"; // :: #visit(id="visit"인 태그만 ajax 응답으로 보냄)
    }

    /**
     * 방명록 글 작성
     **/
    @PostMapping("/visitor/insert/{hompiId}")
    @ResponseBody  // <- 만약 redirect를 쓰지 않고, 상태 코드만 내려보낼 거면 이걸 붙이세요
    public ResponseEntity<String> insertGuestBook(@PathVariable("hompiId") Long hompiId,
                                                  HttpSession session,
                                                  @RequestParam("content") String content,
                                                  @RequestParam(value = "secret", required = false, defaultValue = "N") String secretCheck) {
        SessionUserDTO loginUser = (SessionUserDTO) session.getAttribute("userData");
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        Long userId = loginUser.getUserId();

        HompiVisitor vo = HompiVisitor.builder()
                .hompiId(hompiId)
                .guestBookContent(content)
                .remarks(null)
                .insertUserId(userId)
                .insertDt(LocalDateTime.now())
                .updateUserId(null)
                .updateDt(null)
                .secretCheck(secretCheck)
                .build();

        log.info("insert visitor info:",vo);

        minihompiMapper.insertVisitor(vo);

        return ResponseEntity.ok("등록 성공");
    }

    @PostMapping("/visitor/update")
    @ResponseBody
    public ResponseEntity<String> updateVisitor(@RequestBody Map<String, Object> requestBody, HttpSession session) {
        SessionUserDTO user = (SessionUserDTO) session.getAttribute("userData");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        Long guestBookId = Long.parseLong(requestBody.get("guestBookId").toString());
        String content = requestBody.get("content").toString();

        Map<String, Object> param = new HashMap<>();
        param.put("guestBookId", guestBookId);
        param.put("guestBookContent", content);
        param.put("updateUserId", user.getUserId());
        param.put("updateDt", LocalDateTime.now());

        minihompiMapper.updateVisitor(param);

        return ResponseEntity.ok("수정 성공");
    }


    @DeleteMapping("/visitor/delete/{guestBookId}")
    @ResponseBody
    public ResponseEntity<String> deleteVisitor(@PathVariable("guestBookId") Long guestBookId,
                                                HttpSession session) {
        SessionUserDTO loginUser = (SessionUserDTO) session.getAttribute("userData");
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        Map<String, Object> param = new HashMap<>();
        param.put("guestBookId", guestBookId);
        param.put("userId", loginUser.getUserId()); // 혹시 작성자 확인하려면 필요

        int result = minihompiMapper.deleteVisitor(param);

        if (result > 0) {
            return ResponseEntity.ok("삭제 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 실패");
        }
    }

}
