/**
 * NAME    : COMMON_CODE
 * TYPE    : TABLE
 * AUTHOR    : Ah-ah
 * DATE    : 2025-03-13
 * DESC    : 공통코드 테이블 생성 스크립트.
 * =============================================START=== ==========================================
 */
CREATE TABLE COMMON_CODE (
                             CODE_KEY VARCHAR(100) NOT NULL COMMENT '공통 코드 키',
                             CODE_NAME VARCHAR(100) NOT NULL  COMMENT '공통 코드 이름',
                             CODE_DESC VARCHAR(2000) COMMENT '공통 코드 설명',
                             CODE_LENGTH INT UNSIGNED NOT NULL DEFAULT 1 COMMENT '공통 코드 길이',
                             USE_YN VARCHAR(1) NOT NULL DEFAULT 'Y' COMMENT '사용여부',
                             REMARKS VARCHAR(200) COMMENT '비고',
                             INSERT_USER_ID VARCHAR(100) COMMENT '등록자 아이디',
                             INSERT_DT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
                             UPDATE_USER_ID VARCHAR(100) COMMENT '수정자 아이디',
                             UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일자',
                             CONSTRAINT COMMON_CODE_PK PRIMARY KEY (CODE_KEY)
) COMMENT '공통 코드 기본';
/**
 * ==============================================END==============================================
 */



/**
* NAME     : COMMON_CODE_DETAIL
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-13
* DESC     : 공통코드 상세 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE COMMON_CODE_DETAIL (
                                    CODE_KEY VARCHAR(100) COMMENT '공통 코드 키',
                                    CODE_ID VARCHAR(100) COMMENT '상세 코드 ID',
                                    CODE_NAME VARCHAR(100) COMMENT '상세 코드명',
                                    SORT_SEQ INT COMMENT '정렬 순서',
                                    USE_YN VARCHAR(1) DEFAULT 'Y' COMMENT '사용 여부',
                                    CODE_REF_01 VARCHAR(100) COMMENT '코드 참조값 1',
                                    CODE_REF_02 VARCHAR(100) COMMENT '코드 참조값 2',
                                    CODE_REF_03 VARCHAR(100) COMMENT '코드 참조값 3',
                                    REMARKS VARCHAR(200) COMMENT '기타',
                                    INSERT_USER_ID VARCHAR(100) COMMENT '등록자 ID',
                                    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                    UPDATE_USER_ID VARCHAR(100) COMMENT '수정자 ID',
                                    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                    PRIMARY KEY (CODE_KEY, CODE_ID),
                                    CONSTRAINT FK_COMMON_CODE FOREIGN KEY (CODE_KEY) REFERENCES COMMON_CODE(CODE_KEY)
) COMMENT='공통 코드 상세';
/**
* ==============================================END==============================================
*/



/**
* NAME     : WNB_SYSTEM_LOG
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-13
* DESC     : WANNABE 애플리케이션 로그 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE WNB_SYSTEM_LOG (
                                LOG_ID BIGINT AUTO_INCREMENT COMMENT '이력 ID',
                                LOG_TYPE VARCHAR(3) NOT NULL COMMENT '이력 타입',
                                LOG_MESSAGE TEXT COMMENT '이력 메세지',
                                ACCESS_IP VARCHAR(30) NOT NULL COMMENT '접근 IP',
                                REMARKS VARCHAR(500) COMMENT '비고',
                                INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                PRIMARY KEY (LOG_ID)
) COMMENT='WANNABE 애플리케이션 로그';
/**
* ==============================================END==============================================
*/



/**
* NAME     : LOGIN_LOG
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-13
* DESC     : 일촌명 변경 이력 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE LOGIN_LOG (
                           LOG_ID BIGINT AUTO_INCREMENT COMMENT '이력 ID',
                           ACCESS_IP VARCHAR(30) NOT NULL COMMENT '접근 IP',
                           USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                           LOGIN_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '로그인 일시',
                           LOGOUT_DT DATETIME COMMENT '로그아웃 일시',
                           REMARKS VARCHAR(500) COMMENT '비고',
                           INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                           INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                           UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                           UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                           PRIMARY KEY (LOG_ID)
) COMMENT='로그인 이력';
/**
* ==============================================END==============================================
*/



/**
* NAME     : USER_USED_LOG
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-13
* DESC     : 회원 사용 이력 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE USER_USED_LOG (
                               LOG_ID BIGINT AUTO_INCREMENT COMMENT '로그 ID',
                               USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                               LOG_HTTP_METHOD VARCHAR(10) NOT NULL COMMENT 'HTTP METHOD',
                               LOG_URL VARCHAR(100) NOT NULL COMMENT '로그 URL',
                               LOG_MESSAGE TEXT COMMENT '로그 메세지',
                               ACCESS_IP VARCHAR(30) NOT NULL COMMENT '접속 아이피',
                               REMARKS VARCHAR(500) COMMENT '비고',
                               INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                               INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                               UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                               UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                               PRIMARY KEY (LOG_ID)
) COMMENT='회원 사용 이력';

-- 인덱스 추가
CREATE INDEX USER_USED_LOG_IDX_01 ON USER_USED_LOG(USER_ID);
/**
* ==============================================END==============================================
*/



