package com.dev.wannabe.domain.home.controller;

import com.dev.wannabe.domain.home.model.dto.PopupMessageDTO;
import com.dev.wannabe.domain.home.service.LoginService;

import com.dev.wannabe.domain.home.service.PopupMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@Controller
@RequiredArgsConstructor
@RequestMapping("/popupMessage")
public class PopupMessageController {

    private final LoginService loginService;
    private final PopupMessageService popupMessageService;

    /*쪽지창 관련*/
    @GetMapping("/main")
    public String popupMessage() {
        return "common/popup/popupMessage";
    }

    @GetMapping("/SendMessage")
    public String popupSendMessage() {
        return "common/popup/inc/popupSendMessage";
    }

    @PostMapping("/SendMessageProc")
    public ResponseEntity<String> popupSendMsgProc(HttpServletRequest request) {
        String userId = request.getParameter("userId"); // 쪽지를 보낸이의 userId
        String recipient = request.getParameter("recipient"); // 입력한 쪽지보낼 대상
        String sendMessage = request.getParameter("sendTextArea"); // 입력한 메세지
        /*System.out.println("/SendMessageProc 진입 :: userId ::" + userId);
        System.out.println("/SendMessageProc 진입 :: recipient ::" + recipient);
        System.out.println("/SendMessageProc 진입 :: sendMessage ::" + sendMessage);*/
        List<PopupMessageDTO> popupMessageDTO = popupMessageService.getSendSearchName(userId, recipient); // 체크

        /* System.out.println("/SendMessageProc 진입 :: getFriendUserId ::" + popupMessageDTO.get(0).getFriendUserId());*/
        Map<String,Object> map = new HashMap<>();

        map.put("userId", userId); // 쪽지 보낸 이
        map.put("recipient", String.valueOf(popupMessageDTO.get(0).getFriendUserId())); // 쪽지 받는 이
        map.put("sendMessage", sendMessage); // 보낸쪽지내용
        boolean sendChk = popupMessageService.SendFriendMessage(map);

        System.out.println("/SendMessageProc 진입 :: sendMessage내용 ::" + sendMessage);
        if (sendChk) {
            System.out.println(userId+ " 님 이" + String.valueOf(popupMessageDTO.get(0).getFriendUserId()) + " 에게 메세지 전송 성공");
            return ResponseEntity.ok("쪽지가 정상적으로 전송되었습니다.");
        } else {
            System.out.println(userId+ " 님 이" + String.valueOf(popupMessageDTO.get(0).getFriendUserId()) + " 에게 메세지 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("쪽지 전송에 실패했습니다.");
        }
    }

    @GetMapping("/MessageView")
    public String popupMessageView(HttpServletRequest request, Model model) {
        String messageId = request.getParameter("messageId");
        String type = request.getParameter("type"); // "receive" 또는 "send"
        /*System.out.println(":::::::: MessageView 진입 ::::::");
        System.out.println("messageId :: "+ messageId);
        System.out.println("type :: "+ type);
        System.out.println(":::::::: MessageView 진입끝 ::::::");*/
        List<PopupMessageDTO> msgView;

        if ("send".equals(type)) {
            msgView = popupMessageService.getMsgView(messageId);
        } else {
            msgView = popupMessageService.getMsgView(messageId);
            popupMessageService.messageReadUpdate(messageId); // 받은 메시지만 읽음처리
        }

        if (!msgView.isEmpty()) {
            PopupMessageDTO oneMsg = msgView.get(0);
            String viewMessage = oneMsg.getMessage().replace("<br>", "\r\n");
            oneMsg.setMessage(viewMessage);

            model.addAttribute("msgView", oneMsg);  // 단일 객체로 넣기
            model.addAttribute("type", type);
        }
        return "common/popup/inc/popupMsgView";
    }

    @GetMapping("/SendMessageList")
    public String popupSendMessageList(HttpServletRequest request, Model model) {
        String userId = request.getParameter("userId");
        /*System.out.println("보낸쪽지함userId ::: " +userId);*/
        String offset = request.getParameter("offset");
        /*System.out.println("보낸쪽지함offset ::: " +offset);*/
        String pageSize = request.getParameter("pageSize");
        /*System.out.println("보낸쪽지함pageSize ::: " +pageSize);*/
        List<PopupMessageDTO> popupMessageDTO = popupMessageService.getSendMsglist(userId, offset, pageSize); //전체 보낸메세지 불러오기
        /*System.out.println("보낸쪽지함 ::: " + popupMessageDTO);*/
        for (int i = 0; i < popupMessageDTO.size(); i++) {
            String brMsg = popupMessageDTO.get(i).getMessage().replace("<br>","\r\n");
            popupMessageDTO.get(i).setMessage(brMsg);
        }
        model.addAttribute("msgList", popupMessageDTO);

        int sendMsgCount = popupMessageService.sendMsgCount(userId); //전체 쪽지 갯수
        model.addAttribute("sendMsgCount", sendMsgCount);

        // 페이지네이션을 위한 totalPages 계산
        int totalPages = (int) Math.ceil((double) sendMsgCount / Integer.parseInt(pageSize));
        model.addAttribute("totalPages", totalPages);  // totalPages를 모델에 추가

        return "common/popup/inc/popupSendMessageList";
    }

    @GetMapping("/SendSearchName")
    @ResponseBody
    public List<PopupMessageDTO> popSendMsgSearchName(HttpServletRequest request) {
        String userId = request.getParameter("userId");
        String recipient = request.getParameter("recipient");
        /*System.out.println("userId :: " + userId);
        System.out.println("recipient :: " + recipient);*/
        List<PopupMessageDTO> PopupMessageDTO = popupMessageService.getSendSearchName(userId, recipient);
        /*System.out.println("PopupMessageDTO :: " + PopupMessageDTO);*/
        return PopupMessageDTO;
    }

    @GetMapping("/ReceiveMessageList")
    public String popupMessageList(HttpServletRequest request, Model model) {
        String userId = request.getParameter("userId");
        String offset = request.getParameter("offset");
        String pageSize = request.getParameter("pageSize");
        List<PopupMessageDTO> popupMessageDTO = popupMessageService.getReceiveMsglist(userId, offset, pageSize); //전체 메세지불러오기
        for (int i = 0; i < popupMessageDTO.size(); i++) {
            String brMsg = popupMessageDTO.get(i).getMessage().replace("<br>","\r\n");
            popupMessageDTO.get(i).setMessage(brMsg);
        }
        model.addAttribute("msgList", popupMessageDTO);

        int receiveMsgCount = popupMessageService.receiveMsgCount(userId); //전체 쪽지 갯수
        model.addAttribute("receiveMsgCount", receiveMsgCount);
        int receiveUnreadMsgCount = popupMessageService.receiveUnreadMsgCount(userId); // 안읽은 쪽지 갯수
        model.addAttribute("receiveUnreadMsgCount", receiveUnreadMsgCount);
        // 페이지네이션을 위한 totalPages 계산
        int totalPages = (int) Math.ceil((double) receiveMsgCount / Integer.parseInt(pageSize));
        model.addAttribute("totalPages", totalPages);  // totalPages를 모델에 추가

        return "common/popup/inc/popupReceiveMessageList";
    }

    @GetMapping(value = "/DeleteMessage", produces = "text/plain; charset=UTF-8")
    @ResponseBody
    public ResponseEntity<String> popupDeleteMessage(
            @RequestParam("messageId") List<String> messageId,
            @RequestParam("type") String type) {
        boolean delMsg = true;
        System.out.println("/DeleteMessage 진입 :: type ::" + type);
        if ("receive".equals(type) || "send".equals(type)) {
            delMsg = popupMessageService.msgDelete(messageId.get(0));
            /*System.out.println("/DeleteMessage 진입 :: 단일삭제 messageId ::" + messageId.get(0));*/
        } else {
            /*System.out.println("/DeleteMessage 진입 :: 선택삭제 messageId.size ::" + messageId.size());*/
            for (int i = 0; messageId.size() > i ; i++) {
                delMsg = popupMessageService.msgDelete(messageId.get(i));
               /* System.out.println("/DeleteMessage 진입 :: 선택삭제 messageId.size ::" + messageId.get(i));*/
            }
            /*System.out.println("/DeleteMessage 진입 :: 선택삭제 messageId ::" + messageId);*/
        }


        System.out.println("/DeleteMessage 진입 :: delMsg ::" + delMsg);

        if (delMsg) {
            System.out.println("( messageId : " + messageId + " ) 메세지 삭제 성공");
            return ResponseEntity.ok("쪽지를 삭제 하였습니다.");
        } else {
            System.out.println("( messageId : " + messageId + " ) 메세지 삭제 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("쪽지를 삭제하는 도중 오류가 발생하였습니다.\r\n 다시 시도하여 주세요");
        }

    }

}
