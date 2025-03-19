package com.dev.wannabe.domain.home.service.horoscope;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
public class FortuneService {

    private static final String[] CHENGAN = {"갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"};
    private static final String[] JIJI = {"자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"};

    private static final Map<String, String> CHENGAN_OHAENG = new HashMap<>();
    // 지지 -> 오행 매핑
    private static final Map<String, String> JIJI_OHAENG = new HashMap<>();

    static {
        CHENGAN_OHAENG.put("갑", "목");
        CHENGAN_OHAENG.put("을", "목");
        CHENGAN_OHAENG.put("병", "화");
        CHENGAN_OHAENG.put("정", "화");
        CHENGAN_OHAENG.put("무", "토");
        CHENGAN_OHAENG.put("기", "토");
        CHENGAN_OHAENG.put("경", "금");
        CHENGAN_OHAENG.put("신", "금");
        CHENGAN_OHAENG.put("임", "수");
        CHENGAN_OHAENG.put("계", "수");

        JIJI_OHAENG.put("자", "수");
        JIJI_OHAENG.put("축", "토");
        JIJI_OHAENG.put("인", "목");
        JIJI_OHAENG.put("묘", "목");
        JIJI_OHAENG.put("진", "토");
        JIJI_OHAENG.put("사", "화");
        JIJI_OHAENG.put("오", "화");
        JIJI_OHAENG.put("미", "토");
        JIJI_OHAENG.put("신", "금");
        JIJI_OHAENG.put("유", "금");
        JIJI_OHAENG.put("술", "수");
        JIJI_OHAENG.put("해", "수");
    }
     public String calculateFortuneMessage(LocalDateTime currentDateTime) {
        // 기준 날짜: 1984-02-02 00:00 (갑자 시작)
        LocalDateTime baseDateTime = LocalDateTime.of(1984, 2, 2, 0, 0);
        long totalDays = ChronoUnit.DAYS.between(baseDateTime, currentDateTime);

        // 60갑자 순환에서 인덱스 계산 (간단화한 방식)
        int cycleIndex = (int) (totalDays % 60);
        int stemIndex = cycleIndex % 10;  // 천간 인덱스 (0~9)
        int branchIndex = cycleIndex % 12; // 지지 인덱스 (0~11)

        String stem = CHENGAN[stemIndex];    // 오늘의 천간
        String branch = JIJI[branchIndex];     // 오늘의 지지
        String stemOhaeng = CHENGAN_OHAENG.get(stem); // 천간에 해당하는 오행
        String branchOhaeng = JIJI_OHAENG.get(branch);  // 지지에 해당하는 오행

        // 현재 시간(시)을 사용해 시간 지지를 계산합니다.
        int hour = currentDateTime.getHour();
        int hourBranchIndex = getHourBranchIndex(hour);
        String hourBranch = JIJI[hourBranchIndex];  // 시간 지지
        String hourOhaeng = JIJI_OHAENG.get(hourBranch);

        // 세 가지 오행(천간, 지지, 시간 지지)의 정보를 조합해 간단한 운세 메시지를 결정합니다.
        Map<String, Integer> elementCounts = new HashMap<>();
        incrementCount(elementCounts, stemOhaeng);
        incrementCount(elementCounts, branchOhaeng);
        incrementCount(elementCounts, hourOhaeng);

        return generateFortuneMessage(elementCounts);
    }

    public int getHourBranchIndex(int hour) {
        // 자시: 23시 ~ 00시
        if (hour >= 23 || hour < 1) return 0;
        // 축시: 01시 ~ 02시
        else if (hour >= 1 && hour < 3) return 1;
        else if (hour >= 3 && hour < 5) return 2;
        else if (hour >= 5 && hour < 7) return 3;
        else if (hour >= 7 && hour < 9) return 4;
        else if (hour >= 9 && hour < 11) return 5;
        else if (hour >= 11 && hour < 13) return 6;
        else if (hour >= 13 && hour < 15) return 7;
        else if (hour >= 15 && hour < 17) return 8;
        else if (hour >= 17 && hour < 19) return 9;
        else if (hour >= 19 && hour < 21) return 10;
        else if (hour >= 21 && hour < 23) return 11;
        return 0;
    }

    /**
     * Map에서 특정 키의 카운트를 증가시킵니다.
     */
    private static void incrementCount(Map<String, Integer> map, String key) {
        map.put(key, map.getOrDefault(key, 0) + 1);
    }

    private static String generateFortuneMessage(Map<String, Integer> counts) {
        int wood = counts.getOrDefault("목", 0);
        int fire = counts.getOrDefault("화", 0);
        int earth = counts.getOrDefault("토", 0);
        int metal = counts.getOrDefault("금", 0);
        int water = counts.getOrDefault("수", 0);

        int max = Math.max(Math.max(wood, fire), Math.max(earth, Math.max(metal, water)));

        // 최대값을 가진 오행의 개수를 계산합니다.
        int countMax = 0;
        if (wood == max) countMax++;
        if (fire == max) countMax++;
        if (earth == max) countMax++;
        if (metal == max) countMax++;
        if (water == max) countMax++;

        // 여러 오행이 같은 최대 빈도를 가진다면 조화 메시지를 반환합니다.
        if (countMax > 1) {
            return "오늘은 모든 에너지가 고르게 퍼져, 평온하고 균형 잡힌 하루가 될 것입니다.";
        }

        // 단일 최대값인 경우, 해당 오행에 따른 메시지를 반환합니다.
        if (max == wood) {
            return "오늘은 새로운 아이디어가 샘솟아 도전하고 발전할 기회가 많습니다.";
        } else if (max == fire) {
            return "오늘은 열정과 에너지가 넘쳐, 어떤 일을 추진하기에 아주 좋은 날입니다.";
        } else if (max == earth) {
            return "오늘은 마음이 차분해지고 안정감을 느껴, 신뢰할 수 있는 하루가 될 것입니다.";
        } else if (max == metal) {
            return "오늘은 결단력과 조직력이 돋보여, 중요한 결정이나 계획을 세우기 좋습니다.";
        } else
            return "오늘은 상황에 유연하게 대처하며 지혜롭게 문제를 해결할 수 있습니다.";
    }



}