/**
* NAME     : ATTACH_FILE_MANAGE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 첨부 파일 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE ATTACH_FILE_MANAGE (
                                    ATTACH_FILE_ID BIGINT AUTO_INCREMENT COMMENT '첨부 파일 ID',
                                    FILE_ORIGIN_NAME VARCHAR(100) NOT NULL COMMENT '원본 파일 이름',
                                    FILE_NAME VARCHAR(100) NOT NULL COMMENT '파일 이름',
                                    FILE_SIZE BIGINT NOT NULL COMMENT '파일 크기', -- NUMBER(13, 0) → BIGINT로 변경
                                    FILE_PATH VARCHAR(100) NOT NULL COMMENT '파일 경로',
                                    FILE_EXTENSION VARCHAR(10) NOT NULL COMMENT '파일 확장자',
                                    REMARKS VARCHAR(500) COMMENT '비고',
                                    INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                    UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                                    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                    PRIMARY KEY (ATTACH_FILE_ID)
) COMMENT='첨부파일';
/**
* ==============================================END==============================================
*/



/**
* NAME     : USER_BASIC
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 회원 기본 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE USER_BASIC (
                            USER_ID BIGINT AUTO_INCREMENT COMMENT '회원 ID',
                            LOGIN_ID VARCHAR(30) UNIQUE NOT NULL COMMENT '로그인 ID',
                            EMAIL VARCHAR(50) UNIQUE COMMENT '이메일',
                            PHONE_NO VARCHAR(20) UNIQUE COMMENT '폰 번호',
                            PASSWORD VARCHAR(200) COMMENT '비밀 번호',
                            NAME VARCHAR(30) COMMENT '이름',
                            GENDER_CODE VARCHAR(1) COMMENT '성별 코드',
                            BIRTH_DATE VARCHAR(8) COMMENT '생년월일',
                            USER_STATUS VARCHAR(1) COMMENT '탈퇴유무',
                            REMARKS VARCHAR(500) COMMENT '비고',
                            INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                            INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                            UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                            UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                            PRIMARY KEY (USER_ID)
) COMMENT='회원 기본';

/**
* ==============================================END==============================================
*/



/**
* NAME     : USER_DETAIL
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 회원 상세 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE USER_DETAIL (
                             USER_ID BIGINT COMMENT '회원ID',
                             FRIEND_MESSAGE_AVAIL_YN VARCHAR(1) COMMENT '일촌 쪽지 허용 여부',
                             CONFIRM_YN_1 VARCHAR(1) COMMENT '수집동의 여부 1',
                             CONFIRM_YN_2 VARCHAR(1) COMMENT '수집동의 여부 2',
                             CONFIRM_YN_3 VARCHAR(1) COMMENT '수집동의 여부 3',
                             REMARKS VARCHAR(500) COMMENT '비고',
                             INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                             INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                             UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                             UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                             PRIMARY KEY (USER_ID)
) COMMENT='회원 상세';
/**
* ==============================================END==============================================
*/


/**
* NAME     : USER_ROLE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 회원 권한 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE USER_ROLE (
                           USER_ID BIGINT COMMENT '회원 ID',
                           ROLE_CD VARCHAR(2) COMMENT '권한 코드',
                           REMARKS VARCHAR(500) COMMENT '비고',
                           INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                           INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                           UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                           UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                           PRIMARY KEY (USER_ID, ROLE_CD)
) COMMENT='회원 권한';
/**
* ==============================================END==============================================
*/


/**
* NAME     : FRIEND_INFO
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 일촌 정보 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE FRIEND_INFO (
                             USER_ID BIGINT COMMENT '회원 ID',
                             FRIEND_USER_ID BIGINT COMMENT '일촌 ID',
                             USER_NICKNAME VARCHAR(30) NOT NULL COMMENT '나의 일촌명',
                             FRIEND_USER_NICKNAME VARCHAR(30) NOT NULL COMMENT '상대 일촌명',
                             REMARKS VARCHAR(500) COMMENT '비고',
                             INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                             INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                             UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                             UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                             PRIMARY KEY (USER_ID, FRIEND_USER_ID)
) COMMENT='일촌 정보';
/**
* ==============================================END==============================================
*/



/**
* NAME     : FRIEND_NAME_CHANGE_LOG
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 일촌명 변경 이력 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE FRIEND_NAME_CHANGE_LOG (
                                        LOG_ID BIGINT AUTO_INCREMENT COMMENT '이력 ID',
                                        USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                                        FRIEND_USER_ID BIGINT NOT NULL COMMENT '일촌 ID',
                                        AVAIL_STATUS VARCHAR(2) NOT NULL COMMENT '상태',
                                        NEW_USER_NICKNAME VARCHAR(30) COMMENT '나의 새 일촌명',
                                        NEW_FRIEND_NICKNAME VARCHAR(30) COMMENT '일촌 새 일촌명',
                                        OLD_USER_NICKNAME VARCHAR(30) COMMENT '나의 이전 일촌명',
                                        OLD_FRIEND_NICKNAME VARCHAR(30) COMMENT '일촌 이전 일촌명',
                                        REMARKS VARCHAR(500) COMMENT '비고',
                                        INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                        INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                        UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                        UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                        PRIMARY KEY (LOG_ID)
) COMMENT='일촌명 변경 이력';
/**
* ==============================================END==============================================
*/



