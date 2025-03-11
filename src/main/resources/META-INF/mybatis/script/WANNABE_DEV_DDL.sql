

/**
 * NAME 	: COMMON_CODE
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-01
 * DESC 	: 공통코드 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.COMMON_CODE (
                                      CODE_KEY VARCHAR2(100),
                                      CODE_NAME VARCHAR2(100),
                                      CODE_DESC VARCHAR2(2000),
                                      CODE_LENGTH NUMBER(4,0) CHECK (CODE_LENGTH >= 1),
                                      USE_YN VARCHAR2(1) DEFAULT 'Y',
                                      REMARKS VARCHAR2(200),
                                      INSERT_USER_ID VARCHAR2(100),
                                      INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                      UPDATE_USER_ID VARCHAR2(100),
                                      UPDATE_DT DATE,
                                      CONSTRAINT COMMON_CODE_PK PRIMARY KEY (CODE_KEY)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.COMMON_CODE IS '공통 코드';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.CODE_KEY IS '공통 코드 키';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.CODE_NAME IS '공통 코드명';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.CODE_DESC IS '공통 코드 설명';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.CODE_LENGTH IS '공통 코드 길이';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.REMARKS IS '기타';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE.UPDATE_DT IS '수정일시';

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
CREATE TABLE WNB_TEST.COMMON_CODE_DETAIL (
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
                                             INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                             UPDATE_USER_ID VARCHAR2(100),
                                             UPDATE_DT DATE,
                                             CONSTRAINT NEWTABLE_PK PRIMARY KEY (CODE_KEY,CODE_ID),
                                             CONSTRAINT FK_COMMON_CODE FOREIGN KEY (CODE_KEY) REFERENCES WNB_TEST.COMMON_CODE(CODE_KEY)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.COMMON_CODE_DETAIL IS '공통 코드 상세';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.CODE_KEY IS '공통 코드 키';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.CODE_ID IS '상세 코드 ID';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.CODE_NAME IS '상세 코드명';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.SORT_SEQ IS '정렬 순서';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.CODE_REF_01 IS '코드 참조값 1';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.CODE_REF_02 IS '코드 참조값 2';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.CODE_REF_03 IS '코드 참조값 3';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.REMARKS IS '기타';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.COMMON_CODE_DETAIL.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
 */


/**
 * NAME 	: WNB_SYSTEM_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: WANNABE 애플리케이션 로그 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.WNB_SYSTEM_LOG (
                                         LOG_ID NUMBER(13, 0),
                                         LOG_TYPE VARCHAR2(3) NOT NULL,
                                         LOG_MESSAGE CLOB ,
                                         ACCESS_IP VARCHAR2(30) NOT NULL,
                                         REMARKS VARCHAR2(500),
                                         INSERT_USER_ID VARCHAR2(40),
                                         INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                         UPDATE_USER_ID VARCHAR2(40),
                                         UPDATE_DT DATE,
                                         CONSTRAINT WNB_SYSTEM_LOG_PK PRIMARY KEY (LOG_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.WNB_SYSTEM_LOG IS 'WANNABE 애플리케이션 로그';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.LOG_ID IS '이력 ID';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.LOG_TYPE IS '이력 타입';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.LOG_MESSAGE IS '이력 메세지';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.ACCESS_IP IS '접근 IP';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.WNB_SYSTEM_LOG.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: LOGIN_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 일촌명 변경 이력 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.LOGIN_LOG (
                                    LOG_ID NUMBER(13, 0),
                                    ACCESS_IP VARCHAR2(30) NOT NULL,
                                    USER_ID VARCHAR2(40) NOT NULL,
                                    LOGIN_DT DATE DEFAULT SYSDATE NOT NULL,
                                    LOGOUT_DT DATE,
                                    REMARKS VARCHAR2(500),
                                    INSERT_USER_ID VARCHAR2(40),
                                    INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                    UPDATE_USER_ID VARCHAR2(40),
                                    UPDATE_DT DATE,
                                    CONSTRAINT LOGIN_LOG_PK PRIMARY KEY (LOG_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.LOGIN_LOG IS '로그인 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.LOG_ID IS '이력 ID';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.ACCESS_IP IS '접근 IP';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.LOGIN_DT IS '로그인 일시';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.LOGOUT_DT IS '로그아웃 일시';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.LOGIN_LOG.UPDATE_DT IS '변경일시';

/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: USER_USED_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 회원 사용 이력 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.USER_USED_LOG (
                                        LOG_ID NUMBER(13, 0),
                                        USER_ID VARCHAR2(40) NOT NULL,
                                        LOG_HTTP_METHOD VARCHAR2(10) NOT NULL,
                                        LOG_URL VARCHAR2(100) NOT NULL,
                                        LOG_MESSAGE CLOB,
                                        ACCESS_IP VARCHAR2(30) NOT NULL,
                                        REMARKS VARCHAR2(500),
                                        INSERT_USER_ID VARCHAR2(40),
                                        INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                        UPDATE_USER_ID VARCHAR2(40),
                                        UPDATE_DT DATE,
                                        CONSTRAINT USER_USED_LOG_PK PRIMARY KEY (LOG_ID)
);

-- 인덱스 추가
CREATE INDEX WNB_TEST.USER_USED_LOG_IDX_01 ON WNB_TEST.USER_USED_LOG(USER_ID);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.USER_USED_LOG IS '회원 사용 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.LOG_ID IS '로그 ID';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.LOG_HTTP_METHOD IS 'HTTP METHOD';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.LOG_URL IS '로그 URL';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.LOG_MESSAGE IS '로그 메세지';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.ACCESS_IP IS '접속 아이피';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.UPDATE_USER_ID IS '변경자 ID' ;
COMMENT ON COLUMN WNB_TEST.USER_USED_LOG.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: ATTACH_FILE_MANAGE
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 첨부 파일 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.ATTACH_FILE_MANAGE (
                                             ATTACH_FILE_ID VARCHAR2(40),
                                             FILE_ORIGIN_NAME VARCHAR2(100) NOT NULL,
                                             FILE_NAME VARCHAR2(100) NOT NULL,
                                             FILE_SIZE NUMBER(13, 0) NOT NULL,
                                             FILE_PATH VARCHAR2(100) NOT NULL,
                                             FILE_EXTENSION VARCHAR2(10) NOT NULL,
                                             REMARKS VARCHAR2(500),
                                             INSERT_USER_ID VARCHAR2(40),
                                             INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                             UPDATE_USER_ID VARCHAR2(40),
                                             UPDATE_DT DATE,
                                             CONSTRAINT ATTACH_FILE_MANAGE_PK PRIMARY KEY (ATTACH_FILE_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.ATTACH_FILE_MANAGE IS '첨부파일';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.ATTACH_FILE_ID IS '첨부 파일 ID';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.FILE_ORIGIN_NAME IS '원본 파일 이름';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.FILE_NAME IS '파일 이름';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.FILE_SIZE IS '파일 크기';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.FILE_PATH IS '파일 경로';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.FILE_EXTENSION IS '파일 확장자';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.ATTACH_FILE_MANAGE.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: USER_BASIC
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 회원 기본 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.USER_BASIC (
                                     USER_ID VARCHAR2(40),
                                     LOGIN_ID VARCHAR2(30) UNIQUE NOT NULL,
                                     EMAIL VARCHAR2(50) UNIQUE,
                                     PHONE_NO VARCHAR2(20) UNIQUE,
                                     PASSWORD VARCHAR2(200),
                                     NAME VARCHAR2(30),
                                     GENDER_CODE VARCHAR2(1),
                                     BIRTH_DATE VARCHAR2(8),
                                     USER_STATUS VARCHAR2(1),
                                     REMARKS VARCHAR2(500),
                                     INSERT_USER_ID VARCHAR2(40),
                                     INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                     UPDATE_USER_ID VARCHAR2(40),
                                     UPDATE_DT DATE,
                                     CONSTRAINT USER_BASIC_PK PRIMARY KEY (USER_ID)
);
-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.USER_BASIC IS '회원 기본';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.USER_BASIC.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.LOGIN_ID IS '로그인 ID';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.EMAIL IS '이메일';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.PHONE_NO IS '폰 번호';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.PASSWORD IS '비밀 번호';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.NAME IS '이름';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.GENDER_CODE IS '성별 코드';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.BIRTH_DATE IS '생년월일';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.USER_STATUS IS '탈퇴유무';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.USER_BASIC.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: USER_DETAIL
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 회원 상세 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.USER_DETAIL (
                                      USER_ID VARCHAR2(40),
                                      FRIEND_MESSAGE_AVAIL_YN VARCHAR2(1),
                                      HOMPI_USE_YN VARCHAR2(1),
                                      CONFIRM_YN_1 VARCHAR2(1),
                                      CONFIRM_YN_2 VARCHAR2(1),
                                      CONFIRM_YN_3 VARCHAR2(1),
                                      REMARKS VARCHAR2(500),
                                      INSERT_USER_ID VARCHAR2(40),
                                      INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                      UPDATE_USER_ID VARCHAR2(40),
                                      UPDATE_DT DATE,
                                      CONSTRAINT USER_DETAIL_PK PRIMARY KEY (USER_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.USER_DETAIL IS '회원 상세';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.USER_ID IS '회원ID';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.FRIEND_MESSAGE_AVAIL_YN IS '일촌 쪽지 허용 여부';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.HOMPI_USE_YN IS '홈피 사용 여부';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.CONFIRM_YN_1 IS '수집동의 여부 1';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.CONFIRM_YN_2 IS '수집동의 여부2';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.CONFIRM_YN_3 IS '수집동의 여부3';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.USER_DETAIL.UPDATE_DT IS '수정일시';


/**
 * ==============================================END==============================================
*/





