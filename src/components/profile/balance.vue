<template>
    <div id="charge-div" style="display: flex;">
    <div class="charge-div">
    <p class="p-style"><b>充值</b></p>
    <p>您现在的余额为<b>{{balance}}</b>元</p>
    <p>在下框中输入充值金额，点击<Icon type="logo-bitcoin" />图标进行支付</p>
    <p>充值金额不应小于10元。</p>
    <div>
        <Input type="text" id="name" v-model='money' placeholder="请输入充值金额" icon='logo-bitcoin' @on-click='showPay()' style="margin-top:10px;display: block;width:60%" />
        <Modal       
        v-model="paymodal"
        title="请扫描以下二维码支付，微信支付与支付宝通用"
        @on-ok="pay()"
        @on-cancel="cancel"
        style="text-align:center">
        <p>需要支付{{money}}元</p>
        <img src="../../image/pay.png" style="width:180px;height:180px">
        </Modal>
      </div>
    </div>
    <div class="charge-div">
    <p class="p-style"><b>VIP</b></p>
    <p :bind="viptext">{{viptext}}</p>
    <p>VIP用户可以<b>免费聆听</b>所有需要付费的歌曲</p>
    <Button type="primary" :disabled='isVIP' @click='showVIP()'>支付30元立即加入VIP</Button>
    <Modal       
        v-model="vipmodal"
        title="提示"
        @on-ok="setVIP()"
        @on-cancel="cancel"
        style="text-align:center">
        <p><b>将扣除您的余额30元。继续吗？</b></p>
        </Modal>
    </div>
</div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    props:['userid'],
    name:"balance",
    data(){
        return{
            balance:0,
            isVIP:false,
            money:0,
            paymodal:false,
            viptext:'',
            vipmodal:false
        }
    },
    methods:{
        getInfo(){
            AXIOS.get('getUser?id=' + this.userid)
				.then((response) => {
                    this.balance=response.data.userbalance
                    this.isVIP = response.data.isvip==1?true:false
                    this.vip()
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取个人信息出错',
							desc: error ? error : '未知错误'
					})
				})
        },
        showPay(){
            if(this.money<10){
                this.$Message.error("充值金额应大于等于10.请检查您输入的充值金额")
            }else{
            this.paymodal=true
            }
        },
        pay(){
            AXIOS('/charge',{params:{id:this.userid,money:this.money}}).
            then((res)=>{
                this.paymodal=false
                if(1==res.data){
                    this.$Message.success("您已充值成功")
                    this.getInfo()
                    this.$parent.getUser(this.userid)
                }
                else{
                    this.$Message.error("充值失败，请重试")
                }
            })
        },
        vip(){
            this.viptext = this.isVIP==true?'您已经是VIP会员。尽情享受畅听的快感吧！':'您还不是VIP会员。点击下方按钮立即加入！'
        },
        showVIP(){
            this.vipmodal=true
        },
        setVIP(){
            AXIOS.get('/setVIP',{params:{id:this.userid}})
            .then((res)=>{
                this.vipmodal=false
                if(1==res.data){
                    this.$Message.success("恭喜您成为了VIP会员")
                    this.getInfo()
                    this.$parent.getUser(this.userid)
                }
                else{
                    this.$Message.error("失败，请检查是否有足够余额")
                }
            })
        }
    },
    mounted(){
        this.getInfo()
    }
}
</script>
<style scoped>
.charge-div{
    display:block;
    width:50%;
    text-align: left
}
.p-style{
    font-size:25px
}
</style>


