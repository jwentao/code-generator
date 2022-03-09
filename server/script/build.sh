#cd template
#echo ls
#echo $0
#{
#  npm run build
#  echo "构建完成"
#} || {
#  echo "构建失败"
#  exit 1
#}

curDir=$(pwd)
libName=test-lib

# init部分
if [ ! -d "$curDir/$libName/" ]; then
    echo "目录不存在，clone目录"
    git clone https://github.com/tobyjwt/test-lib.git
fi

cd $curDir/template
npm run build

cd $curDir/$libName
mkdir $1
cd $1
cp $curDir/template/* $curDir/$libName/$1/
cp -r $curDir/template/src $curDir/$libName/$1/
cp -r $curDir/template/public $curDir/$libName/$1/
cp -r $curDir/template/dist $curDir/$libName/$1/
cp -r $curDir/template/.gitignore $curDir/$libName/$1/
cp -r $curDir/template/.browserslistrc $curDir/$libName/$1/
cp -r $curDir/template/.eslintrc.js $curDir/$libName/$1/
cp -r $curDir/template/.browserslistrc $curDir/$libName/$1/


rm -rf $curDir/template/dist
rm -f $curDir/template/src/App.vue

echo "1231111"
exit 0
