
/**
 * NAME 	: COMMON_CODE
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-01
 * DESC 	: 공통코드 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WANNABE_DEV.COMMON_CODE (
                                         CODE_KEY VARCHAR2(100),
                                         CODE_NAME VARCHAR2(100),
                                         CODE_DESC VARCHAR2(2000),
                                         CODE_LENGTH NUMBER(4,0) CHECK (CODE_LENGTH >= 1),
                                         USE_YN VARCHAR2(1) DEFAULT 'Y',
                                         REMARKS VARCHAR2(200),
                                         INSERT_USER_ID VARCHAR2(100),
                                         INSERT_DT DATE DEFAULT SYSDATE,
                                         UPDATE_USER_ID VARCHAR2(100),
                                         UPDATE_DT DATE,
                                         CONSTRAINT COMMON_CODE_PK PRIMARY KEY (CODE_KEY)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WANNABE_DEV.COMMON_CODE IS '공통 코드';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.CODE_KEY IS '공통 코드 키';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.CODE_NAME IS '공통 코드명';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.CODE_DESC IS '공통 코드 설명';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.CODE_LENGTH IS '공통 코드 길이';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.USE_YN IS '사용 여부';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.REMARKS IS '기타';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE.UPDATE_DT IS '수정일시';

/**
 * ==============================================END==============================================
 */




/**
 * NAME 	: COMMON_CODE_DETAIL
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-01
 * DESC 	: 공통코드 상세 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WANNABE_DEV.COMMON_CODE_DETAIL (
                                                CODE_KEY VARCHAR2(100),
                                                CODE_ID VARCHAR2(100),
                                                CODE_NAME VARCHAR2(100),
                                                SORT_SEQ NUMBER DEFAULT 0 CHECK (SORT_SEQ >= 0),
                                                USE_YN VARCHAR2(1) DEFAULT 'Y',
                                                CODE_REF_01 VARCHAR2(100),
                                                CODE_REF_02 VARCHAR2(100),
                                                CODE_REF_03 VARCHAR2(100),
                                                REMARKS VARCHAR2(200),
                                                INSERT_USER_ID VARCHAR2(100),
                                                INSERT_DT DATE DEFAULT SYSDATE,
                                                UPDATE_USER_ID VARCHAR2(100),
                                                UPDATE_DT DATE,
                                                CONSTRAINT NEWTABLE_PK PRIMARY KEY (CODE_KEY,CODE_ID),
                                                CONSTRAINT FK_COMMON_CODE FOREIGN KEY (CODE_KEY) REFERENCES WANNABE_DEV.COMMON_CODE(CODE_KEY)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WANNABE_DEV.COMMON_CODE_DETAIL IS '공통 코드 상세';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.CODE_KEY IS '공통 코드 키';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.CODE_ID IS '상세 코드 ID';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.CODE_NAME IS '상세 코드명';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.SORT_SEQ IS '정렬 순서';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.USE_YN IS '사용 여부';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.CODE_REF_01 IS '코드 참조값 1';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.CODE_REF_02 IS '코드 참조값 2';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.CODE_REF_03 IS '코드 참조값 3';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.REMARKS IS '기타';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WANNABE_DEV.COMMON_CODE_DETAIL.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
 */




/**
 * NAME 	: 더미주석입니다. 다음사람을 위해 남겨주세요. 물론 나만 쓰게 되겠지만..
 * TYPE 	:
 * AUTHOR 	: GGUM
 * DATE 	: YYYY-MM-DD
 * DESC 	:
 * =============================================START=============================================
 */



/**
 * ==============================================END==============================================
 */







/**
 * NAME 	: FN_COMMON_CODE_NAME
 * TYPE 	: FUNCTION
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-01
 * DESC 	: 공통코드명을 불러오는 함수.
 * =============================================START=============================================
 */
CREATE OR REPLACE FUNCTION WANNABE_DEV.FN_COMMON_CODE_NAME(
    p_CODE_KEY VARCHAR2
) RETURN VARCHAR2 IS
    v_CODE_NAME VARCHAR2(100);
BEGIN
    -- PARAMETER NULL CHECK.
    IF p_CODE_KEY IS NULL THEN
        RETURN NULL;
