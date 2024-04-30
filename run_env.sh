#!/bin/bash

# 設定容器名稱
CONTAINER_NAME="smart_faucet_frontend"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

# 執行npm build
echo "正在建構前端應用..."
npm run build

# 建立 Docker 鏡像
echo "正在建立 Docker 鏡像..."
docker build -t ${CONTAINER_NAME} .

# 運行容器
echo "正在啟動容器..."
docker run -d -p 39684:3000 --name ${CONTAINER_NAME} ${CONTAINER_NAME}

echo "部署完成！"
