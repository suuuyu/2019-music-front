<template>
    <div style="display:flex">
        <div class="manage-album">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-add-circle" />上架专辑</p>
                <p style="margin-top:11px">如要为专辑添加歌曲，请转至歌曲管理</p>
                <div>
                <span class="title-span">专辑id</span>
                <Input placeholder="自动填充" style="width: 300px" v-model="add.albumid" disabled/>
                </div>
                <div>
                <span class="title-span">歌手名</span>
                <Input placeholder="输入歌手名" style="width: 300px" v-model="add.singername" />
                </div>
                <div>
                <p style="margin-top:-6px;margin-bottom:5px">点击搜索按钮自动获取歌手id</p>
                <span class="title-span">歌手id</span>
                <Input search placeholder="自动填充" style="width: 300px" @click.native='searchAddid' v-model='add.singerid' disabled/>
                </div>
                <div>
                <span class="title-span">名称</span>
                <Input placeholder="输入专辑名" style="width: 100px" v-model='add.albumname' />
                <span class="title-span">年代</span>
                <Input placeholder="输入专辑年代" style="width: 100px" v-model='add.age' />
                </div>
                <div>
                <span class="title-span">语言</span>
                <Input placeholder="输入专辑语言" style="width: 100px" v-model='add.language' />
                <span class="title-span">公司</span>
                <Input placeholder="输入发行公司" style="width: 100px" v-model='add.company' />
                </div>
                <div>
                    <Checkbox v-model="add.free">是否收费</Checkbox>
                </div>
                <div>
                    <Button type="success" long style="width:360px" @click='addAlbum()'>提交</Button>
                </div>
            </Card>
        </div>
        <div class="manage-album">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-trash" />下架专辑</p>
                <p style="margin-top:11px">搜索想要进行操作的专辑</p>
                <div>
                <span class="title-span">歌手名</span>
                <Input placeholder="输入歌手名" style="width: 300px" v-model='del.singername' />
                </div>
                <div>
                <span class="title-span">专辑名</span>
                <Input placeholder="输入专辑名" style="width: 300px" v-model='del.albumname' />
                </div>
                <div>
                    <Button type="primary" shape="circle" icon="md-search" @click="searchDelete()"></Button>
                </div>
                <div>
                    <p>您查询到的专辑其他信息如下</p>
                </div>
                <Row>
                    <Col span="6"><b>专辑id</b></Col>
                    <Col span="6"><b>语言</b></Col>
                    <Col span="6"><b>年代</b></Col>
                    <Col span="6"><b>发行公司</b></Col>
                </Row>
                <Row>
                    <Col span="6" v-model='del.albumid'>{{del.albumid}}</Col>
                    <Col span="6" v-model='del.language'>{{del.language}}</Col>
                    <Col span="6" v-model='del.age'>{{del.age}}</Col>
                    <Col span="6" v-model='del.company'>{{del.company}}</Col>
                </Row>
                <div>
                    <Poptip
	                class="admin-tip"
		            confirm
		            transfer
                    title="确定下架专辑及其关联歌曲吗？本操作不可恢复。"
                    @on-ok="deleteAlbum()"
                    @on-cancel="cancel">
                    <Button type="error" long style="width:360px" :disabled='canDelete'>下架该专辑</Button>
                    </Poptip>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    name:'ManageAlbum',
    data(){
        return{
            //上架专辑
            add:{
                albumid:'',
                singername:'',
                singerid:'',
                albumname:'',
                age:'',
                language:'',
                company:'',
                free:false
            },
            //下架专辑
            del:{
                albumid:'',
                singername:'',
                albumname:'',
                age:'',
                language:'',
                company:''
            },

            canDelete:true
        }
    },
    methods:{
        addAlbum(){
            for(let a in this.add){
                if (this.add[a]===''){
                    this.$Message.error('有字段未填，请补充完整！')
                    return
                }
            }
            let f= this.free==false?0:1
            AXIOS.post('/addAlbum',this.$qs.stringify({
				'id':this.add.albumid,
                'name':this.add.albumname,
                'singerid':this.add.singerid,
                'language':this.add.language,
                'company':this.add.company,
                'age':this.add.age,
                'adminid':sessionStorage.getItem('adminid'),
                'free':f
		    }),
		    {
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
				})
		    .then((response)=>{
			    if(1===response.data){
				    this.$Message.success('添加成功')
                    for (let a in this.add){
                        this.add[a]=''
                    }
                    AXIOS.get('/maxAlbumid')
                    .then((response)=>{
                        this.add.albumid=response.data
                    })
				}
	    		else{
			    	this.$Message.error('添加失败，请重试')
			    }
	    	})
        },
        searchAddid(){
            AXIOS.get('/getSingeridByName',{params:{name:this.add.singername}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.add.singerid=response.data
                }
            })
        },
        searchDelete(){
            if(this.del.singername===''||this.del.albumname===''||this.del.songname===''){
                this.$Message.error('有字段未填，请补充完整')
                return
            }
            this.del.albumid=''
            this.del.age=''
            this.del.language=''
            this.del.company=''
            this.canDelete=true
            AXIOS.get('/searchDeleteAlbum',{params:{singername:this.del.singername,albumname:this.del.albumname}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.del.albumid=response.data.albumid
                    this.del.age=response.data.albumage
                    this.del.language=response.data.language
                    this.del.company=response.data.company
                    this.canDelete=false
                }
            })
        },
        deleteAlbum(){
            AXIOS.delete('/deleteAlbum',{params:{albumid:this.del.albumid}})
            .then((response)=>{
                if(1===response.data){
                    this.$Message.success('已将专辑下架')
                    AXIOS.get('/maxAlbumid')
                    .then((response)=>{
                        this.add.albumid=response.data
                    })
                }
                else{
                    this.$Message.error('下架失败，请重试')
                }
            })
            for(let d in this.del){
                this.del[d]=''
            }
            this.canDelete=true
        }
    },
    created(){
        AXIOS.get('/maxAlbumid')
        .then((response)=>{
            this.add.albumid=response.data
        })
    }
}
</script>
<style scoped>
.manage-album{
    width:50%;
    margin:5px
}
.title-span{
    font-weight: 600;
    margin-right: 14px;
    margin-left: 14px
}
.ivu-card-body > div{
    margin-top:20px
}
</style>