package com.dev.wannabe.domain.sample.mapper;

import com.dev.wannabe.domain.sample.model.SampleCriteria;
import com.dev.wannabe.domain.sample.model.SampleModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SampleMapper {
    List<SampleModel> findAllSampleBoard(@Param(value = "page") int page,
                                         @Param(value = "size") int size,
                                         @Param(value = "condition") SampleCriteria condition);

    int countSampleBoard(@Param(value = "condition") SampleCriteria condition);
}
