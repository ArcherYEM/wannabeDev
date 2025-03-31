package com.dev.wannabe.domain.minihompi.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Month;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class MonthDayDTO {

    private List<Integer> days;
    private List<String> dayOfWeeks;
    private Integer month;
}