/**
* NAME     : FRIEND_MESSAGE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 쪽지 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE FRIEND_MESSAGE (
                                MESSAGE_ID BIGINT AUTO_INCREMENT COMMENT '메세지 ID',
                                USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                                FRIEND_USER_ID BIGINT NOT NULL COMMENT '일촌 회원 아이디',
                                MESSAGE TEXT COMMENT '메세지',
                                READ_YN VARCHAR(1) COMMENT '읽음 여부',
                                REMARKS VARCHAR(500) COMMENT '비고',
                                INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                PRIMARY KEY (MESSAGE_ID)
) COMMENT='쪽지';

CREATE INDEX FRIEND_MESSAGE_IDX_01 ON FRIEND_MESSAGE(USER_ID);
/**
* ==============================================END==============================================
*/


/**
* NAME     : USER_CART
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 회원 장바구니 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE USER_CART (
                           CART_ITEM_ID BIGINT AUTO_INCREMENT COMMENT '장바구니 아이템 ID',
                           USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                           ITEM_ID BIGINT NOT NULL COMMENT '아이템 ID',
                           ITEM_TYPE VARCHAR(2) NOT NULL COMMENT '아이템 타입',
                           AVAIL_DAY INT NOT NULL COMMENT '사용 가능 일',
                           REMARKS VARCHAR(500) COMMENT '비고',
                           INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                           INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                           UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                           UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                           PRIMARY KEY (CART_ITEM_ID)
) COMMENT='회원 장바구니';


CREATE INDEX USER_CART_IDX_01 ON USER_CART(USER_ID);
/**
* ==============================================END==============================================
*/



/**
* NAME     : USER_ITEM_INVENTORY
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 회원 아이템 인벤토리 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE USER_ITEM_INVENTORY (
                                     ORDER_ID BIGINT COMMENT '주문 ID',
                                     ORDER_DETAIL_ID BIGINT COMMENT '주문 상세 ID',
                                     USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                                     ITEM_ID BIGINT NOT NULL COMMENT '아이템 ID',
                                     ITEM_TYPE VARCHAR(1) NOT NULL COMMENT '아이템 분류',
                                     USE_START_DT DATETIME COMMENT '사용 시작 일시',
                                     AVAIL_DAY INT COMMENT '사용 가능 일',
                                     USE_YN VARCHAR(1) COMMENT '사용 여부',
                                     REMARKS VARCHAR(500) COMMENT '비고',
                                     INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                     INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                     UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                                     UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                     PRIMARY KEY (ORDER_ID, ORDER_DETAIL_ID)
) COMMENT='회원 아이템 인벤토리';
CREATE INDEX USER_ITEM_INVENTORY_IDX_01 ON USER_ITEM_INVENTORY(USER_ID);
/**
* ==============================================END==============================================
*/


/**
* NAME     : RECEIVED_GIFT
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 받은 선물 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE RECEIVED_GIFT (
                               GIFT_ID BIGINT AUTO_INCREMENT COMMENT '선물 ID',
                               ITEM_ID BIGINT NOT NULL COMMENT '아이템 ID',
                               ITEM_TYPE VARCHAR(1) NOT NULL COMMENT '아이템 타입',
                               ORDER_ID BIGINT NOT NULL COMMENT '주문 ID',
                               ORDER_DETAIL_ID BIGINT NOT NULL COMMENT '주문 상세 ID',
                               USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                               FROM_USER_ID BIGINT NOT NULL COMMENT '보낸 회원 ID',
                               AVAIL_DAY INT NOT NULL COMMENT '사용 가능 일',
                               REMARKS VARCHAR(500) COMMENT '비고',
                               INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                               INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                               UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                               UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                               PRIMARY KEY (GIFT_ID)
) COMMENT='받은 선물';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 미니홈피 기본 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI (
                       HOMPI_ID BIGINT AUTO_INCREMENT COMMENT '홈피 ID',
                       HOMPI_URL VARCHAR(100) COMMENT '홈피 URL',
                       HOMPI_TITLE VARCHAR(50) COMMENT '홈피 머리글',
                       OWNER_USER_ID BIGINT NOT NULL COMMENT '오너 회원 ID',
                       REMARKS VARCHAR(500) COMMENT '비고',
                       INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                       INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                       UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                       UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                       PRIMARY KEY (HOMPI_ID)
) COMMENT='미니홈피 기본';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_CONFIG
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 홈피 설정 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_CONFIG (
                              HOMPI_ID BIGINT COMMENT '홈피 ID',
                              HOMPI_CONFIG_CODE VARCHAR(2) NOT NULL COMMENT '홈피 설정 코드',
                              HOMPI_CONFIG_CONTENT VARCHAR(400) COMMENT '홈피 설정 내용',
                              REMARKS VARCHAR(500) COMMENT '비고',
                              INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                              INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                              UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                              UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                              PRIMARY KEY (HOMPI_ID, HOMPI_CONFIG_CODE)
) COMMENT='홈피 설정';
/**
* ==============================================END==============================================
*/

