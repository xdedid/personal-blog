<script setup lang="ts">
defineProps<{
  title: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">确认删除</h3>
          <button class="close-btn" @click="emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <p class="confirm-text">确定要删除《<strong>{{ title }}</strong>》吗？</p>
          <p class="confirm-warn">此操作不可撤销，文件将从仓库中永久删除。</p>
        </div>

        <div class="modal-footer">
          <button class="btn btn-ghost" @click="emit('close')">取消</button>
          <button class="btn btn-danger" @click="emit('confirm')">删除</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  width: 90%;
  max-width: 420px;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.close-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 1.5rem;
}

.confirm-text {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
}

.confirm-text strong {
  color: #fff;
}

.confirm-warn {
  font-family: 'Source Sans 3', sans-serif;
  color: #f87171;
  font-size: 0.8rem;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger {
  background: rgba(248, 113, 113, 0.15);
  border-color: #f87171;
  color: #f87171;
}

.btn-danger:hover {
  background: rgba(248, 113, 113, 0.3);
  color: #fff;
}

.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
