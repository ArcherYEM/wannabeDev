package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HompiBoardDTO {
    private Long hompiBoardId ;
    private Long hompiId ;
    private Long folderId ;
    private String hompiBoardTitle ;
    private String hompiBoardContent ;
    private String remarks ;
    private Long insertUserId ;
    private Date insertDT ;
    private Long updateUserId ;
    private Date updateDT ;
    
    private String name;
}
