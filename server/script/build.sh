cd template
echo ls
{
  npm run build
  echo "构建完成"
} || {
  echo "构建失败"
  exit 1
}