/**
* NAME     : HOMPI_MENU
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 미니홈피 메뉴 권한 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_MENU (
                            HOMPI_ID BIGINT COMMENT '홈피 ID',
                            HOMPI_MENU_CODE VARCHAR(2) COMMENT '홈피 메뉴 코드',
                            AVAIL_STATUS VARCHAR(2) NOT NULL COMMENT '상태',
                            REMARKS VARCHAR(500) COMMENT '비고',
                            INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                            INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                            UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                            UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                            PRIMARY KEY (HOMPI_ID, HOMPI_MENU_CODE)
) COMMENT='홈피 메뉴';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_FRIEND_COMMENT
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 일촌평 관리 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE HOMPI_FRIEND_COMMENT (
                                      HOMPI_ID BIGINT COMMENT '홈피 ID',
                                      WRITE_USER_ID BIGINT COMMENT '글쓴이 ID',
                                      FRIEND_COMMENTS VARCHAR(200) COMMENT '일촌 코멘트',
                                      FIXED_YN VARCHAR(1) COMMENT '고정 여부',
                                      REMARKS VARCHAR(500) COMMENT '비고',
                                      INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                      INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                      UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                                      UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                      PRIMARY KEY (HOMPI_ID, WRITE_USER_ID)
) COMMENT='일촌평 관리';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_DAILY_STATS
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 홈피 일별 통계 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE HOMPI_DAILY_STATS (
                                   HOMPI_ID BIGINT COMMENT '홈피 ID',
                                   DAY_STATS_DATE VARCHAR(8) COMMENT '일일 투데이',
                                   TODAY_CNT INT DEFAULT 0 NOT NULL COMMENT '투데이 수',
                                   REMARKS VARCHAR(500) COMMENT '비고',
                                   INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                   INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                   UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                                   UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                   PRIMARY KEY (HOMPI_ID, DAY_STATS_DATE)
) COMMENT='홈피 일별 통계';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_DIARY
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-24
* DESC     : 홈피 다이어리 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_DIARY (
    DIARY_ID BIGINT AUTO_INCREMENT COMMENT '다이어리 ID',
    DIARY_NAME VARCHAR(20) COMMENT '다이어리명',
    HOMPI_ID BIGINT COMMENT '홈피 ID',
    FOLDER_ID BIGINT COMMENT '폴더 ID',
    AVAIL_STATUS VARCHAR(2) NOT NULL COMMENT '상태',
    REMARKS VARCHAR(500) COMMENT '비고',
    INSERT_USER_ID BIGINT COMMENT '등록자 ID',
    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
    UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
    PRIMARY KEY (DIARY_ID)
) COMMENT='홈피 다이어리';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_DIARY_CONTENT
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 홈피 다이어리 게시글 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_DIARY_CONTENT (
                                     CONTENTS_ID BIGINT AUTO_INCREMENT COMMENT '다이어리 내용 ID',
                                     DIARY_ID BIGINT COMMENT '다이어리 ID',
                                     DIARY_TITLE VARCHAR(200) COMMENT '다이어리 제목',
                                     DIARY_CONTENT TEXT COMMENT '다이어리 내용',
                                     REMARKS VARCHAR(500) COMMENT '비고',
                                     INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                     INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                     UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                     UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                     PRIMARY KEY (CONTENTS_ID)
) COMMENT='홈피 다이어리 내용';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_ALBUM
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-24
* DESC     : 미니홈피 사진첩 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_ALBUM (
    ALBUM_ID BIGINT AUTO_INCREMENT COMMENT '사진첩 ID',
    HOMPI_ID BIGINT COMMENT '홈피 ID',
    FOLDER_ID BIGINT COMMENT '폴더 ID',
    ALBUM_NAME VARCHAR(20) COMMENT '사진첩 이름',
    AVAIL_STATUS VARCHAR(2) COMMENT '상태',
    REMARKS VARCHAR(500) COMMENT '비고',
    INSERT_USER_ID BIGINT COMMENT '등록자 ID',
    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
    UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
    PRIMARY KEY (ALBUM_ID)
) COMMENT='미니홈피 사진첩';
/**
* ==============================================END==============================================
*/



/**
* NAME     : HOMPI_ALBUM_CONTENT
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 미니홈피 사진첩 내용 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_ALBUM_CONTENT (
                                     CONTENTS_ID BIGINT AUTO_INCREMENT COMMENT '내용 ID',
                                     ALBUM_ID BIGINT COMMENT '사진첩 ID',
                                     ALBUM_TITLE VARCHAR(200) NOT NULL COMMENT '사진첩 제목',
                                     ALBUM_CONTENT TEXT NOT NULL COMMENT '사진첩 내용',
                                     REMARKS VARCHAR(500) COMMENT '비고',
                                     INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                     INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                     UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                     UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                     PRIMARY KEY (CONTENTS_ID)
) COMMENT='미니홈피 사진첩 내용';
/**
* ==============================================END==============================================
*/


/**
* NAME     : HOMPI_BOARD
* TYPE     : TABLE
* AUTHOR   : Ah-ah
* DATE     : 2025-03-24
* DESC     : 미니홈피 게시판 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE HOMPI_BOARD (
    HOMPI_BOARD_ID BIGINT AUTO_INCREMENT COMMENT '게시판 ID',
    HOMPI_ID BIGINT COMMENT '홈피 ID',
    FOLDER_ID BIGINT COMMENT '폴더 ID',
    HOMPI_BOARD_TITLE VARCHAR(200) COMMENT '게시판 제목',
    HOMPI_BOARD_CONTENT VARCHAR(50) COMMENT '게시판 내용',
    REMARKS VARCHAR(500) COMMENT '비고',
    INSERT_USER_ID BIGINT COMMENT '등록자 ID',
    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
    UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
    PRIMARY KEY (HOMPI_BOARD_ID)
) COMMENT='홈피 게시판';
/**
* ==============================================END==============================================
*/

