<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">B站直播间抽奖系统</h1>
    </header>
    <main class="app-main">
      <LotteryGrid />
    </main>
    <footer class="app-footer">
      <p>© 2024 B站直播间抽奖插件</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LotteryGrid from './components/LotteryGrid.vue'
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