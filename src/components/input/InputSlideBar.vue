<template>
  <div class="flex flex-row h-16 relative">
    <AddButton class="z-10 mt-2" @toggle="$emit('doToggle')" />

    <Transition name="slide-fade">
      <div
        id="slide"
        v-show="toggle"
        class="flex flex-row bg-[#101010] rounded-r-2xl h-full justify-center items-center"
      >
        <input
          id="inp"
          :placeholder="tip"
          class="ml-16 mr-2 p-2 rounded-xl"
          @focusout="focusout"
          v-model="value"
          @input="normalizeInputStyle"
          @keyup.enter="submit()"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import AddButton from '@/components/buttons/AddButton.vue'
import { ref } from 'vue'
import BufferManager from '../../managers/buffer_manager'

const emit = defineEmits(['doToggle', 'submit'])

const emptyStyleColor = 'red';

const props = defineProps({
  toggle: {
    type: Boolean,
    default: false
  },
  valueString: {
    type: String,
    default: ''
  },
  wrongInputPlaceholder: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})


const tip = ref(props.placeholder);

const normalInputStyle = '0px transparent';
const emptyInputStyle = '1px solid ' + emptyStyleColor;
let inputStyle = ref('0px transparent')

const focusout = () => {
  normalizeInputStyle();

  if (props.toggle === true) {
    emit('doToggle');
  }
}

const value = ref(props.valueString)

const normalizeInputStyle = () => {
  inputStyle.value = normalInputStyle
  tip.value = props.placeholder;
}

const stressInputStyle = () => {
  inputStyle.value = emptyInputStyle
  tip.value = props.wrongInputPlaceholder;
}

const submit = () => {
  if (value.value === '') {
    stressInputStyle()
    return
  } 

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
  border: v-bind('inputStyle');
  background-color: #2c2b2b;
}

#inp:focus {
  outline: none;
}
</style>
