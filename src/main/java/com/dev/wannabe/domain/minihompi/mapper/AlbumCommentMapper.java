package com.dev.wannabe.domain.minihompi.mapper;

import com.dev.wannabe.domain.minihompi.model.vo.AlbumComment;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AlbumCommentMapper {

    Integer saveComment(AlbumComment albumComment);
}