/**
 * NAME 	: USER_ROLE
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 회원 권한 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.USER_ROLE (
                                    USER_ID VARCHAR2(40),
                                    ROLE_CD VARCHAR2(2),
                                    REMARKS VARCHAR2(500),
                                    INSERT_USER_ID VARCHAR2(40),
                                    INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                    UPDATE_USER_ID VARCHAR2(40),
                                    UPDATE_DT DATE,
                                    CONSTRAINT USER_ROLE_PK PRIMARY KEY (USER_ID, ROLE_CD)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.USER_ROLE IS '회원 권한';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.USER_ROLE.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.USER_ROLE.ROLE_CD IS '권한 코드';
COMMENT ON COLUMN WNB_TEST.USER_ROLE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.USER_ROLE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.USER_ROLE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.USER_ROLE.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.USER_ROLE.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/





/**
 * NAME 	: FRIEND_INFO
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 일촌 정보 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.FRIEND_INFO (
                                      USER_ID VARCHAR2(40),
                                      FRIEND_USER_ID VARCHAR2(40),
                                      USER_NICKNAME VARCHAR2(30) NOT NULL,
                                      FRIEND_USER_NICKNAME VARCHAR2(30) NOT NULL,
                                      REMARKS VARCHAR2(500),
                                      INSERT_USER_ID VARCHAR2(40) NULL,
                                      INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                      UPDATE_USER_ID VARCHAR2(40),
                                      UPDATE_DT DATE,
                                      CONSTRAINT FRIEND_INFO_PK PRIMARY KEY (USER_ID, FRIEND_USER_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.FRIEND_INFO IS '일촌 정보';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.FRIEND_USER_ID IS '일촌 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.USER_NICKNAME IS '나의 일촌명';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.FRIEND_USER_NICKNAME IS '상대 일촌명';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_INFO.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: FRIEND_NAME_CHANGE_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 일촌명 변경 이력 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.FRIEND_NAME_CHANGE_LOG (
                                                 LOG_ID NUMBER(13, 0),
                                                 USER_ID VARCHAR2(40) NOT NULL,
                                                 FRIEND_USER_ID VARCHAR2(40) NOT NULL,
                                                 AVAIL_STATUS VARCHAR2(2) NOT NULL,
                                                 NEW_USER_NICKNAME VARCHAR2(30),
                                                 NEW_FRIEND_NICKNAME VARCHAR2(30),
                                                 OLD_USER_NICKNAME VARCHAR2(30),
                                                 OLD_FRIEND_NICKNAME VARCHAR2(30),
                                                 REMARKS VARCHAR2(500),
                                                 INSERT_USER_ID VARCHAR2(40),
                                                 INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                                 UPDATE_USER_ID VARCHAR2(40),
                                                 UPDATE_DT DATE,
                                                 CONSTRAINT FRIEND_NAME_CHANGE_LOG_PK PRIMARY KEY (LOG_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.FRIEND_NAME_CHANGE_LOG IS '일촌명 변경 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.LOG_ID IS '이력 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.FRIEND_USER_ID IS '일촌 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.AVAIL_STATUS IS '상태';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.NEW_USER_NICKNAME IS '나의 새 일촌명';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.NEW_FRIEND_NICKNAME IS '일촌 새 일촌명';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.OLD_USER_NICKNAME IS '나의 이전 일촌명';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.OLD_FRIEND_NICKNAME IS '일촌 이전 일촌명';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_NAME_CHANGE_LOG.UPDATE_DT IS '변경일시';

/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: FRIEND_MESSAGE
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 쪽지 테이블 생성 스크립트.
 * =============================================START=============================================
 */

