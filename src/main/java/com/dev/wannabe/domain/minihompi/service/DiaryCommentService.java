package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.DiaryCommentMapper;
import com.dev.wannabe.domain.home.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.DiaryCommentFindDTO;
import com.dev.wannabe.domain.minihompi.model.vo.DiaryComment;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiaryCommentService {

    private final DiaryCommentMapper commentMapper;
    private final HompiMapper hompiMapper;
    private final FriendMapper friendMapper;
    @Transactional
    public ResponseEntity<Boolean> saveDiaryComment(Long hompiId, Long diaryId,
                                                    String comment,String availStatus, HttpServletRequest request){
        SessionUserDTO visitUser = (SessionUserDTO) request.getSession().getAttribute("userData");
        if(visitUser == null){
            return ResponseEntity.badRequest().build();
        }
        String visitUserStatus;
        Long ownerUserId = hompiMapper.findUserIdByHompiId(hompiId);
        Long visitUserId = visitUser.getUserId();

        if (ownerUserId.equals(visitUserId)) {
            visitUserStatus = "31";
        } else if (friendMapper.existsByUserIdAndFriendId(ownerUserId, visitUserId)) {
            visitUserStatus = "32";
        } else {
            visitUserStatus = "33"; //전체 공개
        }
        if(availStatus.equals("31")){
            if(!visitUserStatus.equals("31")){
                return ResponseEntity.badRequest().build();
            }
        }else if(availStatus.equals("32")){
            if(visitUserStatus.equals("33")){
                return ResponseEntity.badRequest().build();
            }
        }
        DiaryComment saveComment = DiaryComment.builder()
                .hompiId(hompiId)
                .diaryId(diaryId)
                .diaryCommentContent(comment)
                .insertUserId(visitUserId)
                .build();

        if(commentMapper.saveDiaryComment(saveComment) == 0){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(true);
    }

    public List<DiaryCommentFindDTO> getDiaryComment(Long hompiId, Long diaryId) {
        return commentMapper.findDiaryCommentByDiaryId(hompiId,diaryId);
    }

    @Transactional
    public ResponseEntity<Boolean> deleteDiaryComment(Long commentId) {
        Integer i = commentMapper.deleteDiaryCommentByCommentId(commentId);
        if(i == 0){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(true);
    }
}
