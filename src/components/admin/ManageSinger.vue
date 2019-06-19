<template>
    <div ref="div1" style="display:flex;flex-wrap:wrap">
        <div ref="div2" class="manage-singer">
            <Card ref="card1" style="margin-bottom:10px">
                <p slot="title"><Icon style="font-size:18px" type="md-add-circle" />添加歌手</p>
                <p style="margin-top:11px">如要为歌手添加专辑，请转至专辑管理</p>
                <div>
                <span class="title-span">歌手id</span>
                <Input placeholder="自动填充" style="width: 350px" v-model='add.singerid' disabled/>
                </div>
                <div style="margin-top:28px">
                <span class="title-span">名字</span>
                <Input placeholder="输入歌手名字" style="width: 100px" v-model='add.singername' />
                <span class="title-span">性别</span>
                <Input placeholder="输入歌手性别" style="width: 100px" v-model='add.sex' />
                <span class="title-span">地区</span>
                <Input placeholder="输入歌手地区" style="width: 100px" v-model='add.region' />
                </div>
                <div>
                <span class="title-span">简介</span>
                <Input type="textarea" rows="3" placeholder="输入歌手简介" style="width: 405px" v-model='add.intro' />
                </div>
                <Upload
                type="drag"
                id="uploadFile"
                :before-upload="clearFile()"
                action="http://111.230.63.192:8081/uploadSingerImg">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽上传歌手封面</p>
                </div>
                </Upload>
                <div>
                    <Button type="success" long style="width:300px" @click="addSinger()">提交</Button>
                </div>
            </Card>
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-trash" />删除歌手</p>
                <p style="margin-top:11px">搜索想要进行操作的歌手。<b style="color:red">警告：删除歌手后不可恢复!!</b></p>
                <div>
                <span class="title-span">歌手名</span>
                <Select
                v-model="del.singername"
                filterable
                remote
                :remote-method="fuzzySearch"
                :loading="sloading">
                <Option v-for="(option, index) in result" :value="option.singername" :key="index">{{option.singername}}</Option>
                </Select>
                </div>
                <div>
                    <Button type="primary" shape="circle" icon="md-search" @click="searchDelete()"></Button>
                </div>
                <div>
                    <p>您查询到的歌手其他信息如下（简介略去）</p>
                </div>
                <Row>
                    <Col span="8"><b>歌手id</b></Col>
                    <Col span="8"><b>地区</b></Col>
                    <Col span="8"><b>性别</b></Col>
                </Row>
                <Row style="margin-bottom:18px">
                    <Col span="8" v-model='del.singerid'>{{del.singerid}}</Col>
                    <Col span="8" v-model='del.region'>{{del.region}}</Col>
                    <Col span="8" v-model='del.sex'>{{del.sex}}</Col>
                </Row>
                <div>
                    <Poptip
	                class="admin-tip"
		            confirm
		            transfer
                    title="确定删除歌手并下架关联的专辑与歌曲吗？本操作不可恢复。"
                    @on-ok="deleteSinger()"
                    @on-cancel="cancel">
                    <Button type="error" long style="width:360px" :disabled='canDelete'>删除歌手</Button>
                    </Poptip>
                </div>
            </Card>
        </div>
        <div class="manage-singer">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-mic" />歌手库</p>
                <p>越往前的歌手添加得越晚</p>
                <Page :total="SingerCnt" :page-size="20" show-total  @on-change="changePage"></Page>
                <div>
                    <Row>
                    <Col span="6"><b>歌手id</b></Col>
                    <Col span="6"><b>歌手名</b></Col>
                    <Col span="6"><b>性别</b></Col>
                    <Col span="6"><b>地区</b></Col>
                    </Row>
                </div>
                <div>
                    <Row v-for="(s,i) in pageList" :class="i%2==0?'clg':'clw'" style="margin-bottom:14px">
                    <Col span="6">{{s.singerid}}</Col>
                    <Col span="6">{{s.singername}}</Col>
                    <Col span="6">{{s.singersex}}</Col>
                    <Col span="6">{{s.region}}</Col>
                    </Row>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    name:'ManageSinger',
    data(){
        return{
            add:{
                singerid:'',
                singername:'',
                sex:'',
                region:'',
                intro:''
            },
            del:{
                singerid:'',
                singername:'',
                sex:'',
                region:''
            },
            canDelete:true,
            pageList:[],
            searchKey:'',
            SingerCnt:0,
            result:[],
            sloading:false
        }
    },
    methods:{
        addSinger(){
            for(let a in this.add){
                if (this.add[a]===''){
                    this.$Message.error('有字段未填，请补充完整！')
                    return
                }
            }

            AXIOS.post('/addSinger',this.$qs.stringify({
				'id':this.add.singerid,
                'name':this.add.singername,
                'sex':this.add.sex,
                'region':this.add.region,
                'intro':this.add.intro,
                'adminid':sessionStorage.getItem('adminid'),
                'singerimg':'https://2019-music-1258503590.cos.ap-shanghai.myqcloud.com/images/singers/'+this.add.singername+'.jpg'
		    }),
		    {
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
				})
		    .then((response)=>{
			    if(1===response.data){
                    this.$Message.success('添加成功')
                    this.changePage(1)
                    for (let a in this.add){
                        this.add[a]=''
                    }
                    AXIOS.get('/maxSingerid')
                    .then((response)=>{
                        this.add.singerid=response.data
                    })
				}
	    		else{
			    	this.$Message.error('添加失败，请重试')
			    }
	    	})
        },
        searchDelete(){
            if(this.del.singername===''){
                this.$Message.error('有字段未填，请补充完整')
                return
            }
            this.del.singerid=''
            this.del.sex=''
            this.del.region=''
            this.canDelete=true
            AXIOS.get('/searchDeleteSinger',{params:{singername:this.del.singername}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.del.singerid=response.data.singerid
                    this.del.sex=response.data.singersex
                    this.del.region=response.data.region
                    this.canDelete=false
                }
            })
        },
        deleteSinger(){
            AXIOS.delete('/deleteSinger',{params:{singerid:this.del.singerid}})
            .then((response)=>{
                if(1===response.data){
                    this.$Message.success('已将歌手删除')
                    AXIOS.get('/maxSingerid')
                    .then((response)=>{
                        this.add.singerid=response.data
                    })
                    this.changePage(1)
                }
                else{
                    this.$Message.error('删除失败，请重试')
                }
            })
            for(let d in this.del){
                this.del[d]=''
            }
            this.canDelete=true
        },
        getSingers(index){
                    AXIOS.get('/getSingers',{params:{pgnum:index}})
                    .then((response)=>{
                        this.pageList=response.data
                    })

        },
        changePage(index){
            this.pageList = this.getSingers(index-1);
        },
        fuzzySearch (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzySingers?singername='+query).
                        then(res=>{
                            this.result=res.data
                        })
                    }, 200);
                } else {
                    this.result = [];
                }
            },
        clearFile(){
            let _this=this
            setTimeout(()=>{
                _this.$refs.uploadFile.clearFiles()
            },3000)
        }
    },
    created(){
        AXIOS.get('/maxSingerid')
        .then((response)=>{
            this.add.singerid=response.data
        })
        AXIOS.get('/getSingerTotal')
        .then((response)=>{
        
        this.$nextTick(()=>{
            this.SingerCnt=response.data
            AXIOS.get('/getSingers',{params:{pgnum:0}})
            .then((res)=>{
                this.$nextTick(()=>{
                this.pageList=res.data
            })
        })
        })
        })
    }
}
</script>
<style scoped>
.manage-singer{
    width:49%;
    margin:5px
}
.title-span{
    font-weight: 600;
    margin-right: 12px;
    margin-left: 12px
}
.ivu-card-body > div{
    margin-top:20px
}
.clg{
    background-color: rgb(207, 207, 207)
}
.clw{
    background-color:rgb(241, 241, 241)
}
</style>