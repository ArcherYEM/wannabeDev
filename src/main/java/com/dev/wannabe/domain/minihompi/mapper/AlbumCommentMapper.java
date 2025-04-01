package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.dto.AlbumCommentDTO;
import com.dev.wannabe.domain.minihompi.model.vo.AlbumComment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AlbumCommentMapper {

    Integer saveComment(AlbumComment albumComment);

    List<AlbumCommentDTO> getComment(@Param("albumId")Long albumId,
                                     @Param("hompiId")Long hompiId);

    Integer deleteComment(Long commentId);

    Long findUserIdByCommentId(Long commentId);

    Integer updateComment(@Param("commentId") Long commentId,
                       @Param("comment") String comment,
                       @Param("userId") Long userId);
}
