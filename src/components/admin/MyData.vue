<template>
    <div class="main-div">
        <div>
            <Card>
                <p slot="title">我的ID</p>
                <p class="info-p">{{id}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">当前时间</p>
                <p class="info-p" style="font-size:18px;line-height:1.6">{{nowTime}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">我封禁的用户数</p>
                <p class="info-p">{{info[6]}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">全站歌曲数</p>
                <p class="info-p">{{info[0]}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">全站专辑数</p>
                <p class="info-p">{{info[1]}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">全站歌手数</p>
                <p class="info-p">{{info[2]}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">我添加的歌曲数</p>
                <p class="info-p">{{info[3]}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">我添加的专辑数</p>
                <p class="info-p">{{info[4]}}</p>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title">我添加的歌手数</p>
                <p class="info-p">{{info[5]}}</p>
            </Card>
        </div>
    </div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    name:'MyData',
    data(){
        return{
            id:sessionStorage.getItem("adminid"),
            nowTime: new Date(),
            info:[]
        }
    },
    mounted () {
    var _this = this // 声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function () {
      _this.nowTime = new Date()
    }, 1000)

  },

  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  created(){
      console.log("frs")
          AXIOS.get("/getBasicInfo",{params:{aid:this.id}})
    .then((res)=>{
        this.info=res.data
        console.log("hjn")
    })  
  }
}
</script>
<style scoped>
.main-div{
    display: flex;
    flex-wrap: wrap
}
.main-div>div{
    width: 32%;
    margin:6px;
    background: rgb(red, green, blue)
}
.info-p{
    font-size:38px;
    font-weight:900;
    font-family: 'Microsoft YaHei'
}
</style>