CREATE TABLE WNB_TEST.FRIEND_MESSAGE (
                                         MESSAGE_ID NUMBER(13, 0),
                                         USER_ID VARCHAR2(40) NOT NULL,
                                         FRIEND_USER_ID VARCHAR2(40) NOT NULL,
                                         MESSAGE VARCHAR2(2000),
                                         READ_YN VARCHAR2(1),
                                         REMARKS VARCHAR2(500),
                                         INSERT_USER_ID VARCHAR2(40),
                                         INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                         UPDATE_USER_ID VARCHAR2(40),
                                         UPDATE_DT DATE,
                                         CONSTRAINT FRIEND_MESSAGE_PK PRIMARY KEY (MESSAGE_ID)
);

-- 인덱스 추가
CREATE INDEX WNB_TEST.FRIEND_MESSAGE_IDX_01 ON WNB_TEST.FRIEND_MESSAGE(USER_ID);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.FRIEND_MESSAGE IS '쪽지';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.MESSAGE_ID IS '메세지 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.FRIEND_USER_ID IS '일촌 회원 아이디';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.MESSAGE IS '메세지';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.READ_YN IS '읽음 여부';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.FRIEND_MESSAGE.UPDATE_DT IS '변경일시';


/**
 * ==============================================END==============================================
*/





/**
 * NAME 	: USER_CART
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 회원 장바구니 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.USER_CART (
                                    CART_ITEM_ID VARCHAR2(40),
                                    USER_ID VARCHAR2(40) NOT NULL,
                                    ITEM_ID VARCHAR2(40) NOT NULL,
                                    ITEM_TYPE VARCHAR2(2) NOT NULL,
                                    AVAIL_DAY NUMBER(5, 0) NOT NULL,
                                    REMARKS VARCHAR2(500),
                                    INSERT_USER_ID VARCHAR2(40),
                                    INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                    UPDATE_USER_ID VARCHAR2(40),
                                    UPDATE_DT DATE,
                                    CONSTRAINT USER_CART_PK PRIMARY KEY (CART_ITEM_ID)
);

-- 인덱스 추가
CREATE INDEX WNB_TEST.USER_CART_IDX_01 ON WNB_TEST.USER_CART(USER_ID);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.USER_CART IS '회원 장바구니';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.USER_CART.CART_ITEM_ID IS '장바구니 아이템 ID';
COMMENT ON COLUMN WNB_TEST.USER_CART.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.USER_CART.ITEM_ID IS '아이템 ID';
COMMENT ON COLUMN WNB_TEST.USER_CART.ITEM_TYPE IS '아이템 타입';
COMMENT ON COLUMN WNB_TEST.USER_CART.AVAIL_DAY IS '사용 가능 일';
COMMENT ON COLUMN WNB_TEST.USER_CART.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.USER_CART.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.USER_CART.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.USER_CART.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.USER_CART.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: USER_ITEM_INVENTORY
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 회원 아이템 인벤토리 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.USER_ITEM_INVENTORY (
                                              ORDER_ID VARCHAR2(40),
                                              ORDER_DETAIL_ID VARCHAR2(40),
                                              USER_ID VARCHAR2(40) NOT NULL,
                                              ITEM_ID VARCHAR2(40) NOT NULL,
                                              ITEM_TYPE VARCHAR2(1) NOT NULL,
                                              USE_START_DT DATE,
                                              AVAIL_DAY NUMBER(5, 0),
                                              USE_YN VARCHAR2(1),
                                              REMARKS VARCHAR2(500),
                                              INSERT_USER_ID VARCHAR2(40),
                                              INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                              UPDATE_USER_ID VARCHAR2(40),
                                              UPDATE_DT DATE,
                                              CONSTRAINT USER_ITEM_INVENTORY_PK PRIMARY KEY (ORDER_ID, ORDER_DETAIL_ID)
);

-- 인덱스 추가
CREATE INDEX WNB_TEST.USER_ITEM_INVENTORY_IDX_01 ON WNB_TEST.USER_ITEM_INVENTORY(USER_ID);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.USER_ITEM_INVENTORY IS '회원 아이템 인벤토리';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.ORDER_ID IS '주문 ID';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.ORDER_DETAIL_ID IS '주문 상세 ID';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.ITEM_ID IS '아이템 ID';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.ITEM_TYPE IS '아이템 분류';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.USE_START_DT IS '사용 시작 일시';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.AVAIL_DAY IS '사용 가능 일';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.USER_ITEM_INVENTORY.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: RECEIVED_GIFT
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 받은 선물 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.RECEIVED_GIFT (
                                        GIFT_ID NUMBER(13, 0),
                                        ITEM_ID VARCHAR2(40) NOT NULL,
                                        ITEM_TYPE VARCHAR2(1) NOT NULL,
                                        ORDER_ID VARCHAR2(40) NOT NULL,
                                        ORDER_DETAIL_ID VARCHAR2(40) NOT NULL,
                                        USER_ID VARCHAR2(40) NOT NULL,
                                        FROM_USER_ID VARCHAR2(40) NOT NULL,
                                        AVAIL_DAY NUMBER(5, 0) NOT NULL,
                                        REMARKS VARCHAR2(500),
                                        INSERT_USER_ID VARCHAR2(40),
                                        INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                        UPDATE_USER_ID VARCHAR2(40),
                                        UPDATE_DT DATE,
                                        CONSTRAINT RECEIVED_GIFT_PK PRIMARY KEY (GIFT_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.RECEIVED_GIFT IS '받은 선물';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.GIFT_ID IS '선물 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.ITEM_ID IS '아이템 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.ITEM_TYPE IS '아이템 타입';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.ORDER_ID IS '주문 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.ORDER_DETAIL_ID IS '주문 상세 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.FROM_USER_ID IS '보낸 회원 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.AVAIL_DAY IS '사용 가능 일';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.RECEIVED_GIFT.UPDATE_DT IS '변경일시';

/**
 * ==============================================END==============================================
 */



