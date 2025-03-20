package com.dev.wannabe.domain.sample.controller;

import com.dev.wannabe.domain.sample.model.SampleCriteria;
import com.dev.wannabe.domain.sample.model.SampleModel;
import com.dev.wannabe.domain.sample.service.SampleService;
import com.dev.wannabe.global.model.CustomPageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/sample")
public class SampleController {

    private final SampleService sampleService;

    @GetMapping("/paging")
    public String samplePage(Model model,
                             @RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "4") int size,
                             @RequestParam(name = "id", required = false) String id,
                             @RequestParam(name = "title", required = false) String title,
                             @RequestParam(name = "content", required = false) String content) {

        SampleCriteria sampleCriteria = new SampleCriteria(id, title, content);
        CustomPageDTO<SampleModel> customPage = sampleService.samplePage(page, size, sampleCriteria);

        // 모델에 추가
        model.addAttribute("sampleBoardPage", customPage);

        return "common/sample/samplePagenation";
    }

    @GetMapping("/about-us")
    public String aboutUs() {
        return "sample/ABOUTUS";
    }

    @GetMapping("/no-login-home")
    public String noLoginHome() {
        return "sample/onlineMain_noLogin";
    }

    @GetMapping("/login-home")
    public String loginHome() {
        return "sample/onlineMain_yesLogin";
    }

    @GetMapping("/home-with-modal")
    public String homeWithModal() {
        return "sample/메인공지사항모달";
    }

    @GetMapping("/find-id-pw")
    public String findIdPw() {
        return "sample/아이디_비번찾기";
    }

    @GetMapping("/sign-in")
    public String signIn() {
        return "sample/회원가입";
    }

    @GetMapping("/mini-hompi")
    public String minihompi() {
        return "sample/main";
    }

    @GetMapping("/main-page")
    public String mainPage() {
        return "home/main";
    }

    /*쪽지창 관련*/
    @GetMapping("/popupMessage")
    public String popupMessage() {
        return "common/popup/popupMessage";
    }

    @GetMapping("/popupSendMessage")
    public String popupSendMessage() {
        return "common/popup/inc/popupSendMessage";
    }

    @GetMapping("/popupReciveMessageBox")
    public String popupReciveMessageBox() {
        return "common/popup/inc/popupReciveMessageBox";
    }

    @GetMapping("/popupSendMessageBox")
    public String popupSendMessageBox() {
        return "common/popup/inc/popupSendMessageBox";
    }
}