/**
* NAME     : HOMPI_BOARD_ATTACH
* TYPE     : TABLE
* AUTHOR   : error
* DATE     : 2025-03-05
* DESC     : 게시판 첨부 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE HOMPI_BOARD_ATTACH (
                                    HOMPI_BOARD_ATTACH_ID BIGINT AUTO_INCREMENT COMMENT '게시판 첨부 ID',
                                    HOMPI_BOARD_ID BIGINT COMMENT '게시판 ID',
                                    ATTACH_FILE_ID BIGINT NOT NULL COMMENT '파일 ID',
                                    USE_YN VARCHAR(1) COMMENT '사용 여부',
                                    REMARKS VARCHAR(500) COMMENT '비고',
                                    INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                    UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                                    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                    PRIMARY KEY (HOMPI_BOARD_ATTACH_ID)
) COMMENT='게시판 첨부';
/**
* ==============================================END==============================================
*/

/**
 * NAME     : HOMPI_FOLDER
 * TYPE     : TABLE
 * AUTHOR   : Ah-ah
 * DATE     : 2025-03-24
 * DESC     : 미니홈피 폴더 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE HOMPI_FOLDER (
                              HOMPI_ID BIGINT COMMENT '홈피 ID',
                              FOLDER_ID BIGINT AUTO_INCREMENT UNIQUE COMMENT '폴더 ID',
                              FOLDER_NAME VARCHAR(500) COMMENT '폴더 이름',
                              CONTENTS_TYPE VARCHAR(2) COMMENT '콘텐츠 종류',
                              REMARKS VARCHAR(500) COMMENT '비고',
                              INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                              INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                              UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                              UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                              PRIMARY KEY (HOMPI_ID, FOLDER_ID)
) COMMENT='홈피 폴더';
/**
* ==============================================END==============================================
*/

/**
 * NAME     : HOMPI_GUEST_BOOK
 * TYPE     : TABLE
 * AUTHOR   : ERROR
 * DATE     : 2025-03-13
 * DESC     : 미니홈피 방명록 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE HOMPI_GUEST_BOOK (
                                  GUEST_BOOK_ID BIGINT AUTO_INCREMENT COMMENT '방명록 ID',
                                  HOMPI_ID BIGINT COMMENT '홈피 ID',
                                  GUEST_BOOK_CONTENT TEXT COMMENT '방명록 내용',
                                  REMARKS VARCHAR(500) COMMENT '비고',
                                  INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                  INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                  UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                  UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                  PRIMARY KEY (GUEST_BOOK_ID)
) COMMENT='미니홈피 방명록';


/**
 * ==============================================END==============================================
*/


/**
* NAME     : MINIMI_BASIC
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 미니미 기본 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE MINIMI_BASIC (
                              MINIMI_ID BIGINT AUTO_INCREMENT COMMENT '미니미ID',
                              USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                              PRODUCT_ID BIGINT COMMENT '상품 ID',
                              FACE_DIRECTION_CODE VARCHAR(2) COMMENT '미니미 방향',
                              X_POSITION FLOAT COMMENT 'x축',
                              Y_POSITION FLOAT COMMENT 'y축',
                              Z_POSITION FLOAT COMMENT 'z축',
                              MAIN_YN VARCHAR(1) COMMENT '대표 여부',
                              USE_YN VARCHAR(255) COMMENT '사용 여부',
                              REMARKS VARCHAR(500) COMMENT '비고',
                              INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                              INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                              UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                              UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                              PRIMARY KEY (MINIMI_ID)
) COMMENT='미니미 기본';




CREATE INDEX MINIMI_BASIC_IDX_01 ON MINIMI_BASIC(USER_ID);
/**
* ==============================================END==============================================
*/




/**
* NAME     : MINIROOM_BASIC
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 미니룸 기본 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE MINIROOM_BASIC (
                                MINIROOM_ID BIGINT AUTO_INCREMENT COMMENT '미니룸 ID',
                                USER_ID BIGINT NOT NULL COMMENT '회원 ID',
                                PRODUCT_ID BIGINT NOT NULL COMMENT '상품 ID',
                                REMARKS VARCHAR(500) COMMENT '비고',
                                INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                PRIMARY KEY (MINIROOM_ID)
) COMMENT='미니룸 기본';
/**
* ==============================================END==============================================
*/




/**
* NAME     : PRODUCT
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 상품 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE PRODUCT (
                         PRODUCT_ID BIGINT AUTO_INCREMENT COMMENT '상품 ID',
                         PRODUCT_TYPE VARCHAR(2) NOT NULL COMMENT '상품 분류',
                         PRODUCT_NAME VARCHAR(100) COMMENT '상품 이름',
                         PRODUCT_DESC TEXT COMMENT '상품 설명',
                         USE_YN VARCHAR(1) COMMENT '사용 여부',
                         ATTACH_FILE_ID BIGINT NOT NULL COMMENT '첨부파일 ID',
                         REMARKS VARCHAR(500) COMMENT '비고',
                         INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                         INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                         UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                         UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                         PRIMARY KEY (PRODUCT_ID)
) COMMENT='상품';
/**
* ==============================================END==============================================
*/




