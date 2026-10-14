<template>
  <aside class="sidebar" :class="{ collapsed: effectiveCollapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <h1>{{ t('nav.companyName') }}</h1>
        <span class="subtitle nav-label">{{ t('nav.subtitle') }}</span>
      </div>
      <button
        class="collapse-toggle"
        @click="toggleSidebar"
        :aria-expanded="!effectiveCollapsed"
        aria-label="Toggle sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <nav class="nav-tabs">
      <router-link to="/" :class="{ active: $route.path === '/' }">
        <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span class="nav-label">{{ t('nav.overview') }}</span>
      </router-link>
      <router-link to="/inventory" :class="{ active: $route.path === '/inventory' }">
        <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 8L12 4L21 8L12 12L3 8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M3 8V16L12 20L21 16V8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M12 12V20" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span class="nav-label">{{ t('nav.inventory') }}</span>
      </router-link>
      <router-link to="/orders" :class="{ active: $route.path === '/orders' }">
        <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 3H16C16.5523 3 17 3.44772 17 4V5H7V4C7 3.44772 7.44772 3 8 3Z" stroke="currentColor" stroke-width="1.5"/>
          <rect x="5" y="5" width="14" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 11L10 13L14 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 16H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="nav-label">{{ t('nav.orders') }}</span>
      </router-link>
      <router-link to="/spending" :class="{ active: $route.path === '/spending' }">
        <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 21V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M10 21V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M16 21V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M3 21H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="nav-label">{{ t('nav.finance') }}</span>
      </router-link>
      <router-link to="/demand" :class="{ active: $route.path === '/demand' }">
        <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 7H21V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-label">{{ t('nav.demandForecast') }}</span>
      </router-link>
      <router-link to="/reports" :class="{ active: $route.path === '/reports' }">
        <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 3H14L18 7V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V4C6 3.44772 6.44772 3 7 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M14 3V7H18" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M9 16H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="nav-label">{{ t('nav.reports') }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <LanguageSwitcher :collapsed="effectiveCollapsed" />
      <ProfileMenu
        :collapsed="effectiveCollapsed"
        @show-profile-details="$emit('show-profile-details')"
        @show-tasks="$emit('show-tasks')"
      />
    </div>
  </aside>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useSidebar } from '../composables/useSidebar'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ProfileMenu from './ProfileMenu.vue'

defineEmits(['show-profile-details', 'show-tasks'])

const { t } = useI18n()
const { effectiveCollapsed, toggleSidebar } = useSidebar()
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  width: 240px;
  transition: width 0.25s ease;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.logo {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  overflow: hidden;
}

.logo h1 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
  white-space: nowrap;
}

.subtitle {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 400;
  white-space: nowrap;
}

.collapse-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: none;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.collapse-toggle:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-tabs a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.938rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-tabs a:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.nav-tabs a.active {
  color: #2563eb;
  background: #eff6ff;
}

.nav-label {
  opacity: 1;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}

.sidebar.collapsed .nav-label {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  border-top: 1px solid #e2e8f0;
}
</style>