/**
 * NAME 	: HOMPI
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 미니홈피 기본 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI (
                                 HOMPI_ID VARCHAR2(40),
                                 HOMPI_URL VARCHAR2(100),
                                 HOMPI_TITLE VARCHAR2(50),
                                 OWNER_USER_ID VARCHAR2(40) NOT NULL,
                                 REMARKS VARCHAR2(500),
                                 INSERT_USER_ID VARCHAR2(40),
                                 INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                 UPDATE_USER_ID VARCHAR2(40),
                                 UPDATE_DT DATE,
                                 CONSTRAINT HOMPI_PK PRIMARY KEY (HOMPI_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI IS '미니홈피 기본';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI.HOMPI_URL IS '홈피 URL';
COMMENT ON COLUMN WNB_TEST.HOMPI.HOMPI_TITLE IS '홈피 머리글';
COMMENT ON COLUMN WNB_TEST.HOMPI.OWNER_USER_ID IS '오너 회원 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_CONFIG
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 홈피 설정 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_CONFIG (
                                        HOMPI_ID VARCHAR2(40),
                                        HOMPI_CONFIG_CODE VARCHAR2(2) NOT NULL,
                                        HOMPI_CONFIG_CONTENT VARCHAR2(400),
                                        REMARKS VARCHAR2(500),
                                        INSERT_USER_ID VARCHAR2(40),
                                        INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                        UPDATE_USER_ID VARCHAR2(40),
                                        UPDATE_DT DATE,
                                        CONSTRAINT HOMPI_CONFIG_PK PRIMARY KEY (HOMPI_ID)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_CONFIG IS '홈피 설정';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.HOMPI_CONFIG_CODE IS '홈피 설정 코드';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.HOMPI_CONFIG_CONTENT IS '홈피 설정 내용';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_CONFIG.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_MENU
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 미니홈피 메뉴 권한 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_MENU (
                                      HOMPI_ID VARCHAR2(40),
                                      HOMPI_MENU_CODE VARCHAR2(2),
                                      AVAIL_STATUS VARCHAR2(2) NOT NULL,
                                      REMARKS VARCHAR2(500),
                                      INSERT_USER_ID VARCHAR2(40),
                                      INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                      UPDATE_USER_ID VARCHAR2(40),
                                      UPDATE_DT DATE,
                                      CONSTRAINT HOMPI_MENU_PK PRIMARY KEY (HOMPI_ID, HOMPI_MENU_CODE)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_MENU IS '홈피 메뉴';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.HOMPI_MENU_CODE IS '홈피 메뉴 코드';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.AVAIL_STATUS IS '상태';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_MENU.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_FRIEND_COMMENT
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 일촌평 관리 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_FRIEND_COMMENT (
                                                HOMPI_ID VARCHAR2(40),
                                                WRITE_USER_ID VARCHAR2(40),
                                                FRIEND_COMMENTS VARCHAR2(200),
                                                FIXED_YN VARCHAR2(1),
                                                REMARKS VARCHAR2(500),
                                                INSERT_USER_ID VARCHAR2(40),
                                                INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                                UPDATE_USER_ID VARCHAR2(40),
                                                UPDATE_DT DATE,
                                                CONSTRAINT HOMPI_FRIEND_COMMENT_PK PRIMARY KEY (HOMPI_ID, WRITE_USER_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_FRIEND_COMMENT IS '일촌평 관리';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.WRITE_USER_ID IS '글쓴이 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.FRIEND_COMMENTS IS '일촌 코멘트';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.FIXED_YN IS '고정 여부';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_FRIEND_COMMENT.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_DAILY_STATS
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 홈피 일별 통계 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_DAILY_STATS (
                                             HOMPI_ID VARCHAR2(40),
                                             DAY_STATS_DATE VARCHAR2(8),
                                             TODAY_CNT NUMBER(10,0) DEFAULT 0 NOT NULL,
                                             REMARKS VARCHAR2(500),
                                             INSERT_USER_ID VARCHAR2(40),
                                             INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                             UPDATE_USER_ID VARCHAR2(40),
                                             UPDATE_DT DATE,
                                             CONSTRAINT HOMPI_DAILY_STATS_PK PRIMARY KEY (HOMPI_ID, DAY_STATS_DATE)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_DAILY_STATS IS '홈피 일별 통계';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.DAY_STATS_DATE IS '일일 투데이';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.TODAY_CNT IS '투데이 수';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DAILY_STATS.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_DIARY
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 홈피 다이어리 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_DIARY (
                                       HOMPI_ID VARCHAR2(40),
                                       DIARY_ID VARCHAR2(40),
                                       DIARY_NAME VARCHAR2(20),
                                       AVAIL_STATUS VARCHAR2(2) NOT NULL,
                                       REMARKS VARCHAR2(500),
                                       INSERT_USER_ID VARCHAR2(40),
                                       INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                       UPDATE_USER_ID VARCHAR2(40),
                                       UPDATE_DT DATE,
                                       CONSTRAINT HOMPI_DIARY_PK PRIMARY KEY (HOMPI_ID, DIARY_ID)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_DIARY IS '홈피 다이어리';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.DIARY_ID IS '다이어리 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.DIARY_NAME IS '다이어리명';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.AVAIL_STATUS IS '상태';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_DIARY_CONTENT
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 홈피 다이어리 게시글 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_DIARY_CONTENT (
                                               DIARY_ID VARCHAR2(40),
                                               CONTENTS_ID VARCHAR2(40),
                                               DIARY_TITLE VARCHAR2(200),
                                               DIARY_CONTENT CLOB,
                                               REMARKS VARCHAR2(500),
                                               INSERT_USER_ID VARCHAR2(40),
                                               INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                               UPDATE_USER_ID VARCHAR2(40),
                                               UPDATE_DT DATE,
                                               CONSTRAINT HOMPI_DIARY_CONTENT_PK PRIMARY KEY (DIARY_ID, CONTENTS_ID)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_DIARY_CONTENT IS '홈피 다이어리 내용';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.DIARY_ID IS '다이어리 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.CONTENTS_ID IS '다이어리 내용 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.DIARY_TITLE IS '다이어리 제목';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.DIARY_CONTENT IS '다이어리 내용';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_DIARY_CONTENT.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_ALBUM
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 미니홈피 사진첩 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_ALBUM (
                                       HOMPI_ID VARCHAR2(40),
                                       ALBUM_ID VARCHAR2(40),
                                       ALBUM_NAME VARCHAR2(20),
                                       AVAIL_STATUS VARCHAR2(2),
                                       REMARKS VARCHAR2(500),
                                       INSERT_USER_ID VARCHAR2(40),
                                       INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                       UPDATE_USER_ID VARCHAR2(40),
                                       UPDATE_DT DATE,
                                       CONSTRAINT HOMPI_ALBUM_PK PRIMARY KEY (HOMPI_ID, ALBUM_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_ALBUM IS '미니홈피 사진첩';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.ALBUM_ID IS '사진첩 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.ALBUM_NAME IS '사진첩 이름';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.AVAIL_STATUS IS '상태';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_ALBUM_CONTENT
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 미니홈피 사진첩 내용 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_ALBUM_CONTENT (
                                               ALBUM_ID VARCHAR2(40),
                                               CONTENTS_ID VARCHAR2(40),
                                               ALBUM_TITLE VARCHAR2(200) NOT NULL,
                                               ALBUM_CONTENT CLOB NOT NULL,
                                               REMARKS VARCHAR2(500),
                                               INSERT_USER_ID VARCHAR2(40),
                                               INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                               UPDATE_USER_ID VARCHAR2(40),
                                               UPDATE_DT DATE,
                                               CONSTRAINT HOMPI_ALBUM_CONTENT_PK PRIMARY KEY (ALBUM_ID, CONTENTS_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_ALBUM_CONTENT IS '미니홈피 사진첩 내용';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.CONTENTS_ID IS '내용 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.ALBUM_ID IS '사진첩 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.ALBUM_TITLE IS '사진첩 제목';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.ALBUM_CONTENT IS '사진첩 내용';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_ALBUM_CONTENT.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_BOARD
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 미니홈피 게시판 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_BOARD (
                                       HOMPI_ID VARCHAR2(40),
                                       HOMPI_BOARD_ID VARCHAR2(40),
                                       HOMPI_BOARD_TITLE VARCHAR2(200),
                                       HOMPI_BOARD_CONTENT VARCHAR2(50),
                                       REMARKS VARCHAR2(500),
                                       INSERT_USER_ID VARCHAR2(40),
                                       INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                       UPDATE_USER_ID VARCHAR2(40),
                                       UPDATE_DT DATE,
                                       CONSTRAINT HOMPI_BOARD_PK PRIMARY KEY (HOMPI_ID, HOMPI_BOARD_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_BOARD IS '홈피 게시판';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.HOMPI_BOARD_ID IS '게시판 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.HOMPI_BOARD_TITLE IS '게시판 제목';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.HOMPI_BOARD_CONTENT IS '게시판 내용';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: HOMPI_BOARD_ATTACH
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 게시판 첨부 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_BOARD_ATTACH (
                                              HOMPI_BOARD_ID VARCHAR2(40),
                                              HOMPI_BOARD_ATTACH_ID VARCHAR2(40),
                                              ATTACH_FILE_ID VARCHAR2(40) NOT NULL,
                                              USE_YN VARCHAR2(1),
                                              REMARKS VARCHAR2(500),
                                              INSERT_USER_ID VARCHAR2(40),
                                              INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                              UPDATE_USER_ID VARCHAR2(40),
                                              UPDATE_DT DATE,
                                              CONSTRAINT HOMPI_BOARD_ATTACH_PK PRIMARY KEY (HOMPI_BOARD_ID, HOMPI_BOARD_ATTACH_ID)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_BOARD_ATTACH IS '게시판 첨부';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.HOMPI_BOARD_ID IS '게시판 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.HOMPI_BOARD_ATTACH_ID IS '게시판 첨부 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.ATTACH_FILE_ID IS '파일ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.USE_YN  IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_BOARD_ATTACH.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/





/**
 * NAME 	: HOMPI_GUEST_BOOK
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 미니홈피 방명록 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.HOMPI_GUEST_BOOK (
                                            HOMPI_ID VARCHAR2(40),
                                            GUEST_BOOK_ID VARCHAR2(40),
                                            GUEST_BOOK_CONTENT VARCHAR2(2000),
                                            REMARKS VARCHAR2(500),
                                            INSERT_USER_ID VARCHAR2(40),
                                            INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                            UPDATE_USER_ID VARCHAR2(40),
                                            UPDATE_DT DATE,
                                            CONSTRAINT HOMPI_GUEST_BOOK_PK PRIMARY KEY (HOMPI_ID, GUEST_BOOK_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.HOMPI_GUEST_BOOK IS '미니홈피 방명록';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.HOMPI_ID IS '홈피 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.GUEST_BOOK_ID IS '방명록 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.GUEST_BOOK_CONTENT IS '방명록 내용';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.HOMPI_GUEST_BOOK.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: MINIMI_BASIC
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 미니미 기본 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.MINIMI_BASIC (
                                       MINIMI_ID VARCHAR2(40),
                                       USER_ID VARCHAR2(40) NOT NULL,
                                       PRODUCT_ID VARCHAR2(40),
                                       FACE_DIRECTION_CODE VARCHAR2(2),
                                       X_POSITION NUMBER(4,0),
                                       Y_POSITION NUMBER(4,0),
                                       Z_POSITION NUMBER(4,0),
                                       MAIN_YN VARCHAR2(1),
                                       USE_YN VARCHAR(255),
                                       REMARKS VARCHAR2(500),
                                       INSERT_USER_ID VARCHAR2(40),
                                       INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                       UPDATE_USER_ID VARCHAR2(40),
                                       UPDATE_DT DATE,
                                       CONSTRAINT MINIMI_BASIC_PK PRIMARY KEY (MINIMI_ID)
);

-- 인덱스 추가
CREATE INDEX WNB_TEST.MINIMI_BASIC_IDX_01 ON WNB_TEST.MINIMI_BASIC(USER_ID);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.MINIMI_BASIC IS '미니미 기본';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.MINIMI_ID IS '미니미ID';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.PRODUCT_ID IS '상품 ID';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.FACE_DIRECTION_CODE IS '미니미 방향';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.X_POSITION  IS 'x축';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.Y_POSITION  IS 'y축';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.Z_POSITION  IS 'z축';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.MAIN_YN IS '대표 여부';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.USE_YN  IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.MINIMI_BASIC.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: MINIROOM_BASIC
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 미니룸 기본 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.MINIROOM_BASIC (
                                         MINIROOM_ID VARCHAR2(40),
                                         USER_ID VARCHAR2(40) NOT NULL,
                                         PRODUCT_ID VARCHAR2(40) NOT NULL,
                                         REMARKS VARCHAR2(500),
                                         INSERT_USER_ID VARCHAR2(40),
                                         INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                         UPDATE_USER_ID VARCHAR2(40),
                                         UPDATE_DT DATE,
                                         CONSTRAINT MINIROOM_BASIC_PK PRIMARY KEY (MINIROOM_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.MINIROOM_BASIC IS '미니룸 기본';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.MINIROOM_ID IS '미니룸 ID';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.USER_ID IS '회원 ID';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.PRODUCT_ID IS '상품 ID';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.MINIROOM_BASIC.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: PRODUCT
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 상품 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.PRODUCT (
                                  PRODUCT_ID VARCHAR2(40),
                                  PRODUCT_TYPE VARCHAR2(2) NOT NULL,
                                  PRODUCT_NAME VARCHAR2(100),
                                  PRODUCT_DESC VARCHAR2(1000),
                                  USE_YN VARCHAR2(1),
                                  ATTACH_FILE_ID VARCHAR2(40) NOT NULL,
                                  REMARKS VARCHAR2(500),
                                  INSERT_USER_ID VARCHAR2(40),
                                  INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                  UPDATE_USER_ID VARCHAR2(40),
                                  UPDATE_DT DATE,
                                  CONSTRAINT PRODUCT_PK PRIMARY KEY (PRODUCT_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.PRODUCT IS '상품';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.PRODUCT.PRODUCT_ID IS '상품 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT.PRODUCT_TYPE IS '상품 분류';
COMMENT ON COLUMN WNB_TEST.PRODUCT.PRODUCT_NAME IS '상품 이름';
COMMENT ON COLUMN WNB_TEST.PRODUCT.PRODUCT_DESC IS '상품 설명';
COMMENT ON COLUMN WNB_TEST.PRODUCT.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.PRODUCT.ATTACH_FILE_ID IS '첨부파일 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.PRODUCT.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.PRODUCT.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: PRODUCT_PRICE
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 상품 가격 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.PRODUCT_PRICE (
                                        PRODUCT_ID VARCHAR2(40),
                                        AVAIL_DAY NUMBER(5, 0),
                                        PRICE NUMBER(10, 0) NOT NULL,
                                        USE_YN VARCHAR2(1) DEFAULT 'Y' NOT NULL,
                                        REMARKS VARCHAR2(500),
                                        INSERT_USER_ID VARCHAR2(40),
                                        INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                        UPDATE_USER_ID VARCHAR2(40),
                                        UPDATE_DT DATE,
                                        CONSTRAINT PRODUCT_PRICE_PK PRIMARY KEY (PRODUCT_ID, AVAIL_DAY)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.PRODUCT_PRICE IS '상품 가격';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.PRODUCT_ID IS '상품 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.AVAIL_DAY IS '상태';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.PRICE IS '가격';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.PRODUCT_PRICE.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: BGM
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 배경음악 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.BGM (
                              BGM_ID VARCHAR2(40),
                              BGM_LENGTH VARCHAR(10),
                              BGM_NAME VARCHAR2(100),
                              ARTIST VARCHAR2(50),
                              LYRICS VARCHAR2(4000),
                              GENRE_CODE VARCHAR2(3),
                              USE_YN VARCHAR2(1) DEFAULT 'Y' NOT NULL,
                              BGM_FILE_ATTACH_ID VARCHAR2(40) NOT NULL,
                              REMARKS VARCHAR2(500),
                              INSERT_USER_ID VARCHAR2(40),
                              INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                              IMAGE_FILE_ATTACH_ID VARCHAR(40) NOT NULL,
                              UPDATE_USER_ID VARCHAR2(40),
                              UPDATE_DT DATE,
                              CONSTRAINT BGM_PK PRIMARY KEY (BGM_ID)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.BGM IS '배경음악';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.BGM.BGM_ID IS '배경음악 ID';
COMMENT ON COLUMN WNB_TEST.BGM.BGM_FILE_ATTACH_ID IS 'BGM 파일 ID';
COMMENT ON COLUMN WNB_TEST.BGM.IMAGE_FILE_ATTACH_ID IS '이미지 파일 ID';
COMMENT ON COLUMN WNB_TEST.BGM.BGM_NAME IS '배경음악 이름';
COMMENT ON COLUMN WNB_TEST.BGM.ARTIST IS '가수';
COMMENT ON COLUMN WNB_TEST.BGM.LYRICS IS '가사';
COMMENT ON COLUMN WNB_TEST.BGM.GENRE_CODE IS '장르 코드';
COMMENT ON COLUMN WNB_TEST.BGM.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.BGM.BGM_LENGTH IS '노래 길이';
COMMENT ON COLUMN WNB_TEST.BGM.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.BGM.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.BGM.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.BGM.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.BGM.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: BGM_PRICE
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: BGM 가격 테이블 생성 스크립트.
 * =============================================START=============================================
 */

