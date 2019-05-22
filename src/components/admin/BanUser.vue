<template>
    <div>
        <div style="margin-bottom:20px">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-build" />自动封禁</p>
                <p>点击扫描按钮，系统会自动扫描，对于发布超过3条违规评论的用户予以封禁</p>
                <div>
                <Button size="large" icon="md-qr-scanner" type="primary" @click='banUser()' shape="circle"></Button>
                </div>
                <p :bind='banText' style="margin-top:15px"><b>{{banText}}</b></p>
                <Button v-if="btnShow" type="primary" @click="hideText()">确认</Button>
            </Card>
        </div>
        <div style="margin-bottom:20px">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-body" />评论审核</p>
                <p>人工审核评论，对于违规评论予以删除。点击下面的按钮获取新的评论。</p>
                <div style="margin:8px">
                <Button size="large" icon="md-paper" type="primary" @click='getComment(0)' shape="circle"></Button>
                </div>
                <p v-if="!comment.result" style="margin-top:15px"><b>当前没有需要审核的评论</b></p>
                <Page v-if="comment.result" :total="comment.total" :page-size="5" show-total  @on-change="changePageComment"></Page>
                <div class="com-div" v-if="comment.result" v-for='(rs,index) in comment.pageList'>
                    <span><b>用户ID:</b>{{rs.userid}}</span>
                    <span><b>评论时间:</b>{{rs.commenttime}}</span>
                    <Button type="success" shape="circle" icon="md-checkmark" @click="pass(rs.userid,rs.songid,rs.commenttime)"></Button>
                    <Button type="error" shape="circle" icon="md-close" @click="fail(rs.userid,rs.songid,rs.commenttime)"></Button>
                    <p><b>评论内容:</b>{{rs.commenttext}}</p>
                </div>
            </Card>
        </div>
        <div>
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-checkmark" />解封用户</p>
                <p>请先点击下面按钮获取被封禁用户，再点击解封按钮解封用户</p>
                <div style="margin:8px">
                <Button size="large" icon="md-eye-off" type="primary" @click='getBan(0)' shape="circle"></Button>
                </div>
                <p v-if="!ban.result" style="margin-top:15px"><b>当前没有需要解封的用户</b></p>
                <Page v-if="ban.result" :total="ban.total" :page-size="5" show-total  @on-change="changePageBan"></Page>
                <div class="ban-div" v-if="ban.result" v-for='(rs,index) in ban.pageList'>
                    <span><b>用户ID:</b>{{rs.userid}}</span>
                    <span><b>封禁人ID:</b>{{rs.adminid}}<Icon v-if="rs.adminid==adminid" type="md-at" /></span>
                    <span><b>封禁时间:</b>{{rs.bantime}}</span>
                    <Button type="success" @click="unBan(rs.userid)">解封</Button>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    name:'BanUser',
    data(){
        return{
            banText:'',
            btnShow:false,
            adminid:sessionStorage.getItem("adminid"),
            comment:{
                pageList:[],
                result:true,
                total:0
            },
            ban:{
                pageList:[],
                result:true,
                total:0
            }
        }
    },
    methods:{
        banUser(){
            AXIOS.get('/banUser',{params:{adminid:sessionStorage.getItem('adminid')}})
            .then((response)=>{
                if(''===response.data){
                    this.banText='当前没有要封禁的用户'
                    this.btnShow=true
                }
                else{
                    this.banText='对违规用户执行封禁操作的结果如下：'+response.data
                    this.btnShow=true
                }
            })
        },
        hideText(){
            this.banText=''
            this.btnShow=false
        },
        getComment(index){
            AXIOS.get('/getNewCommentsTotal')
            .then((response)=>{
                if(0==response.data){
                    this.comment.result=false
                }
                else{
                    if(this.comment.total!=response.data){
                        this.comment.total=response.data
                    }
                    this.comment.result=true
                    AXIOS.get('/getNewComments',{params:{pgnum:index}})
                    .then((response)=>{
                        this.comment.pageList=response.data
                        this.comment.result=true
                    })
                }
            })

        },
        changePageComment(index){
            this.comment.pageList = this.getComment(index-1);
        },
        pass(u,s,t,index){
            AXIOS.get('/passComment',{params:{uid:u,sid:s,ctime:t}})
            .then((res)=>{
                if('1'==res.data){
                    this.$Message.success('本条评论已通过审核')
                    this.getComment(0)
                }else{
                    this.$Message.error('出现错误，请重新获取评论后再试')
                }
            })
        },
        fail(u,s,t,index){
            AXIOS.get('/failComment',{params:{uid:u,sid:s,ctime:t}})
            .then((res)=>{
                if('1'==res.data){
                    this.$Message.success('本条评论已判为违规')
                    this.getComment(0)
                }else{
                    this.$Message.error('出现错误，请重新获取评论后再试')
                }
            })
        },
        getBan(index){
            AXIOS.get('/getBanTotal')
            .then((response)=>{
                if(0==response.data){
                    this.ban.result=false
                }
                else{
                    if(this.ban.total!=response.data){
                        this.ban.total=response.data
                    }
                    this.ban.result=true
                    AXIOS.get('/getBan',{params:{pgnum:index}})
                    .then((response)=>{
                        this.ban.pageList=response.data
                        this.ban.result=true
                    })
                }
            })

        },
        changePageBan(index){
            this.ban.pageList = this.getBan(index-1);
        },
        unBan(u){
            AXIOS.get('/unBan',{params:{uid:u}})
            .then((res)=>{
                if('1'==res.data){
                    this.$Message.success('已成功解封该用户')
                    this.getBan(0)
                }else{
                    this.$Message.error('出现错误，请重新获取被封禁用户后再试')
                }
            })
        }
        
    }
}
</script>
<style scoped>
.ivu-card-body > div{
    margin-top:20px
}
.com-div{
    margin-top:15px;
    text-align:left
}
.com-div>span{
    margin-right: 55px
}
.com-div>button{
    float: right;
}
.ban-div{
    margin-top:15px;
    text-align:left
}
.ban-div>span{
    margin-right: 95px
}
.ban-div>button{
    float: right;
}
</style>