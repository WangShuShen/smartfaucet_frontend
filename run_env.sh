#!/bin/bash

# 設定容器名稱
source .env.local

# 停止並刪除現有容器
sudo docker stop ${FRONTEND_IMAGE_NAME}
sudo docker rm ${FRONTEND_IMAGE_NAME}

# 建立 Docker 鏡像
echo "正在建立 Docker 鏡像..."
sudo docker build -t ${FRONTEND_IMAGE_NAME} .

# 運行容器並連接到特定網路，設置自動重啟策略
echo "正在啟動容器..."
sudo docker run -d --restart always -p ${FRONTEND_CONTAINER_PORT}:3000 --name ${FRONTEND_IMAGE_NAME} ${FRONTEND_IMAGE_NAME}

echo "部署完成！"