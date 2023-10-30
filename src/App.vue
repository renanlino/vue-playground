<template>
  <div>
    <button
      :disabled="startButtonDisabled"
      @click="startRecording"
    >
      Start Recording
    </button>

    <button
      :disabled="stopButtonDisabled"
      @click="stopRecording"
    >
      Stop Recording
    </button>

    <main>
      <video
        ref="video"
        width="800"
        controls
        autoplay
        playsinline
      />
    </main>

    <button
      @click="submitFile"
      :disabled="submitButtonDisabled"
    >
      Upload!
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import RecordRTC from 'recordrtc'

export default {
  name: 'App',
  components: {
  },

  setup() {
    const store = useStore()

    return {
      createAnswer: (args) => store.dispatch('assessments/createAssessmentAnswer', args),
      video: ref('video')
    }
  },

  data() {
    return {
      id: 1,
      file: null,
      startButtonDisabled: false,
      stopButtonDisabled: true,
      recorder: {},
      submitButtonDisabled: true
    }
  },

  methods: {
    async submitFile() {
      await this.createAnswer({
        id: this.id,
        file: this.file
      })

      alert('File uploaded!')
    },

    captureCamera(callback) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(function(camera) {
        callback(camera)
      }).catch(function(error) {
        console.error(error)
      })
    },

    startRecording() {
      this.startButtonDisabled = true
      this.submitButtonDisabled = true

      const record = (camera) => {
        this.video.muted = true
        this.video.volume = 0
        this.video.srcObject = camera

        this.recorder = RecordRTC(camera, { type: 'video' })

        this.recorder.startRecording()

        this.recorder.camera = camera

        this.stopButtonDisabled = false
      }

      this.captureCamera(record)
    },

    stopRecordingCallback() {
      this.video.src = this.video.srcObject = null
      this.video.muted = false
      this.video.volume = 1
      this.file = this.recorder.getBlob()
      this.video.src = URL.createObjectURL(this.file)
      console.log(this.video)

      this.recorder.camera.stop()
      this.recorder.destroy()
      this.recorder = {}
    },

    stopRecording() {
      this.stopButtonDisabled = true

      this.recorder.stopRecording(this.stopRecordingCallback)

      this.startButtonDisabled = false
      this.submitButtonDisabled = false
    }
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
