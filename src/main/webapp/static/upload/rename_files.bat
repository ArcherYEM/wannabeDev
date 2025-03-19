@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: 사용자에게 접두사 입력 요청
set /p prefix=파일의 접두사를 입력하세요: 

:: 접두사 입력이 없으면 종료
if "%prefix%"=="" (
    echo 접두사를 입력해야 합니다.
    exit /b
)

set count=1

:: 파일 이름 변경
for %%f in (*) do (
    :: 배치 파일은 제외
    if /i "%%f" neq "rename_files.bat" (
        :: 파일 이름과 확장자 분리
        set "filename=%%f"
        set "ext=%%~xf"

        :: 특수문자 처리 (예: !, &, ^ 등)
        set "filename=!filename:!^^=!!"
        set "filename=!filename:&=^&!"
        set "filename=!filename:<=^<!"
        set "filename=!filename:>=^>!"
        set "filename=!filename:|=^|!"
        set "filename=!filename:*=^*!"
        set "filename=!filename:?=^?!"
        set "filename=!filename:~=^~!"

        :: 파일 이름 변경
        ren "%%f" "!prefix!_!count!!ext!"
        set /a count+=1
    )
)

echo 파일 이름 변경이 완료되었습니다!
pause
