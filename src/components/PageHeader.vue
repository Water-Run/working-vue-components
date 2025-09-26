<!--
  标准化页面标题栏组件
  @author WaterRun
  @date 2025-09-25
-->

<template>
  <div class="md-page-header">
    <div class="md-header-content">
      <div class="md-title-section">
        <h1 class="md-page-title">{{ displayTitle }}</h1>
        <p v-if="hasSubtitle" class="md-page-subtitle">{{ subtitle }}</p>
      </div>

      <div class="md-actions">
        <button
            v-if="hasHelpContent"
            class="md-help-button"
            @click="toggleHelp"
            :class="{ 'active': isHelpVisible }"
            title="点击展开页面帮助信息"
        >
          <img
              src="@material-icons/details_100dp_000000_FILL0_wght400_GRAD0_opsz48.png"
              alt="页面帮助信息"
              class="md-help-icon"
          />
        </button>
      </div>
    </div>

    <transition name="help">
      <div v-if="isHelpVisible" class="md-help-panel">
        <div class="md-help-content" v-html="helpContent"></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isHelpVisible = ref<boolean>(false)
const config = ref<any>({})

onMounted(() => {
  if (window.pageConfig) {
    config.value = window.pageConfig
  }
})

const displayTitle = computed<string>(() => config.value.title || '')
const helpContent = computed<string>(() => config.value.helpContent || '')
const hasHelpContent = computed<boolean>(() => helpContent.value.length > 0)
const subtitle = computed<string>(() => config.value.subtitle || '')
const hasSubtitle = computed<boolean>(() => subtitle.value.length > 0)

const toggleHelp = (): void => {
  isHelpVisible.value = !isHelpVisible.value
}
</script>

<style scoped>
.md-page-header {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.md-header-content {
  padding: 20px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 12px;
  min-width: 0;
}

.md-title-section {
  flex: 1 1 auto;
  min-width: 200px;
}

.md-page-title {
  font-size: 24px;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

.md-page-subtitle {
  font-size: 14px;
  color: #666666;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.md-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-shrink: 0;
}

.md-help-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.md-help-button:hover {
  background: #f5f5f5;
}

.md-help-button.active {
  background: #e8e8e8;
}

.md-help-icon {
  width: 30px;
  height: 30px;
  opacity: 0.7;
}

.md-help-panel {
  background: #fafafa;
  border-top: 1px solid #e8e8e8;
  animation: slideDown 0.2s ease;
}

.md-help-content {
  padding: 20px 24px;
  line-height: 1.6;
  color: #333333;
  font-size: 14px;
}

.md-help-content h3 {
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.md-help-content h4 {
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  margin: 16px 0 8px 0;
}

.md-help-content p {
  margin: 0 0 12px 0;
}

.md-help-content ul {
  margin: 0 0 12px 0;
  padding-left: 20px;
}

.md-help-content li {
  margin-bottom: 4px;
}

.md-help-content strong {
  color: #1a1a1a;
  font-weight: 600;
}

.help-enter-active,
.help-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.help-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.help-enter-to {
  opacity: 1;
  transform: translateY(0);
  max-height: 400px;
}

.help-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 400px;
}

.help-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

@media (max-width: 600px) {
  .md-header-content {
    flex-direction: column;
    align-items: center;
    padding: 16px 20px;
  }

  .md-page-title {
    font-size: 20px;
    text-align: center;
  }

  .md-actions {
    margin-left: 0;
    margin-top: 12px;
    width: 100%;
    justify-content: center;
  }

  .md-help-content {
    padding: 16px 20px;
  }
}
</style>