<template>
  <div>
    <noscript>
      <strong>
        We're sorry but recorderx doesn't work properly without JavaScript enabled.
        Please enable it to continue.
      </strong>
    </noscript>
    <audio autoplay controls ref="audio"></audio>
    <div>
      <button ref="btnStart" @click="startRec">start</button>
      <button ref="btnPause" @click="pauseRec">pause</button>
      <button ref="btnClear" @click="clearRec">clear buffer</button>
    </div>
    <div ref="log" style="max-height:400px;margin-top:10px;overflow-y:scroll;"></div>
  </div>
</template>

<script>
import Recorderx, { RECORDER_STATE, ENCODE_TYPE } from "recorderx";

export default {
  data() {
    return {
      btnStart: this.$refs.btnStart,
      btnPause: this.$refs.btnPause,
      btnClear: this.$refs.btnClear,
      dlog: this.$refs.log,
      audio: this.$refs.audio,
      rc: null
    };
  },
  mounted() {
    (this.btnStart = this.$refs.btnStart),
      (this.btnPause = this.$refs.btnPause),
      (this.btnClear = this.$refs.btnClear),
      (this.dlog = this.$refs.log),
      (this.audio = this.$refs.audio);
  },
  methods: {
    pushLog(log, error = "") {
      const xlog = `<span style="margin-right:8px">
           ${new Date().toLocaleString()}:
         </span>
         <span style="color:${error ? "red" : "blue"}">
           ${log} ${error}
         </span>`;
      const dl = document.createElement("div");
      dl.innerHTML = xlog;
      this.dlog.appendChild(dl);
    },
    startRec() {
      if (!this.rc) {
        this.rc = new Recorderx({
          recordable: true,
          sampleRate: 44100
        });
      }
      if (this.rc.state === RECORDER_STATE.READY) {
        this.rc
          .start()
          .then(() => {
            this.pushLog("start recording");
          })
          .catch(error => {
            this.pushLog("Recording failed.", error);
          });
      }
    },
    pauseRec() {
      if (this.rc && this.rc.state === RECORDER_STATE.RECORDING) {
        this.rc.pause();
        var recordWav = this.rc.getRecord({
            encodeTo: ENCODE_TYPE.WAV,
            compressible: true
          })
        this.$refs.audio.src = URL.createObjectURL(recordWav);
        console.log(recordWav)
        // 利用<a>标签下载音频文件
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(recordWav)
        link.download = "test"
        link.click()

        this.pushLog("pause recording");
      }
    },
    clearRec() {
      this.rc.clear();
    }
  }
};
</script>
