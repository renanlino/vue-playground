<template>
  <div>
    <input
      type="file"
      @change="handleFileInput"
      accept="video/*"
      capture
    />
    <button @click="submitFile">Upload!</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
  },

  setup() {
    const store = useStore()

    return {
      createAnswer: (args) => store.dispatch('assessments/createAssessmentAnswer', args)
    }
  },

  data() {
    return {
      id: 1,
      file: null
    }
  },

  methods: {
    handleFileInput(e) {
      this.file = e.target.files[0]
    },
    async submitFile() {
        await this.createAnswer({
          id: this.id,
          file: this.file
        })
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
