curDir=$(pwd)
libName=test-lib

# init部分
if [ ! -d "$curDir/$libName/" ]; then
    echo "目录不存在，clone目录"
    git clone https://github.com/tobyjwt/test-lib.git
fi
