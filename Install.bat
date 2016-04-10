@REM Initialize the devkit
call c:\Ruby22-x64\devkit\devkitvars.bat
@REM Install the GEMs
call gem update
call gem clean
call gem install bundler
call gem install jekyll
@REM install missing dependencies
bundle install
