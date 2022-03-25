curDir=$(pwd)
libName=test-lib

cd $curDir/template
npm run lint
npm run build

cd $curDir/$libName
mkdir $1
cd $1
cp -f $curDir/template/* $curDir/$libName/$1/
cp -r $curDir/template/src $curDir/$libName/$1/
cp -r $curDir/template/public $curDir/$libName/$1/
cp -r $curDir/template/dist $curDir/$libName/$1/
cp -r $curDir/template/.gitignore $curDir/$libName/$1/
cp -r $curDir/template/.browserslistrc $curDir/$libName/$1/
cp -r $curDir/template/.eslintrc.js $curDir/$libName/$1/
cp -r $curDir/template/.browserslistrc $curDir/$libName/$1/

cd $curDir/$libName
git add $1
git commit -m"auto commit $1"
git push origin main

aws s3 sync $curDir/$libName/$1/dist s3://sl-appsaas/web/lowcode/$1/$2

rm -rf $curDir/template/dist
rm -f $curDir/template/src/App.vue
rm -f $curDir/template/package.json

exit 0
