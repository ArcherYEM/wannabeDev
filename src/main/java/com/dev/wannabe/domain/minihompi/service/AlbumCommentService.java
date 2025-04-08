package com.dev.wannabe.domain.minihompi.service;

import com.dev.wannabe.domain.minihompi.mapper.AlbumCommentMapper;
import com.dev.wannabe.domain.minihompi.mapper.AlbumMapper;
import com.dev.wannabe.domain.home.mapper.FriendMapper;
import com.dev.wannabe.domain.minihompi.mapper.HompiMapper;
import com.dev.wannabe.domain.minihompi.model.dto.AlbumCommentDTO;
import com.dev.wannabe.domain.minihompi.model.vo.AlbumComment;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumCommentService {

    private final AlbumCommentMapper albumCommentMapper;
    private final FriendMapper friendMapper;
    private final HompiMapper hompiMapper;
    private final AlbumMapper albumMapper;

    @Transactional
    public Integer saveComment(AlbumComment albumComment, String availStatus, HttpSession session){

        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        Long hompiId = albumComment.getHompiId();
        Long ownerId = hompiMapper.findUserIdByHompiId(hompiId);
        Long visitId = userData.getUserId();
        log.info("albumContent: " + albumComment);
        albumComment.setInsertUserId(visitId);
        log.info("albumContent: " + albumComment);
        int commentAuth = 0;
        //availStatus 33 - 작성자만 댓글 달기 가능
        //availStatus 32 - 일촌만 댓글 달기 가능
        //availStatus 31 - 모두 댓글 달기 가능
        //commentAuth 1 - 작성자 (availStatus 33,32,31 댓글 가능)
        //commentAuth 2 - 일촌 (availStatus 32, 31 댓글 가능)
        //commentAuth 3 - 관계 X (availStautus 31 댓글 가능)
        if(ownerId.equals(visitId)){
            commentAuth = 1;
        } else if(friendMapper.existsByUserIdAndFriendId(ownerId, visitId)){
            commentAuth = 2;
        } else {
            commentAuth = 3;
        }

        boolean isAvailable = false;
        switch(availStatus){
            case "33":
                isAvailable = (commentAuth == 1);
                break;
            case "32":
                isAvailable = (commentAuth == 1 || commentAuth == 2);
                break;
            case "31":
                isAvailable = true;
                break;
            default:
                isAvailable = false;
                break;
            }

        if(isAvailable){
            return albumCommentMapper.saveComment(albumComment);
        } else{
            return null;
        }
    }

    public List<AlbumCommentDTO> getComment(Long hompiId, Long albumId){
        List<AlbumCommentDTO> data = albumCommentMapper.getComment(hompiId, albumId);
        log.info("data: " + data);
        return albumCommentMapper.getComment(hompiId, albumId);
    }

    public Integer deleteComment(Long hompiId, Long commentId, HttpSession session){

        log.info("hompiId: " + hompiId);
        log.info("commentId: " + commentId);

        Long insertUserId  = albumCommentMapper.findUserIdByCommentId(commentId); // 댓글 작성자ID
        SessionUserDTO visitUser = (SessionUserDTO) session.getAttribute("userData");

        if(!(insertUserId == visitUser.getUserId())){ // 본인 작성한 댓글 본인이 삭제하는게 아닐 때
            return 0;
        }else if(!(hompiId == visitUser.getHompiId())){  // 홈피 주인이 아닐 때
            return 0;
        }

        return albumCommentMapper.deleteComment(commentId);
    }

    public Integer updateComment(Long hompiId, String comment, Long commentId, HttpSession session){

        Long insertUserId  = albumCommentMapper.findUserIdByCommentId(commentId); // 댓글 작성자ID
        SessionUserDTO visitUser = (SessionUserDTO) session.getAttribute("userData");

        if(!(insertUserId == visitUser.getUserId())){ // 본인 작성한 댓글 본인이 삭제하는게 아닐 때
            return 0;
        }else if(!(hompiId == visitUser.getHompiId())){  // 홈피 주인이 아닐 때
            return 0;
        }

        return albumCommentMapper.updateComment(commentId, comment, visitUser.getUserId());
    }

}
