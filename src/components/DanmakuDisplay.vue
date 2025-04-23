<template>
  <div class="danmaku-container">
    <div class="danmaku-list">
      <div v-for="(danmaku, index) in danmakuList" 
           :key="index" 
           class="danmaku-item"
           :class="{ 'highlight': danmaku.isHighlight }">
        <span class="username">{{ danmaku.username }}:</span>
        <span class="content">{{ danmaku.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BilibiliAPI from '../utils/bilibili-api'

interface Danmaku {
  username: string
  content: string
  timestamp: number
  isHighlight: boolean
}

const props = defineProps<{
  roomId: number
}>()

const danmakuList = ref<Danmaku[]>([])
const maxDanmakuCount = 50

const handleDanmaku = (message: any) => {
  const danmaku: Danmaku = {
    username: message.username,
    content: message.content,
    timestamp: message.timestamp,
    isHighlight: false
  }

  // 检查是否是抽奖关键词
  if (message.content.includes('抽奖')) {
    danmaku.isHighlight = true
  }

  danmakuList.value.unshift(danmaku)
  
  // 限制弹幕数量
  if (danmakuList.value.length > maxDanmakuCount) {
    danmakuList.value.pop()
  }
}

onMounted(() => {
  const api = BilibiliAPI.getInstance()
  api.setRoomId(props.roomId)
  api.connectDanmaku(handleDanmaku)
})

onUnmounted(() => {
  const api = BilibiliAPI.getInstance()
  api.disconnectDanmaku()
})
</script>

<style lang="scss" scoped>
.danmaku-container {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 10px;
  z-index: 1000;
}

.danmaku-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.danmaku-item {
  color: #fff;
  font-size: 14px;
  padding: 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &.highlight {
    background: rgba(139, 0, 0, 0.3);
    border-left: 3px solid #8b0000;
  }

  .username {
    color: #ff6b6b;
    margin-right: 5px;
    font-weight: bold;
  }

  .content {
    color: #fff;
  }
}

// 自定义滚动条样式
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(139, 0, 0, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 0, 0, 0.7);
}
</style> 