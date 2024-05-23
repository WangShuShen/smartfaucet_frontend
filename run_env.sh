#!/bin/bash

# 設定容器名稱
CONTAINER_NAME="smart_faucet_frontend"
NETWORK_NAME="smart_faucet_backend_default"

# 停止並刪除現有容器
sudo docker stop ${CONTAINER_NAME}
sudo docker rm ${CONTAINER_NAME}

# 建立 Docker 鏡像
echo "正在建立 Docker 鏡像..."
sudo docker build -t ${CONTAINER_NAME} .

# 運行容器並連接到特定網路，設置自動重啟策略
echo "正在啟動容器..."
sudo docker run -d --network ${NETWORK_NAME} --restart always -p 39684:3000 --name ${CONTAINER_NAME} ${CONTAINER_NAME}

echo "部署完成！"