/**
* NAME     : PRODUCT_PRICE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 상품 가격 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE PRODUCT_PRICE (
                               PRODUCT_ID BIGINT COMMENT '상품 ID',
                               AVAIL_DAY INT COMMENT '상태 (사용 가능 일)',
                               PRICE DECIMAL(10, 0) NOT NULL COMMENT '가격',
                               USE_YN VARCHAR(1) DEFAULT 'Y' NOT NULL COMMENT '사용 여부',
                               REMARKS VARCHAR(500) COMMENT '비고',
                               INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                               INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                               UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                               UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                               PRIMARY KEY (PRODUCT_ID, AVAIL_DAY)
) COMMENT='상품 가격';
/**
* ==============================================END==============================================
*/




/**
* NAME     : BGM
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 배경음악 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE BGM (
                     BGM_ID BIGINT AUTO_INCREMENT COMMENT '배경음악 ID',
                     BGM_LENGTH VARCHAR(10) COMMENT '노래 길이',
                     BGM_NAME VARCHAR(100) COMMENT '배경음악 이름',
                     ARTIST VARCHAR(50) COMMENT '가수',
                     LYRICS TEXT COMMENT '가사',
                     GENRE_CODE VARCHAR(3) COMMENT '장르 코드',
                     USE_YN VARCHAR(1) DEFAULT 'Y' NOT NULL COMMENT '사용 여부',
                     BGM_FILE_ATTACH_ID BIGINT NOT NULL COMMENT 'BGM 파일 ID',
                     REMARKS VARCHAR(500) COMMENT '비고',
                     INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                     INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                     IMAGE_FILE_ATTACH_ID BIGINT NOT NULL COMMENT '이미지 파일 ID',
                     UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                     UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                     PRIMARY KEY (BGM_ID)
) COMMENT='배경음악';
/**
* ==============================================END==============================================
*/






/**
* NAME     : BGM_PRICE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : BGM 가격 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE BGM_PRICE (
                           BGM_ID BIGINT COMMENT '배경음악 ID',
                           AVAIL_DAY INT COMMENT '사용 가능 일',
                           PRICE DECIMAL(10, 0) NOT NULL COMMENT '가격',
                           USE_YN VARCHAR(1) COMMENT '사용 여부',
                           REMARKS VARCHAR(500) COMMENT '비고',
                           INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                           INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                           UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                           UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                           PRIMARY KEY (BGM_ID, AVAIL_DAY)
) COMMENT='BGM 가격';
/**
* ==============================================END==============================================
*/






/**
 * NAME     : ITEM
 * TYPE     : TABLE
 * AUTHOR   : ERROR
 * DATE     : 2025-03-13
 * DESC     : 상품(아이템) 테이블 생성 스크립트.
 * =============================================START=============================================
 */
CREATE TABLE ITEM (
                      ITEM_ID BIGINT NOT NULL COMMENT '상품ID',
                      THUMBNAIL_FILE_ID VARCHAR(40)   NOT NULL COMMENT '썸네일 파일 ID',
                      ATTACH_FILE_ID BIGINT NOT NULL COMMENT '첨부파일 ID',
                      ITEM_TYPE VARCHAR(40)   COMMENT '상품 종류',
                      ITEM_CATEGORY VARCHAR(2)    COMMENT '상품 카테고리',
                      ITEM_NAME VARCHAR(100) COMMENT '상품 이름',
                      ITEM_WRITER VARCHAR(50) COMMENT '상품 저자',
                      ITEM_BASIC_DESC VARCHAR(1000)   COMMENT '상품 기본 설명',
                      ITEM_DETAIL_DESC TEXT COMMENT '상품 상세설명',
                      USE_YN VARCHAR(1) COMMENT '사용 여부',
                      REMARKS VARCHAR(500) COMMENT '비고',
                      INSERT_USER_ID BIGINT COMMENT '등록자 아이디',
                      INSERT_DT   DATETIME COMMENT '등록 일시',
                      UPDATE_USER_ID BIGINT COMMENT '수정자 아이디',
                      UPDATE_DT   DATETIME COMMENT '수정 일시'
) COMMENT='상품';


/**
 * ==============================================END==============================================
*/






/**
* NAME     : ORDER_BASIC
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 도토리 운용 이력 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE ORDER_BASIC (
                             ORDER_ID BIGINT AUTO_INCREMENT COMMENT '주문 아이디',
                             ORDER_TYPE VARCHAR(1) COMMENT '주문 분류',
                             ORDER_DESC VARCHAR(200) COMMENT '주문 설명',
                             AVAIL_STATUS VARCHAR(2) COMMENT '상태',
                             FROM_USER_ID BIGINT NOT NULL COMMENT '발송 회원 아이디',
                             TO_USER_ID BIGINT COMMENT '수신 회원 아이디',
                             PRICE DECIMAL(10, 0) COMMENT '가격',
                             USED_ACORN INT COMMENT '사용 도토리',
                             REPAY_ACORN INT COMMENT '환불 도토리',
                             REMARKS VARCHAR(500) COMMENT '비고',
                             INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                             INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',     UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                             UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                             PRIMARY KEY (ORDER_ID)
) COMMENT='도토리 운용 이력';
/**
* ==============================================END==============================================
*/




