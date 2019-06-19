<template>
    <div style="display:flex">
        <div class="manage-song">
            <Card style="margin-bottom:10px">
                <p slot="title"><Icon style="font-size:18px" type="md-add-circle" />上架歌曲</p>
                <div>
                <span class="title-span">歌曲id</span>
                <Input placeholder="自动填充" style="width: 300px" v-model='add.songid' disabled/>
                </div>
                <div>
                <span class="title-span">歌手名</span>
                <Select
                v-model="add.singername"
                filterable
                remote
                :remote-method="fuzzySingerSearch1"
                :loading="sloading">
                <Option v-for="(option, index) in singerResult1" :value="option.singername" :key="index">{{option.singername}}</Option>
                </Select>
                </div>
                <div>
                <span class="title-span">专辑名</span>
                <AutoComplete
                v-model="add.albumname"
                :data="albumResult1"
                placeholder="点击，从下拉框选择"
                style="width:200px"
                @on-focus="addfill">
                </AutoComplete>
                </div>
                <div>
                <span class="title-span">专辑id</span>
                <Input search placeholder="请点击搜索按钮获取，自动填充" @click.native='searchAddid' style="width: 300px"  v-model='add.albumid' disabled/>
                </div>
                <div>
                <span class="title-span">歌名</span>
                <Input placeholder="输入歌名" style="width: 100px" v-model='add.songname' />
                <span class="title-span">时长</span>
                <Input placeholder="分" style="width: 49px" v-model='add.minute' />
                <span>:</span>
                <Input placeholder="秒" style="width: 49px" v-model='add.second' />
                </div>
                <Modal
                    v-model="modal1"
                    title="专辑详情"
                    >
                    <p><b>{{add.albumname}}有如下歌曲</b></p>
                    <Row>
                    <Col span="6"><b>歌曲id</b></Col>
                    <Col span="6"><b>歌曲名</b></Col>
                    <Col span="6"><b>语言</b></Col>
                    <Col span="6"><b>公司</b></Col>
                    </Row>
                    <Row v-for="(s,i) in songResult1" style="margin-bottom:8px">
                    <Col span="6">{{s.songid}}</Col>
                    <Col span="6">{{s.songname}}</Col>
                    <Col span="6">{{s.language}}</Col>
                    <Col span="6">{{s.company}}</Col>
                    </Row>
                </Modal>
                <div>
                <span class="title-span">语言</span>
                <Input placeholder="输入歌曲语言" style="width: 100px" v-model='add.language' />
                <span class="title-span">流派</span>
                <Input placeholder="输入歌曲流派" style="width: 100px" v-model='add.school' />
                </div>
                <div>
                <span class="title-span">公司</span>
                <Input placeholder="输入发行公司" style="width: 100px" v-model='add.company' />
                <span class="title-span">年代</span>
                <Input placeholder="年代" style="width: 100px" v-model='add.age' />
                </div>
                <Upload
                type="drag"
                id="uploadFile1"
                :before-upload="clearFile1()"
                action="http://localhost:8081/uploadSongImg">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽上传歌曲封面</p>
                </div>
                </Upload>
                <Upload
                type="drag"
                id="uploadFile2"
                :before-upload="clearFile2()"
                action="http://localhost:8081/uploadSong">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽上传歌曲文件</p>
                </div>
                </Upload>
                <div>
                    <Checkbox v-model="add.free">是否收费(专辑收费时本项无效)</Checkbox>
                </div>
                <div>
                    <Button type="success" long style="width:360px" @click="addSong()">提交</Button>
                </div>
            </Card>
            <Card style="margin-bottom:10px">
                    <p slot="title">上传歌曲（听歌识曲）</p>
                    <Upload
                        type="drag"
                        ref="upload"
                        action="http://localhost:8081/upload"
                        :format="['wav']"
                        :on-success="handleSuccess"
                        :on-format-error="handleFormatError"
                        :before-upload="handleBeforeUpload"
                        >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>
                </Card>
            <Card>
                    <p slot="title"><Icon style="font-size:18px" type="md-trash" />下架歌曲</p>
                    <p style="margin-top:11px">搜索想要进行操作的歌曲</p>
                    <div>
                    <span class="title-span">歌手名</span>
                    <Select
                v-model="del.singername"
                filterable
                remote
                :remote-method="fuzzySingerSearch2"
                :loading="sloading">
                <Option v-for="(option, index) in singerResult2" :value="option.singername" :key="index">{{option.singername}}</Option>
                </Select>
                    </div>
                    <div>
                    <span class="title-span">专辑名</span>
                    <AutoComplete
                v-model="del.albumname"
                :data="albumResult2"
                placeholder="点击，从下拉框选择"
                style="width:200px"
                @on-focus="adelfill"
                >
                </AutoComplete>
                    </div>
                    <div>
                    <span class="title-span">歌曲名</span>
                    <AutoComplete
                v-model="del.songname"
                :data="songResult2"
                placeholder="点击，从下拉框选择"
                style="width:200px"
                @on-focus="sdelfill">
                </AutoComplete>
                    </div>
                    <div>
                        <Button type="primary" shape="circle" icon="md-search" @click="searchDelete()"></Button>
                    </div>
                    <div>
                        <p>您查询到的歌曲其他信息如下</p>
                    </div>
                    <Row>
                        <Col span="4"><b>歌曲id</b></Col>
                        <Col span="4"><b>时长</b></Col>
                        <Col span="4"><b>语言</b></Col>
                        <Col span="4"><b>流派</b></Col>
                        <Col span="4"><b>年代</b></Col>
                        <Col span="4"><b>发行公司</b></Col>
                    </Row>
                    <Row>
                        <Col span="4" v-model='del.songid'>{{del.songid}}</Col>
                        <Col span="4" v-model='del.length'>{{del.length}}</Col>
                        <Col span="4" v-model='del.language'>{{del.language}}</Col>
                        <Col span="4" v-model='del.school'>{{del.school}}</Col>
                        <Col span="4" v-model='del.age'>{{del.age}}</Col>
                        <Col span="4" v-model='del.company'>{{del.company}}</Col>
                    </Row>
                    <div>
                        <Poptip
                        class="admin-tip"
                        confirm
                        transfer
                        title="确定下架歌曲吗？本操作不可恢复。"
                        @on-ok="deleteSong()"
                        @on-cancel="cancel">
                        <Button type="error" long style="width:360px" :disabled='canDelete'>下架该歌曲</Button>
                        </Poptip>
                    </div>
                </Card>
        </div>
        <div class="manage-song">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-mic" />歌曲库</p>
                <p>越往前的歌曲添加得越晚</p>
                <Page :total="SongCnt" :page-size="35" show-total  @on-change="changePage"></Page>
                <div>
                    <Row>
                    <Col span="6"><b>歌曲id</b></Col>
                    <Col span="6"><b>歌曲名</b></Col>
                    <Col span="6"><b>歌手</b></Col>
                    <Col span="6"><b>公司</b></Col>
                    </Row>
                </div>
                <div>
                    <Row v-for="(s,i) in pageList" :class="i%2==0?'clg':'clw'" style="margin-bottom:14px">
                    <Col span="6">{{s.songid}}</Col>
                    <Col span="6">{{s.songname}}</Col>
                    <Col span="6">{{s.singer}}</Col>
                    <Col span="6">{{s.company}}</Col>
                    </Row>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    name:'ManageSong',
    data(){
        return{
            //上架歌曲
            add:{
                songid:'',
                singername:'',
                albumname:'',
                albumid:'',
                songname:'',
                minute:'',
                second:'',
                language:'',
                school:'',
                company:'',
                age:'',
                free:false
            },
            //下架歌曲
            del:{
                songid:'',
                singername:'',
                albumname:'',
                albumid:'',
                songname:'',
                length:'',
                language:'',
                school:'',
                company:'',
                age:''
            },
            //允许删除
            canDelete:true,
            SongCnt:0,
            pageList:[],
            singerKey1:"",
            singerKey2:"",
            albumKey1:"",
            albumKey2:"",
            songKey:"",
            singerResult1:[],
            singerResult2:[],
            albumResult1:[],
            albumResult2:[],
            songResult1:[],
            songResult2:[],
            sloading:false,
            modal1:false
        }
    },
    methods:{
        handleSuccess(res,file){
            console.log(res)
            console.log(file)
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件' + file.name + '格式不正确，请上传wav格式'
            });
        },
        handleBeforeUpload () {
            console.log("before upload")
        },
        addSong(){
            for(let a in this.add){
                if (this.add[a]===''){
                    this.$Message.error('有字段未填，请补充完整！')
                    return
                }
            }
            if (parseInt(this.add.minute)>59
            ||parseInt(this.add.minute)<0
            ||parseInt(this.add.second)>59
            ||parseInt(this.add.second)<0
            ||isNaN(parseInt(this.add.minute))
            ||isNaN(parseInt(this.add.second))){
                this.$Message.error('时长字段不正确。规则：分和秒为0~59间的整数。')
                return
            }
            let f= this.add.free==false?1:0
            AXIOS.post('/addSong',this.$qs.stringify({
				'id':this.add.songid,
                'name':this.add.songname,
                'albumid':this.add.albumid,
                'length':60*parseInt(this.add.minute)+parseInt(this.add.second),
                'language':this.add.language,
                'school':this.add.school,
                'company':this.add.company,
                'age':this.add.age,
                'singername':this.add.singername,
                'adminid':sessionStorage.getItem('adminid'),
                'free':f,
                'songpath':'https://2019-music-1258503590.cos.ap-shanghai.myqcloud.com/songs/'+this.add.singername+'.mp3',
                'songimg':'https://2019-music-1258503590.cos.ap-shanghai.myqcloud.com/images/songs/'+this.add.songname+'.jpg'
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
                    AXIOS.get('/maxSongid')
                    .then((response)=>{
                        this.add.songid=response.data
                    })

				}
	    		else{
			    	this.$Message.error('添加失败，请重试')
			    }
	    	})
        },
        searchAddid(){
            AXIOS.get('/getAlbumidBySAName',{params:{sname:this.add.singername,aname:this.add.albumname}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.add.albumid=response.data
                    AXIOS.get("/getSongsInAlbum",{params:{albumId:this.add.albumid}})
                    .then((res)=>{
                        this.modal1=true
                        this.songResult1=res.data
                    })

                }
            })
        },
        deleteSong(){
            AXIOS.delete('/deleteSong',{params:{songid:this.del.songid}})
            .then((response)=>{
                if(1===response.data){
                    this.$Message.success('已将歌曲下架')
                    AXIOS.get('/maxSongid')
                    .then((response)=>{
                        this.add.songid=response.data
                    })
                    this.changePage(1)
                }
                else{
                    this.$Message.error('下架失败，请重试')
                }
            })
            for(let d in this.del){
                this.del[d]=''
            }
            this.canDelete=true
        },
        searchDelete(){
            if(this.del.singername===''||this.del.albumname===''||this.del.songname===''){
                this.$Message.error('有字段未填，请补充完整')
                return
            }
            this.del.songid=''
            this.del.length=''
            this.del.language=''
            this.del.school=''
            this.del.company=''
            this.del.age=''
            this.canDelete=true
            AXIOS.get('/searchDeleteSong',{params:{singername:this.del.singername,albumname:this.del.albumname,songname:this.del.songname}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.del.songid=response.data.songid
                    this.del.length=response.data.length
                    this.del.language=response.data.language
                    this.del.school=response.data.songschool
                    this.del.company=response.data.company
                    this.del.age=response.data.songage
                    this.canDelete=false
                }
            })
        },
        getSongs(index){
                    AXIOS.get('/getSongs',{params:{pgnum:index}})
                    .then((response)=>{
                        this.pageList=response.data
                    })

        },
        changePage(index){
            this.pageList = this.getSongs(index-1);
        },
        fuzzySingerSearch1 (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzySingers?singername='+query).
                        then(res=>{
                            this.singerResult1=res.data
                        })
                    }, 200);
                } else {
                    this.singerResult1 = [];
                }
            },
        fuzzySingerSearch2 (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzySingers?singername='+query).
                        then(res=>{
                            this.singerResult2=res.data
                        })
                    }, 200);
                } else {
                    this.singerResult2 = [];
                }
            },
            fuzzyAlbumSearch1 (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzyAlbums?albumname='+query).
                        then(res=>{
                            this.albumResult1=res.data
                        })
                    }, 200);
                } else {
                    this.albumResult1 = [];
                }
            },
        fuzzyAlbumSearch2 (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzyAlbums?albumname='+query).
                        then(res=>{
                            this.albumResult2=res.data
                        })
                    }, 200);
                } else {
                    this.albumResult2 = [];
                }
            },
            fuzzySongSearch (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzySongs?songname='+query).
                        then(res=>{
                            this.songResult=res.data
                        })
                    }, 200);
                } else {
                    this.songResult = [];
                }
            },
            clearFile1(){
            let _this=this
            setTimeout(()=>{
                _this.$refs.uploadFile1.clearFiles()
            },3000)
            },
            clearFile2(){
            let _this=this
            setTimeout(()=>{
                _this.$refs.uploadFile2.clearFiles()
            },3000)
            },
            addfill(){
                AXIOS.get("/getAlbumBySingerName",{params:{singername:this.add.singername}})
                .then((res)=>{
                    this.albumResult1=res.data
                })
            },
            adelfill(){
                AXIOS.get("/getAlbumBySingerName",{params:{singername:this.del.singername}})
                .then((res)=>{
                    this.albumResult2=res.data
                })
            },
            sdelfill(){
                AXIOS.get("/getSongBySAName",{params:{singername:this.del.singername,albumname:this.del.albumname}})
                .then((res)=>{
                    this.songResult2=res.data
                })
            }
    },
    created(){
        AXIOS.get('/maxSongid')
        .then((response)=>{
            this.add.songid=response.data
        })
        AXIOS.get('/getSongTotal')
        .then((response)=>{
        
        this.$nextTick(()=>{
            this.SongCnt=response.data
            AXIOS.get('/getSongs',{params:{pgnum:0}})
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
.manage-song{
    width:49%;
    margin:5px;
}
.title-span{
    font-weight: 600;
    margin-right: 14px;
    margin-left: 14px
}
.ivu-card-body > div{
    margin-top:20px
}
.upload{
    margin-top:10px;
}
.clg{
    background-color: rgb(207, 207, 207)
}
.clw{
    background-color:rgb(241, 241, 241)
}
</style>