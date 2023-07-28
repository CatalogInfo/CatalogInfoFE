<template>
  <div class="flex flex-row h-16 relative">
    <AddButton class="z-10 mt-2" @toggle="$emit('doToggle')" />

    <Transition name="slide-fade">
      <div
        id="slide"
        v-show="toggle"
        class="flex flex-row bg-[#101010] rounded-r-2xl h-full justify-center items-center"
      >
        <input id="inp" class="ml-16 mr-2 p-2 rounded-xl" v-model="value" @keyup.enter="submit()" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import AddButton from '@/components/AddButton.vue'
import { ref } from 'vue'
import BufferManager from '../managers/buffer_manager'

const emit = defineEmits(['doToggle', 'submit'])
const props = defineProps({
  toggle: {
    type: Boolean,
    default: false
  },
  valueString: {
    type: String,
    default: ''
  }
})

const value = ref(props.valueString)

const submit = () => {
  BufferManager.updateBuffer(value.value)
  emit('submit')
  value.value = ''
}
</script>

<style scoped>
#slide {
  position: absolute;
  border: 0.001em solid #1e1e1e;
  border-left: none;
}

.slide-fade-enter-active {
  transform: translateX(0px);

  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-300px);
}

#inp {
  border: 0px transparent;
  background-color: #2c2b2b;
}

#inp:focus {
  outline: none;
}
</style>