/**
* NAME     : ORDER_DETAIL
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 도토리 운용 상세 이력 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE ORDER_DETAIL (
                              ORDER_ID BIGINT COMMENT '주문 아이디 ID',
                              ORDER_DETAIL_ID BIGINT COMMENT '주문 상세 아이디',
                              ITEM_TYPE VARCHAR(1) NOT NULL COMMENT '아이템 분류',
                              ITEM_ID BIGINT NOT NULL COMMENT '아이템 아이디',
                              AVAIL_STATUS VARCHAR(2) COMMENT '상태',
                              PRICE DECIMAL(10, 0) COMMENT '가격',
                              USED_ACORN INT COMMENT '사용 도토리',
                              REPAY_ACORN INT COMMENT '환불 도토리',
                              REMARKS VARCHAR(500) COMMENT '비고',
                              INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                              INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',     UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                              UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                              PRIMARY KEY (ORDER_ID, ORDER_DETAIL_ID)
) COMMENT='도토리 운용 상세 이력';
/**
* ==============================================END==============================================
*/




/**
* NAME     : ACORN_RECHARGE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 도토리 충전 이력 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE ACORN_RECHARGE (
                                RECHARGE_ID BIGINT AUTO_INCREMENT COMMENT '충전 ID',
                                USER_ID BIGINT NOT NULL COMMENT '유저ID',
                                RECHARGE_ACORNS INT COMMENT '도토리 충전',
                                PRE_TOTAL_ACORNS INT COMMENT '충전 전 도토리',
                                POST_TOTAL_ACORNS INT COMMENT '충전 후 도토리',
                                REMARKS VARCHAR(500) COMMENT '비고',
                                INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',     UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                                UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                                PRIMARY KEY (RECHARGE_ID)
) COMMENT='도토리 충전 이력';




-- 인덱스 추가
CREATE INDEX ACORN_RECHARGE_IDX_01 ON ACORN_RECHARGE(USER_ID);
/**
* ==============================================END==============================================
*/




/**
* NAME     : PAYMENT
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 결제 상세 이력 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE PAYMENT (
                         PAYMENT_ID BIGINT AUTO_INCREMENT COMMENT '결제 ID',
                         RECHARGE_ID BIGINT NOT NULL COMMENT '충전 ID',
                         PAYMENT_TYPE VARCHAR(2) NOT NULL COMMENT '결제 분류',
                         REMARKS VARCHAR(500) COMMENT '비고',
                         INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                         INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',     UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                         UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                         PRIMARY KEY (PAYMENT_ID)
) COMMENT='결제 상세 이력';
/**
* ==============================================END==============================================
*/




/**
* NAME     : NOTICE
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 공지 및 알림 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE NOTICE (
                        NOTICE_ID BIGINT AUTO_INCREMENT COMMENT '공지 ID',
                        NOTICE_TYPE VARCHAR(2) COMMENT '알림 종류',
                        NOTICE_TITLE VARCHAR(200) COMMENT '공지 제목',
                        NOTICE_CONTENTS TEXT COMMENT '공지 내용',
                        START_DATE VARCHAR(8) COMMENT '시작 일자',
                        END_DATE VARCHAR(8) COMMENT '종료 일자',
                        START_TIME VARCHAR(4) COMMENT '시작 시간',
                        END_TIME VARCHAR(4) COMMENT '종료 시간',
                        REMARKS VARCHAR(500) COMMENT '비고',
                        INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                        INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',     UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                        UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                        PRIMARY KEY (NOTICE_ID)
) COMMENT='공지 및 알림';
/**
* ==============================================END==============================================
*/




/**
* NAME     : BANNER
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 배너 테이블 생성 스크립트
* =============================================START=============================================
*/
CREATE TABLE BANNER (
                        BANNER_ID BIGINT AUTO_INCREMENT COMMENT '배너 ID',
                        ATTACH_FILE_ID BIGINT NOT NULL COMMENT '배너 첨부파일',
                        LINK_URL VARCHAR(100) COMMENT '링크 URL',
                        START_DATE VARCHAR(8) COMMENT '시작 일자',
                        END_DATE VARCHAR(8) COMMENT '종료 일자',
                        START_TIME VARCHAR(4) COMMENT '시작 시간',
                        END_TIME VARCHAR(4) COMMENT '종료 시간',
                        REMARKS VARCHAR(500) COMMENT '비고',
                        INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                        INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',     UPDATE_USER_ID BIGINT COMMENT '수정자 ID',
                        UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
                        PRIMARY KEY (BANNER_ID)
) COMMENT='배너';
/**
* ==============================================END==============================================
*/




/**
* NAME     : NEWS_LOG
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 뉴스 API 이력 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE NEWS_LOG (
                          LOG_ID BIGINT AUTO_INCREMENT COMMENT '이력 ID',
                          MESSAGE TEXT COMMENT '메세지',
                          CONTENTS TEXT COMMENT '내용',
                          REMARKS VARCHAR(500) COMMENT '비고',
                          INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                          INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                          UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                          UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                          PRIMARY KEY (LOG_ID)
) COMMENT='뉴스 API 이력';
/**
* ==============================================END==============================================
*/




/**
* NAME     : WEATHER_LOG
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 날씨 API 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE WEATHER_LOG (
                             LOG_ID BIGINT AUTO_INCREMENT COMMENT '날씨 ID',
                             MESSAGE TEXT COMMENT '날씨 메세지',
                             CONTENTS TEXT COMMENT '날씨 내용',
                             TEMPERATURE INT COMMENT '기온',
                             RAIN DECIMAL(5,2) COMMENT '강수확률',
                             REMARKS VARCHAR(500) COMMENT '비고',
                             INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                             INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                             UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                             UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                             PRIMARY KEY (LOG_ID)
) COMMENT='날씨 API';
/**
* ==============================================END==============================================
*/






