import { ref, computed } from 'vue'

// Shared sidebar state (singleton pattern)
const isManuallyCollapsed = ref(false)
const isAutoCollapsed = ref(false)

// Register the matchMedia listener once at module scope
const mediaQuery = typeof window !== 'undefined'
  ? window.matchMedia('(max-width: 1024px)')
  : null

if (mediaQuery) {
  isAutoCollapsed.value = mediaQuery.matches

  const handleChange = (event) => {
    isAutoCollapsed.value = event.matches
  }

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleChange)
  } else if (typeof mediaQuery.addListener === 'function') {
    // Fallback for older browsers
    mediaQuery.addListener(handleChange)
  }
}

export function useSidebar() {
  const effectiveCollapsed = computed(() => {
    return isManuallyCollapsed.value || isAutoCollapsed.value
  })

  const toggleSidebar = () => {
    isManuallyCollapsed.value = !isManuallyCollapsed.value
  }

  return {
    isManuallyCollapsed,
    isAutoCollapsed,
    effectiveCollapsed,
    toggleSidebar
  }
}
