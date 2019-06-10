<template>
    <div class="box">
        <div class="loadingBars" v-if="showLoading">
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
                <div class="bar bar3"></div>
                <div class="bar bar4"></div>
                <div class="bar bar5"></div>
                <div class="bar bar6"></div>
                <div class="bar bar7"></div>
                <div class="bar bar8"></div>
        </div>
        <div v-if="!showLoading" class="recording">
            <a @click="pauseRec" class="iconbtn"><Icon type="md-microphone" size="36" class="recording-icon"/></a>
        </div>
        <div class="tips">
            <p class="child"> {{msg}}ing</p>
        </div>
    </div>
</template>

<script>
import Recorderx, { RECORDER_STATE, ENCODE_TYPE } from "recorderx";
import axios from 'axios'

export default {
    data() {
        return {
            btnStart: this.$refs.btnStart,
            btnPause: this.$refs.btnPause,
            btnClear: this.$refs.btnClear,
            dlog: this.$refs.log,
            audio: this.$refs.audio,
            rc: null,
            showLoading: false,
            msg: "正在录音，点击停止录音",
            // uploadURL: "/upload",
            file: "",
        };
    },
    mounted(){
        this.startRec()
    },
    methods: {
        handleFileUpload(file){
            this.file = file;
        },
        submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post( 'http://localhost:8081/upload',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
            console.log('SUCCESS!!');
            })
            .catch(function(e){
            console.log(e);
            });
        },
        pushLog(log, error = "") {
            // const xlog = `<span style="margin-right:8px">
            //     ${new Date().toLocaleString()}:
            //     </span>
            //     <span style="color:${error ? "red" : "blue"}">
            //     ${log} ${error}
            //     </span>`;
            // const dl = document.createElement("div");
            // dl.innerHTML = xlog;
            // this.dlog.appendChild(dl);
            console.log(log)
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
                // this.$refs.audio.src = URL.createObjectURL(recordWav);
                console.log(recordWav)
                // 利用<a>标签下载音频文件
                // const link = document.createElement('a')
                // link.href = window.URL.createObjectURL(recordWav)
                // link.download = "test"
                // link.click()
                this.handleFileUpload(recordWav)
                
                // submit file
                let formData = new FormData();
                let that = this;
                formData.append('file', this.file);
                that.showLoading = true
                that.msg = "正在玩命匹配"
                axios.post('http://localhost:8081/upload',
                    formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(function(){
                    
                    that.$emit('closeLoading',"msg")
                    that.pushLog("pause recording")
                    that.clearRec()
                    console.log('SUCCESS!!');
                    })
                .catch(function(e){
                    console.log(e)
                    that.clearRec()
                    console.log('FAILURE!!');
                });
                
                
            }
        },
        clearRec() {
            this.rc.clear();
        }
  }
}
</script>


<style scoped>
    .box{
        text-align: center;
    }
    .tips{
        position: fixed;
        top: 55%;
        left: 50%;
        float: left;
        font: bold;
        font-size: 20px;
        margin: 0 auto;
        color: rgb(255, 255, 255);
    }
    .child{
        position: relative;
        left: -50%;
        white-space: nowrap;
    }
    .loadingBars {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .bar {
        width: 6px;
        height: 2px;
        background: white;
        display: inline-block;
        transform-origin: bottom center;
        animation: loading 1.5s ease-in-out infinite;
    }
    .bar1 {
        animation-delay: 0.1s;
    }
    .bar2 {
        animation-delay: 0.2s;
    }
    .bar3 {
        animation-delay: 0.3s;
    }
    .bar4 {
        animation-delay: 0.4s;
    }
    .bar5 {
        animation-delay: 0.5s;
    }
    .bar6 {
        animation-delay: 0.6s;
    }
    .bar7 {
        animation-delay: 0.7s;
    }
    .bar8 {
        animation-delay: 0.8s;
    }
    @keyframes loading {
        0% {
            transform: scaleY(0.1);
            background: #fff;
        }
        50% {
            transform: scaleY(30);
            background: #2ecc71;
        }
        100% {
            transform: scaleY(0.1);
            background: transparent;
        }
    }
    .recording{
        position: fixed;
        top: 35%;
        left: 50%;
        float: left;
    }
    .recording-icon{
        margin: 15px;
        margin-top: 18px;
    }
    .iconbtn {
        width: 70px;
        height: 70px;
        text-decoration: none;
        margin: 20px;
        margin-left: -35px;
        position: absolute;
        font-size: 30px;
        border-radius: 50%;
        color: #fff;
        left: -50%;
    }
    .iconbtn::before {
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .iconbtn::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        z-index: 0;
        border: 4px dashed;
    }
    .iconbtn::after {
        animation: ro 7s linear infinite;
    }
    @keyframes ro {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