/**
* NAME     : FORTUNE_TELLING_LOG
* TYPE     : TABLE
* AUTHOR   : ERROR
* DATE     : 2025-03-13
* DESC     : 운세 API 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE FORTUNE_TELLING_LOG (
                                     LOG_ID BIGINT AUTO_INCREMENT COMMENT '운세 ID',
                                     MESSAGE TEXT COMMENT '운세 메세지',
                                     CONTENTS TEXT COMMENT '운세 내용',
                                     REMARKS VARCHAR(500) COMMENT '비고',
                                     INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                     INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                     UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                     UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                     PRIMARY KEY (LOG_ID)
) COMMENT='운세 API';
/**
* ==============================================END==============================================
*/




/**
* NAME     : EMAIL_AUTH
* TYPE     : TABLE
* AUTHOR   : AOH
* DATE     : 2025-03-23
* DESC     : 이메일 인증 테이블 생성 스크립트.
* =============================================START=============================================
*/
CREATE TABLE EMAIL_AUTH (
                                    AUTH_ID BIGINT AUTO_INCREMENT COMMENT '인증번호 ID',
                                    USER_ID BIGINT COMMENT '회원 ID',
                                    EMAIL_AUTH_CODE VARCHAR(6) COMMENT '인증번호',
                                    AUTH_STATUS VARCHAR(1) COMMENT '인증 상태',
                                    EXPIRED_DT DATETIME COMMENT '만료 일시',
                                    REMARKS VARCHAR(500) COMMENT '비고',
                                    INSERT_USER_ID BIGINT COMMENT '등록자 ID',
                                    INSERT_DT DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '등록일시',
                                    UPDATE_USER_ID BIGINT COMMENT '변경자 ID',
                                    UPDATE_DT DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
                                    PRIMARY KEY (AUTH_ID)
) COMMENT='이메일 인증';
/**
* ==============================================END==============================================
*/





DELIMITER $$

-- 공통 코드 이름 조회
CREATE FUNCTION FN_COMMON_CODE_NAME (
    p_CODE_KEY VARCHAR(100)
) RETURNS VARCHAR(100)
    DETERMINISTIC
BEGIN
    DECLARE v_CODE_NAME VARCHAR(100);

    -- 조회 결과 없을 때 NULL 반환
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_CODE_NAME = NULL;

    -- 파라미터 NULL 체크
    IF p_CODE_KEY IS NULL THEN
        RETURN NULL;
END IF;

    -- 데이터 조회
SELECT CODE_NAME INTO v_CODE_NAME
FROM COMMON_CODE
WHERE CODE_KEY = p_CODE_KEY
  AND USE_YN = 'Y';

RETURN v_CODE_NAME;
END$$

-- 공통 코드 상세 이름 조회
CREATE FUNCTION FN_COMMON_CODE_DETAIL_NAME (
    p_CODE_KEY VARCHAR(100),
    p_CODE_ID VARCHAR(100)
) RETURNS VARCHAR(100)
    DETERMINISTIC
BEGIN
    DECLARE v_CODE_NAME VARCHAR(100);

    -- 조회 결과 없을 때 NULL 반환
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_CODE_NAME = NULL;

    -- 파라미터 NULL 체크
    IF p_CODE_KEY IS NULL OR p_CODE_ID IS NULL THEN
        RETURN NULL;
END IF;

    -- 데이터 조회
SELECT B.CODE_NAME INTO v_CODE_NAME
FROM COMMON_CODE A
         INNER JOIN COMMON_CODE_DETAIL B ON A.CODE_KEY = B.CODE_KEY
WHERE A.CODE_KEY = p_CODE_KEY
  AND B.CODE_ID = p_CODE_ID
  AND A.USE_YN = 'Y'
  AND B.USE_YN = 'Y';

RETURN v_CODE_NAME;
END$$

-- 공통 코드 참조값 조회
CREATE FUNCTION FN_COMMON_CODE_REF (
    p_CODE_KEY VARCHAR(100),
    p_CODE_ID VARCHAR(100),
    p_REF_NO VARCHAR(1)
) RETURNS VARCHAR(100)
    DETERMINISTIC
BEGIN
    DECLARE v_CODE_REF VARCHAR(100);

    -- 조회 결과 없을 때 NULL 반환
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_CODE_REF = NULL;

    -- 파라미터 NULL 체크
    IF p_CODE_KEY IS NULL OR p_CODE_ID IS NULL OR p_REF_NO IS NULL THEN
        RETURN NULL;
END IF;

    -- 데이터 조회
SELECT
    CASE
        WHEN p_REF_NO = '1' THEN B.CODE_REF_01
        WHEN p_REF_NO = '2' THEN B.CODE_REF_02
        WHEN p_REF_NO = '3' THEN B.CODE_REF_03
        ELSE NULL
        END
INTO v_CODE_REF
FROM COMMON_CODE A
         INNER JOIN COMMON_CODE_DETAIL B ON A.CODE_KEY = B.CODE_KEY
WHERE A.CODE_KEY = p_CODE_KEY
  AND B.CODE_ID = p_CODE_ID
  AND A.USE_YN = 'Y'
  AND B.USE_YN = 'Y';

RETURN v_CODE_REF;
END$$

DELIMITER ;