END IF;

    -- SELECT CODE_NAME
SELECT
    A.CODE_NAME
INTO
    v_CODE_NAME
FROM
    WANNABE_DEV.COMMON_CODE A
WHERE 1=1
  AND A.CODE_KEY = p_CODE_KEY
  AND A.USE_YN = 'Y'
;

RETURN v_CODE_NAME;

-- 조회 결과가 없는 경우 또는 기타 오류 발생 시 NULL 반환
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
WHEN OTHERS THEN
        RETURN NULL;
END FN_COMMON_CODE_NAME;
/**
 * ==============================================END==============================================
 */




/**
 * NAME 	: FN_COMMON_CODE_DETAIL_NAME
 * TYPE 	: FUNCTION
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-01
 * DESC 	: 상세 공통코드명을 불러오는 함수.
 * =============================================START=============================================
 */
CREATE OR REPLACE FUNCTION WANNABE_DEV.FN_COMMON_CODE_DETAIL_NAME (
    p_CODE_KEY VARCHAR2,
    p_CODE_ID  VARCHAR2
) RETURN VARCHAR2 IS
    v_CODE_NAME VARCHAR2(100);
BEGIN
    -- PARAMETER NULL CHECK.
    IF p_CODE_KEY IS NULL OR p_CODE_ID IS NULL THEN
        RETURN NULL;
END IF;

    -- SELECT CODE_NAME
SELECT
    B.CODE_NAME
INTO
    v_CODE_NAME
FROM
    WANNABE_DEV.COMMON_CODE A
        INNER JOIN WANNABE_DEV.COMMON_CODE_DETAIL B
                   ON A.CODE_KEY = B.CODE_KEY
WHERE 1=1
  AND A.CODE_KEY = p_CODE_KEY
  AND B.CODE_ID = p_CODE_ID
  AND A.USE_YN = 'Y'
  AND B.USE_YN = 'Y'
;

RETURN v_CODE_NAME;

-- 조회 결과가 없는 경우 또는 기타 오류 발생 시 NULL 반환
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
WHEN OTHERS THEN
        RETURN NULL;
END FN_COMMON_CODE_DETAIL_NAME;
/**
 * ==============================================END==============================================
 */




/**
 * NAME 	: FN_COMMON_CODE_REF
 * TYPE 	: FUNCTION
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-02
 * DESC 	: 상세 공통코드의 부수적인 정보를 불러오는 함수.
 * =============================================START=============================================
 */
CREATE OR REPLACE FUNCTION WANNABE_DEV.FN_COMMON_CODE_REF (
    p_CODE_KEY 	VARCHAR2,
    p_CODE_ID  	VARCHAR2,
    p_REF_NO  	VARCHAR2
) RETURN VARCHAR2 IS
    v_CODE_REF VARCHAR2(100);
BEGIN
    -- PARAMETER NULL CHECK.
    IF p_CODE_KEY IS NULL OR p_CODE_ID IS NULL OR p_REF_NO IS NULL THEN
        RETURN NULL;
END IF;

    -- SELECT CODE_REF
SELECT
    CASE
        WHEN p_REF_NO = '1' THEN B.CODE_REF_01
        WHEN p_REF_NO = '2' THEN B.CODE_REF_02
        WHEN p_REF_NO = '3' THEN B.CODE_REF_03
        ELSE NULL
        END
INTO
    v_CODE_REF
FROM
    WANNABE_DEV.COMMON_CODE A
        INNER JOIN WANNABE_DEV.COMMON_CODE_DETAIL B
                   ON A.CODE_KEY = B.CODE_KEY
WHERE 1=1
  AND A.CODE_KEY = p_CODE_KEY
  AND B.CODE_ID = p_CODE_ID
  AND A.USE_YN = 'Y'
  AND B.USE_YN = 'Y'
;

RETURN v_CODE_REF;

-- 조회 결과가 없는 경우 또는 기타 오류 발생 시 NULL 반환
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
WHEN OTHERS THEN
        RETURN NULL;
END FN_COMMON_CODE_REF;
/**
 * ==============================================END==============================================
 */

