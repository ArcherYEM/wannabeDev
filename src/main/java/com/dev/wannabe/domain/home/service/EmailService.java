package com.dev.wannabe.domain.home.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    public String generateAuthCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 6자리 난수 생성

        return String.valueOf(code);
    }

    public void sendEmail(String toEmail, String authCode) throws MessagingException {

        String subject = "[WannaBeDev] 인증코드입니다.";
        String content = "귀하의 인증 코드는 다음과 같습니다: <strong>" + authCode + "</strong>";

        sendEmailtoClient(toEmail, subject, content);
    }

    public void sendEmailtoClient(String toEmail,String title, String content) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("wannabedevpls@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject(title);
        helper.setText(content, true); // true를 설정해서 HTML을 사용 가능하게 함
        helper.setReplyTo("no-reply@wannabe.com"); // 회신 불가능한 주소 설정
        try {
            emailSender.send(message);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to send email in sendEmail", e);
        }
    }
}
