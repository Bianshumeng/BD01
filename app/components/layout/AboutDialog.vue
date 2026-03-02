<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

const open = defineModel<boolean>('open', { default: false })

const appVersion = useRuntimeConfig().public.appVersion
const { t } = useI18n()
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-sm">
      <DialogHeader class="items-center text-center">
        <img
          src="/icon.png"
          :alt="t('Beads Task-Issue Tracker')"
          class="w-16 h-16 mb-2"
        />
        <DialogTitle class="text-lg">{{ t('Beads Task-Issue Tracker') }}</DialogTitle>
        <DialogDescription as="div" class="space-y-3 pt-2">
          <p class="text-sm font-medium text-foreground">{{ t('Version') }} {{ appVersion }}</p>
          <div class="text-xs text-muted-foreground space-y-1">
            <p>&copy; 2026 Laurent Chapin</p>
            <p>{{ t('Powered by beads (Steve Yegge)') }}</p>
            <p>{{ t('Vibe coded with Claude Code') }}</p>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