CREATE TABLE WNB_TEST.BGM_PRICE (
                                    BGM_ID VARCHAR2(40),
                                    AVAIL_DAY NUMBER(5, 0),
                                    PRICE NUMBER(10, 0) NOT NULL,
                                    USE_YN VARCHAR2(1),
                                    REMARKS VARCHAR2(500),
                                    INSERT_USER_ID VARCHAR2(40),
                                    INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                    UPDATE_USER_ID VARCHAR2(40),
                                    UPDATE_DT DATE,
                                    CONSTRAINT BGM_PRICE_PK PRIMARY KEY (BGM_ID, AVAIL_DAY)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.BGM_PRICE IS 'BGM 가격';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.BGM_ID IS '배경음악 ID';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.AVAIL_DAY IS '사용 가능 일';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.PRICE IS '가격';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.USE_YN IS '사용 여부';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.BGM_PRICE.UPDATE_DT IS '변경일시';


/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: ORDER_BASIC
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 도토리 운용 이력 테이블 생성 스크립트.
 * =============================================START=============================================
 */

CREATE TABLE WNB_TEST.ORDER_BASIC (
                                      ORDER_ID VARCHAR2(40),
                                      ORDER_TYPE VARCHAR2(1),
                                      ORDER_DESC VARCHAR2(200),
                                      AVAIL_STATUS VARCHAR2(2),
                                      FROM_USER_ID VARCHAR2(40) NOT NULL,
                                      TO_USER_ID VARCHAR2(40),
                                      PRICE NUMBER(10, 0),
                                      USED_ACORN NUMBER(7, 0),
                                      REPAY_ACORN NUMBER(7, 0),
                                      REMARKS VARCHAR2(500),
                                      INSERT_USER_ID VARCHAR2(40),
                                      INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                      UPDATE_USER_ID VARCHAR2(40),
                                      UPDATE_DT DATE,
                                      CONSTRAINT ORDER_BASIC_PK PRIMARY KEY (ORDER_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.ORDER_BASIC IS '도토리 운용 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.ORDER_ID IS '주문 아이디';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.ORDER_TYPE IS '주문 분류';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.ORDER_DESC IS '주문 설명';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.AVAIL_STATUS IS '상태';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.FROM_USER_ID IS '발송 회원 아이디';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.TO_USER_ID IS '수신 회원 아이디';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.PRICE IS '가격';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.USED_ACORN IS '사용 도토리';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.REPAY_ACORN IS '환불 도토리';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.ORDER_BASIC.UPDATE_DT IS '변경일시';

/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: ORDER_DETAIL
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 도토리 운용 상세 이력 테이블 생성 스크립트.
 * =============================================START=============================================
 */

CREATE TABLE WNB_TEST.ORDER_DETAIL (
                                       ORDER_ID VARCHAR2(40),
                                       ORDER_DETAIL_ID VARCHAR2(40),
                                       ITEM_TYPE VARCHAR2(1) NOT NULL,
                                       ITEM_ID VARCHAR2(40) NOT NULL,
                                       AVAIL_STATUS VARCHAR2(2),
                                       PRICE NUMBER(10, 0),
                                       USED_ACORN NUMBER(7, 0),
                                       REPAY_ACORN NUMBER(7, 0),
                                       REMARKS VARCHAR2(500),
                                       INSERT_USER_ID VARCHAR2(40),
                                       INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                       UPDATE_USER_ID VARCHAR2(40),
                                       UPDATE_DT DATE,
                                       CONSTRAINT ORDER_DETAIL_PK PRIMARY KEY (ORDER_ID, ORDER_DETAIL_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.ORDER_DETAIL IS '도토리 운용 상세 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.ORDER_ID IS '주문 아이디 ID';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.ORDER_DETAIL_ID IS '주문 상세 아이디';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.ITEM_TYPE IS '아이템 분류';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.ITEM_ID IS '아이템 아이디';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.AVAIL_STATUS IS '상태';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.PRICE IS '가격';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.USED_ACORN IS '사용 도토리';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.REPAY_ACORN IS '환불 도토리';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.ORDER_DETAIL.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: ACORN_RECHARGE
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 도토리 충전 이력 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.ACORN_RECHARGE (
                                         RECHARGE_ID NUMBER(13, 0),
                                         USER_ID VARCHAR2(40) NOT NULL,
                                         RECHARGE_ACORNS NUMBER(7, 0),
                                         PRE_TOTAL_ACORNS NUMBER(7, 0),
                                         POST_TOTAL_ACORNS NUMBER(7, 0),
                                         REMARKS VARCHAR2(500),
                                         INSERT_USER_ID VARCHAR2(40),
                                         INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                         UPDATE_USER_ID VARCHAR2(40),
                                         UPDATE_DT DATE,
                                         CONSTRAINT ACORN_RECHARGE_PK PRIMARY KEY (RECHARGE_ID)
);

-- 인덱스 추가
CREATE INDEX WNB_TEST.ACORN_RECHARGE_IDX_01 ON WNB_TEST.ACORN_RECHARGE(USER_ID);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.ACORN_RECHARGE IS '도토리 충전 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.RECHARGE_ID IS '충전 ID';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.USER_ID IS '유저ID';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.RECHARGE_ACORNS IS '도토리 충전';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.PRE_TOTAL_ACORNS IS '충전 전 도토리';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.POST_TOTAL_ACORNS IS '충전 후 도토리';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.ACORN_RECHARGE.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: PAYMENT
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 결제 상세 이력 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.PAYMENT (
                                  PAYMENT_ID NUMBER(13, 0),
                                  RECHARGE_ID NUMBER(13, 0) NOT NULL,
                                  PAYMENT_TYPE VARCHAR2(2) NOT NULL,
                                  REMARKS VARCHAR2(500),
                                  INSERT_USER_ID VARCHAR2(40),
                                  INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                  UPDATE_USER_ID VARCHAR2(40),
                                  UPDATE_DT DATE,
                                  CONSTRAINT PAYMENT_PK PRIMARY KEY (PAYMENT_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.PAYMENT IS '결제 상세 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.PAYMENT.PAYMENT_ID IS '결제 ID';
COMMENT ON COLUMN WNB_TEST.PAYMENT.RECHARGE_ID IS '충전 ID';
COMMENT ON COLUMN WNB_TEST.PAYMENT.PAYMENT_TYPE IS '결제 분류';
COMMENT ON COLUMN WNB_TEST.PAYMENT.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.PAYMENT.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.PAYMENT.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.PAYMENT.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.PAYMENT.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: NOTICE
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 공지 및 알림 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.NOTICE (
                                 NOTICE_ID VARCHAR2(40),
                                 NOTICE_TYPE VARCHAR2(2),
                                 NOTICE_TITLE VARCHAR2(200),
                                 NOTICE_CONTENTS CLOB,
                                 STARAT_DATE VARCHAR2(8),
                                 END_DATE VARCHAR2(8),
                                 START_TIME VARCHAR2(4),
                                 END_TIME VARCHAR2(4),
                                 REMARKS VARCHAR2(500),
                                 INSERT_USER_ID VARCHAR2(40),
                                 INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                 UPDATE_USER_ID VARCHAR2(40),
                                 UPDATE_DT DATE,
                                 CONSTRAINT NOTICE_PK PRIMARY KEY (NOTICE_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.NOTICE IS '공지 및 알림';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.NOTICE.NOTICE_ID IS '공지 ID';
COMMENT ON COLUMN WNB_TEST.NOTICE.NOTICE_TYPE IS '알림 종류';
COMMENT ON COLUMN WNB_TEST.NOTICE.NOTICE_TITLE IS '공지 제목';
COMMENT ON COLUMN WNB_TEST.NOTICE.NOTICE_CONTENTS IS '공지 내용';
COMMENT ON COLUMN WNB_TEST.NOTICE.STARAT_DATE IS '시작 일자';
COMMENT ON COLUMN WNB_TEST.NOTICE.END_DATE IS '종료 일자';
COMMENT ON COLUMN WNB_TEST.NOTICE.START_TIME IS '시작 시간';
COMMENT ON COLUMN WNB_TEST.NOTICE.END_TIME IS '종료 시간';
COMMENT ON COLUMN WNB_TEST.NOTICE.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.NOTICE.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.NOTICE.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.NOTICE.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.NOTICE.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: BANNER
 * TYPE 	: TABLE
 * AUTHOR 	: error
 * DATE 	: 2025-03-05
 * DESC 	: 배너 테이블 생성 스크립트
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.BANNER (
                                 BANNER_ID VARCHAR2(40),
                                 ATTACH_FILE_ID VARCHAR2(40) NOT NULL,
                                 LINK_URL VARCHAR2(100),
                                 START_DATE VARCHAR2(8),
                                 END_DATE VARCHAR2(8),
                                 START_TIME VARCHAR2(4),
                                 END_TIME VARCHAR2(4),
                                 REMARKS VARCHAR2(500),
                                 INSERT_USER_ID VARCHAR2(40),
                                 INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                 UPDATE_USER_ID VARCHAR2(40),
                                 UPDATE_DT DATE,
                                 CONSTRAINT BANNER_PK PRIMARY KEY (BANNER_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.BANNER IS '배너';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.BANNER.BANNER_ID IS '배너 ID';
COMMENT ON COLUMN WNB_TEST.BANNER.ATTACH_FILE_ID IS '배너 첨부파일';
COMMENT ON COLUMN WNB_TEST.BANNER.LINK_URL IS '링크 URL';
COMMENT ON COLUMN WNB_TEST.BANNER.START_DATE IS '시작 일자';
COMMENT ON COLUMN WNB_TEST.BANNER.END_DATE IS '종료 일자';
COMMENT ON COLUMN WNB_TEST.BANNER.START_TIME IS '시작 시간';
COMMENT ON COLUMN WNB_TEST.BANNER.END_TIME IS '종료 시간';
COMMENT ON COLUMN WNB_TEST.BANNER.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.BANNER.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.BANNER.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.BANNER.UPDATE_USER_ID IS '수정자 ID';
COMMENT ON COLUMN WNB_TEST.BANNER.UPDATE_DT IS '수정일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: NEWS_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: GGUM
 * DATE 	: 2025-03-05
 * DESC 	: 뉴스 API 이력 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.NEWS_LOG (
                                   LOG_ID NUMBER(13,0),
                                   MESSAGE VARCHAR2(2000),
                                   CONTENTS CLOB,
                                   REMARKS VARCHAR2(500),
                                   INSERT_USER_ID VARCHAR2(40),
                                   INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                   UPDATE_USER_ID VARCHAR2(40),
                                   UPDATE_DT DATE,
                                   CONSTRAINT NEWS_LOG_PK PRIMARY KEY (LOG_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.NEWS_LOG IS '뉴스 API 이력';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.LOG_ID IS '이력 ID';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.MESSAGE IS '메세지';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.CONTENTS IS '내용';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.NEWS_LOG.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: WEATHER_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 날씨 API 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.WEATHER_LOG (
                                      LOG_ID NUMBER(13,0),
                                      MESSAGE VARCHAR2(2000),
                                      CONTENTS CLOB,
                                      REMARKS VARCHAR2(500),
                                      INSERT_USER_ID VARCHAR2(40),
                                      INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                      UPDATE_USER_ID VARCHAR2(40),
                                      UPDATE_DT DATE,
                                      CONSTRAINT WEATHER_LOG_PK PRIMARY KEY (LOG_ID)
);


-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.WEATHER_LOG IS '날씨 API';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.LOG_ID IS '날씨 ID';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.MESSAGE IS '날씨 메세지';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.CONTENTS IS '날씨 내용';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.WEATHER_LOG.UPDATE_DT IS '변경일시';
/**
 * ==============================================END==============================================
*/




/**
 * NAME 	: FORTUNE_TELLING_LOG
 * TYPE 	: TABLE
 * AUTHOR 	: Ah-ah
 * DATE 	: 2025-03-05
 * DESC 	: 운세 API 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE WNB_TEST.FORTUNE_TELLING_LOG (
                                              LOG_ID NUMBER(13,0),
                                              MESSAGE VARCHAR2(2000),
                                              CONTENTS CLOB,
                                              REMARKS VARCHAR2(500),
                                              INSERT_USER_ID VARCHAR2(40),
                                              INSERT_DT DATE DEFAULT SYSDATE NOT NULL,
                                              UPDATE_USER_ID VARCHAR2(40),
                                              UPDATE_DT DATE,
                                              CONSTRAINT FORTUNE_TELLING_LOG_PK PRIMARY KEY (LOG_ID)
);

-- 테이블 코멘트 추가
COMMENT ON TABLE WNB_TEST.FORTUNE_TELLING_LOG IS '운세 API';

-- 컬럼별 코멘트 추가
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.LOG_ID IS '운세 ID';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.MESSAGE IS '운세 메세지';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.CONTENTS IS '운세 내용';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.REMARKS IS '비고';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.INSERT_USER_ID IS '등록자 ID';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.INSERT_DT IS '등록일시';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.UPDATE_USER_ID IS '변경자 ID';
COMMENT ON COLUMN WNB_TEST.FORTUNE_TELLING_LOG.UPDATE_DT IS '변경일시';
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

