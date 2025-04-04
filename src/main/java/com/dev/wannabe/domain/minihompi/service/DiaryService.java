package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.home.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiDiaryMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.HompiDiaryDTO;
import com.dev.wannabe.domain.minihompi.model.dto.MonthDayDTO;
import com.dev.wannabe.domain.minihompi.model.vo.HompiDiary;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryService {

    private final HompiDiaryMapper diaryMapper;
    private final HompiMapper hompiMapper;
    private final FriendMapper friendMapper;
    public MonthDayDTO getMonthDays(){
        LocalDate date = LocalDate.now();
        YearMonth yearMonth = YearMonth.of(date.getYear(), date.getMonth());

        int dayLength = yearMonth.lengthOfMonth();

        List<Integer> days = new ArrayList<>();
        List<String> dayOfWeek = new ArrayList<>();

        for (int day = 1; day <= dayLength; day++) {
            LocalDate dates = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), day);
            days.add(day);
            dayOfWeek.add(dates.getDayOfWeek().name());
        }
        return  MonthDayDTO.builder()
                .days(days)
                .dayOfWeeks(dayOfWeek)
                .month(date.getMonth().getValue())
                .build();
    }

    @Transactional
    public ResponseEntity<Boolean> addDiary(Long hompiId, Long folderId, HttpSession session,
                                            String diaryContent, String availStatus,String diaryTitle){

        SessionUserDTO visitUser = (SessionUserDTO)session.getAttribute("userData");
        if(diaryMapper.findDiaryByDay(LocalDate.now(), hompiId, folderId) != null){
            return ResponseEntity.ok(null);
        }
        if(!visitUser.getHompiId().equals(hompiId)){
            return ResponseEntity.badRequest().build();
        }
        HompiDiary diary = HompiDiary.builder()
                .hompiId(hompiId)
                .diaryContent(diaryContent)
                .availStatus(availStatus)
                .folderId(folderId)
                .diaryName(diaryTitle)
                .build();
        if(diaryMapper.saveDiary(diary) == 0){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(true);
    }

    public HompiDiaryDTO getDiary(Long diaryId, Long hompiId,HttpServletRequest request) {
        SessionUserDTO visitUser = (SessionUserDTO)request.getSession().getAttribute("userData");
        String availStatus;
        if(visitUser == null){
            availStatus = "33";
        }else {
            Long ownerUserId = hompiMapper.findUserIdByHompiId(hompiId);
            Long visitUserId = visitUser.getUserId();

            if (ownerUserId.equals(visitUserId)) {
                availStatus = "31";
            } else if (friendMapper.existsByUserIdAndFriendId(ownerUserId, visitUserId)) {
                availStatus = "32";
            } else {
                availStatus = "33";
            }
        }

        HompiDiaryDTO diaryDTO = HompiDiaryDTO.builder()
                .diaryId(diaryId)
                .hompiId(hompiId)
                .availStatus(availStatus)
                .build();
        return diaryMapper.findDiaryByDiaryDTO(diaryDTO);
    }

    @Transactional
    public Boolean deleteDiary(Long diaryId, Long hompiId, HttpServletRequest request) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        if(userData.getHompiId() != hompiId){
            return false;
        }
        if(diaryMapper.deleteDiary(diaryId,hompiId) == 0){
            return false;
        }
        return true;
    }

    @Transactional
    public Boolean updateDiary(Long diaryId, Long hompiId,String diaryContent,String availStatus,HttpServletRequest request) {
        SessionUserDTO userData = (SessionUserDTO) request.getSession().getAttribute("userData");
        if(userData.getHompiId() != hompiId){
            return false;
        }

        HompiDiaryDTO diaryDTO = HompiDiaryDTO.builder()
                .hompiId(hompiId)
                .diaryId(diaryId)
                .diaryContent(diaryContent)
                .availStatus(availStatus)
                .build();

        if(diaryMapper.updateDiary(diaryDTO) == 0){
            return false;
        }
        return true;
    }

    public HompiDiaryDTO findDiaryByDay(Integer day, Long hompiId, Long folderId) {
        LocalDate now = LocalDate.of(LocalDate.now().getYear(),LocalDate.now().getMonth(),day);
        return diaryMapper.findDiaryByDay(now, hompiId, folderId);
    }

    public ResponseEntity<String> checkCommentStatus(Long hompiId, HttpServletRequest request) {
        SessionUserDTO visitUser = (SessionUserDTO) request.getSession().getAttribute("userData");
        if(visitUser == null){
            return ResponseEntity.ok("34");
        }
        Long userId = visitUser.getUserId();
        Long ownerId = hompiMapper.findUserIdByHompiId(hompiId);
        if(visitUser.getHompiId().equals(hompiId)) {
            return ResponseEntity.ok("31");
        }else if(friendMapper.existsByUserIdAndFriendId(ownerId,userId)){
            return ResponseEntity.ok("32");
        }else{
            return ResponseEntity.ok("33");
        }
    }
}
