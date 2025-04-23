<template>
  <div class="lottery-grid">
    <div class="grid-container">
      <div v-for="(item, index) in gridItems" :key="index" 
           class="grid-item" 
           :class="{ 'active': activeIndex === index }"
           @click="handleItemClick(index)">
        <div class="item-content">
          <img :src="item.image" :alt="item.name" class="item-image">
          <div class="item-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="control-panel">
      <button class="start-button" @click="startLottery" :disabled="isLottering">
        {{ isLottering ? '抽奖中...' : '开始抽奖' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface GridItem {
  id: number
  name: string
  image: string
  probability: number
}

const gridItems = ref<GridItem[]>([
  { id: 1, name: '奖品1', image: '/assets/prize1.png', probability: 0.1 },
  { id: 2, name: '奖品2', image: '/assets/prize2.png', probability: 0.1 },
  { id: 3, name: '奖品3', image: '/assets/prize3.png', probability: 0.1 },
  { id: 4, name: '奖品4', image: '/assets/prize4.png', probability: 0.1 },
  { id: 5, name: '奖品5', image: '/assets/prize5.png', probability: 0.1 },
  { id: 6, name: '奖品6', image: '/assets/prize6.png', probability: 0.1 },
  { id: 7, name: '奖品7', image: '/assets/prize7.png', probability: 0.1 },
  { id: 8, name: '奖品8', image: '/assets/prize8.png', probability: 0.1 },
  { id: 9, name: '奖品9', image: '/assets/prize9.png', probability: 0.1 }
])

const activeIndex = ref<number>(-1)
const isLottering = ref<boolean>(false)
let timer: number | null = null

const startLottery = () => {
  if (isLottering.value) return
  isLottering.value = true
  let currentIndex = 0
  const totalSteps = 30
  let step = 0

  timer = window.setInterval(() => {
    currentIndex = (currentIndex + 1) % gridItems.value.length
    activeIndex.value = currentIndex
    step++

    if (step >= totalSteps) {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      isLottering.value = false
      // 这里可以添加中奖逻辑
      console.log('中奖奖品：', gridItems.value[currentIndex])
    }
  }, 100)
}

const handleItemClick = (index: number) => {
  console.log('点击了奖品：', gridItems.value[index])
}

onMounted(() => {
  // 初始化逻辑
})
</script>

<style lang="scss" scoped>
.lottery-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b2b 100%);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.grid-item {
  width: 120px;
  height: 120px;
  background: rgba(45, 27, 43, 0.8);
  border: 2px solid #8b0000;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 0%, rgba(139, 0, 0, 0.2) 100%);
    z-index: 1;
  }

  &:hover {
    transform: scale(1.05);
    border-color: #ff0000;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
  }

  &.active {
    background: rgba(139, 0, 0, 0.5);
    border-color: #ff0000;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  }
}

.item-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.item-name {
  color: #fff;
  font-family: 'Gothic', sans-serif;
  font-size: 14px;
  margin-top: 5px;
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

.start-button {
  background: linear-gradient(135deg, #8b0000 0%, #4b0000 100%);
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  font-family: 'Gothic', sans-serif;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.3);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(139, 0, 0, 0.5);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style> 