<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">B站直播间抽奖系统</h1>
      <div class="room-info" v-if="roomInfo">
        <span class="room-title">{{ roomInfo.title }}</span>
        <span class="anchor-name">主播: {{ roomInfo.anchorName }}</span>
        <span class="online-count">在线: {{ roomInfo.onlineCount }}</span>
      </div>
    </header>
    <main class="app-main">
      <LotteryGrid />
      <DanmakuDisplay :roomId="roomId" />
    </main>
    <footer class="app-footer">
      <p>© 2024 B站直播间抽奖插件</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LotteryGrid from './components/LotteryGrid.vue'
import DanmakuDisplay from './components/DanmakuDisplay.vue'
import BilibiliAPI from './utils/bilibili-api'

const roomId = ref<number>(0)
const roomInfo = ref<any>(null)

onMounted(async () => {
  // 这里可以从URL参数或其他地方获取房间ID
  roomId.value = 123456 // 示例房间ID
  
  try {
    const api = BilibiliAPI.getInstance()
    api.setRoomId(roomId.value)
    roomInfo.value = await api.getRoomInfo()
  } catch (error) {
    console.error('获取直播间信息失败:', error)
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0a0a;
  color: #fff;
  font-family: 'MedievalSharp', cursive;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('/assets/gothic-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
}

.app-header {
  position: relative;
  z-index: 2;
  padding: 20px;
  text-align: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
}

.app-title {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.room-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);

  .room-title {
    color: #ff6b6b;
  }

  .anchor-name {
    color: #8b0000;
  }

  .online-count {
    color: #4b0000;
  }
}

.app-main {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.app-footer {
  position: relative;
  z-index: 2;
  padding: 20px;
  text-align: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}
</style> 