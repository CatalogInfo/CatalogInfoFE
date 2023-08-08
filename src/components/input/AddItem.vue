<template>
    <div class="relative flex flex-row"
>
      <input
        v-model="value"
        id="itemInput"
        v-focus 
        class="text-left h-24 w-96 bg-black rounded-lg p-8 shadow-xl font-semibold text-xl"
        :placeholder="tip"
        @input="normalizeInputStyle"
        @keyup.enter="submit()"
      >
    </div>
</template>

<script setup lang="ts">
import BufferManager from '@/managers/buffer_manager';
import { ref } from 'vue';

const vFocus = {
    mounted: (el) => el.focus()
}
const emit = defineEmits(['doToggle', 'submit'])

const emptyStyleColor = 'red'

const test = () => {
    console.log("AAAAAAA");
}

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

const tip = ref(props.placeholder)

const normalInputStyle = '0px transparent'
const emptyInputStyle = '1px solid ' + emptyStyleColor
let inputStyle = ref('0px transparent')

const focusout = () => {
  normalizeInputStyle()

  if (props.toggle === true) {
    emit('doToggle')
  }
}

const value = ref(props.valueString)

const normalizeInputStyle = () => {
  inputStyle.value = normalInputStyle
  tip.value = props.placeholder
}

const stressInputStyle = () => {
  inputStyle.value = emptyInputStyle
  tip.value = props.wrongInputPlaceholder
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
#itemInput {
opacity: 0.6;
background-color: rgb(16, 16, 16);
border: 2px solid #822e75;
color: white;
box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemInput:hover {
/* opacity: 0.7; */
/* box-shadow: 0px 0px 4px 4px #822e75; */
/* pointer-events: none; */

}

#itemInput:focus {
  outline: none;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(146, 134, 134);
  opacity: 0.5; /* Firefox */
}

</style>