<template>
    <div class="searchPage">
        
        <div class="mod_search"  role="search" @click="hideBox">
            <!-- 搜索框 -->
            <div class="mod_search_input" id="search_group">
                <input class="search_input__input" aria-label="请输入搜索内容" type="text" placeholder="搜索关键字" @input="inputFun" v-model="inputValue" @click="showBox">
                <button 
                    @click="showLoading=true" 
                    @mouseover="showTips=true"
                    @mouseout="showTips=false"
                    data-tooltip="我是一个3cbest.com提示"
                    class="search_input__btn"
                    :class="{ 'hoverBtn':showTips==true}">
                    <Tooltip content="来试试最新上线的听歌识曲功能吧" theme=light>
                        <Icon type="ios-microphone" size="18"/>
                    </Tooltip>
                    <span class="icon_txt">搜索</span>
                </button>
            </div>
            <!-- <div class="mod_search_tips">
                热门搜索：
                <a  class="search_tips__item " data-name="流浪">流浪</a>
                <a  class="search_tips__item " data-name="去年夏天">去年夏天</a>
                <a  class="search_tips__item " data-name="周杰伦">周杰伦</a>
                <a  class="search_tips__item " data-name="年少有为">年少有为</a>
                <a  class="search_tips__item " data-name="不染">不染</a>
            </div> -->
            <div class="js_smartbox" id="smartBox">
                <!-- 搜索历史 -->
                <transition name="draw">
                    <div class="mod_search_other" id="search_other" v-if="showHis">
                        <div class="search_history">
                            <dl class="search_history__list">
                                <dt class="search_history__tit">搜索历史
                                    <a  class="search_history__clear" @click.stop="clearAllHis">
                                    <Icon type="md-trash" size="18" />
                                    <span class="icon_txt" >清空</span></a>
                                </dt>
                                <dd class="search_history__item" :key="index" v-for="(item,index) in searchHis" @mouseover="hoverIndex=index" @mouseout="hoverIndex=-1" :class="{ 'hoverBg':index==hoverIndex}">
                                    <div  class="search_history__link">{{item}}</div>
                                    <a class="search_history__delete" title="删除" @click.stop="clearItem(index)">
                                        <Icon type="md-close" size="18" class="search_history__icon_delete"/>
                                        <span class="icon_txt">删除</span>
                                    </a>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </transition>
                <!-- 搜索联想 -->
                <transition name="draw">
                    <div class="mod_search_result" id="search_result" style="" v-show="showRes">
                            <!--单曲区域_S-->
                            <div class="search_result__sort">
                                <h4 class="search_result__tit"><Icon type="md-musical-notes" size="18" class="search_result__tit_icon" />单曲</h4>
                                <ul class="search_result__list">
                                    <li :key="index" v-for="(item,index) in searchSong">
                                        <a class="search_result__link" @click="switchTab(0)">
                                            <span class="search_result__name" v-html="item.songname"></span>
                                            <!-- -<span class="search_result__singer">{{item.singerName}}</span> -->
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <!--歌手区域_S-->
                            <div class="search_result__sort">
                                <h4 class="search_result__tit"><Icon type="ios-contact" size="18" class="search_result__tit_icon"/>歌手</h4>
                                <ul class="search_result__list">
                                    <li :key="index" v-for="(item,index) in searchSinger">
                                        <a class="search_result__link" @click="switchTab(3)">
                                            <span class="search_result__name" v-html="item.singername"></span>
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                            <!--专辑区域_S-->
                            <div class="search_result__sort">
                                <h4 class="search_result__tit"><Icon type="ios-albums" size="18" class="search_result__tit_icon"/>专辑</h4>
                                <ul class="search_result__list">
                                    <li :key="index" v-for="(item,index) in searchAlbum">
                                        <a class="search_result__link" @click="switchTab(1)">
                                            <span class="search_result__name" v-html="item.albumname"></span>
                                        </a>
                                    </li>		
                                    
                                </ul>
                            </div>
                       </div>
                    </transition>
                </div>
                
        </div>
        <!-- 搜索结果 -->
        <div class="result">
            <div class="mod_tab" role="nav">
                <a :key="index" v-for="(item,index) in tabsDisplay" @click="switchTab(index)" class="mod_tab__item" :class="{ 'mod_tab__current':index==selectedTab}">
                    {{item}}
                </a>
            </div>
            <Song :song=song v-if="selectedTab==0"></Song>
            <Album :albums=albums v-if="selectedTab==1"></Album>
            <Songlist :songlist=sl v-if="selectedTab==2"></Songlist>
            <show-user :type='2' :user='singer' v-if="selectedTab==3"></show-user>
        </div>
        <!-- 搜索动态按钮 -->
        <transition name="draw" :duration="500">
            <div class="search_btn" v-if="btnShow">
                <searchBtn></searchBtn>
            </div>
        </transition>

        <!-- 遮罩层 -->
        <div class='popContainer' v-if="showLoading" > 
            <loading @closeLoading="hideLoading"> </loading>
        </div>

        <!-- 上传文件 -->
        <!-- <div class="container">
            <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
                <button v-on:click="submitFile()">Submit</button>
            </div>
        </div> -->
        
    </div>
</template>

<script>
import mylikesong from '../components/profile/mylike-song'
import mylikealbum from '../components/profile/mylike-album'
import mylikesonglist from '../components/profile/mylike-songlist'
import showUser from '@/components/panel/showUser'
import searchBtn from '../components/search/searchBtn'
import loading from '../components/search/loading'
import { AXIOS } from '../http/http';

export default {
    mounted(){
        // this.getSongs('')
        // 注册页面滚动事件监听器
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed(){
        // 销毁页面滚动事件监听器
        window.removeEventListener('scroll', this.handleScroll)
    },
    data () {
			return {
                song: [],
                album: [],
                sl: [],
                singer: [],
                selectedTab: 0,
                tabsDisplay: ["单曲","专辑","歌单", "歌手"],
                searchSong: [{songName: "爱在西元前",singerName:"周杰伦"}],
                searchAlbum: [{songName: "爱在西元前",singerName:"周杰伦"}],
                searchSinger: [],
                searchHis: ["爱","我相信","周杰伦"],
                hoverIndex: -1, //表示当前hover的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
                inputValue: "",
                showHis: false,
                showRes: false,
                showTips: false,
                showLoading: false,
                btnShow: false,
                canSearch: true,
                
			}
        },
    components: {
			'Song': mylikesong,
			'Songlist': mylikesonglist,
            'Album': mylikealbum,
            'searchBtn': searchBtn,
            'loading': loading,
            'show-user': showUser
    },
    methods: {
        clearAllHis(e){
            e.stopPropagation();
            console.log("clear")
            this.searchHis.splice(0,this.searchHis.length)
        },
        clearItem(index){
            console.log(index)
            this.searchHis.splice(index,1)
        },
        handleScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 105){
                this.btnShow = true
            }
            else{
                this.btnShow = false
            }

        },
        showBox(){
            console.log("showbox")
            if(this.inputValue == ""){
                this.showHis = !this.showHis
            }
        },
        hideBox(event){
            console.log("hidebox")
            var sp = document.getElementById("search_group");
            if(sp){
                //如果我们点击到了id为myPanel以外的区域
                if(!sp.contains(event.target)){            
                    this.showHis = false;
                    this.showRes = false;
                }
            }
        },
        hideLoading(msg){
            this.showLoading = false
            console.log(msg)
        },
        inputFun(e){
            if (this.canSearch) {
                if(e.target.value == ""){
                    this.showHis = true
                    this.showRes = false
                    return
                }
                this.canSearch = false
                console.log(e.target.value)
                this.getSongs(e.target.value)
                this.getAlbums(e.target.value)
                this.getSingers(e.target.value)
                this.showHis = false
                this.showRes = true
                setTimeout(() => {
                    this.canSearch = true
                }, 100);
            }
            
        },
        switchTab(index){
            this.selectedTab = index;
            console.log(this.tabsDisplay[index])
        },
        getSongs(words) {
				AXIOS.get('/Search/Song?words=' + words)
				.then(respond => {
                    this.song = respond.data
                    // 深复制JSON.parse(JSON.stringify(a))
                    if (respond.data.length == 0){
                        this.searchSong = [{songname: "暂无匹配"}]
                    }
                    else{
                        this.searchSong = this.changeColor(
                            JSON.parse(JSON.stringify(respond.data.slice(0,4)))
                            ,"song")
                    }
                    
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取歌曲出错',
							desc: error ? error : '未知错误'
					})
				})
            },
        getAlbums(words){
            AXIOS.get('/Search/Album?words=' + words)
				.then(respond => {
                    this.albums = respond.data
                    if (respond.data.length == 0){
                        this.searchAlbum = [{albumname: "暂无匹配"}]
                    }
                    else{
                        this.searchAlbum = this.changeColor(
                            JSON.parse(JSON.stringify(respond.data.slice(0,3)))
                            ,"album")
                    }
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取专辑出错',
							desc: error ? error : '未知错误'
					})
				})

        },
        getSingers(words){
            AXIOS.get('/searchSinger?word=' + words)
				.then(respond => {
                    this.singer = respond.data
                    console.log(this.singer)
                    if (respond.data.length == 0){
                        this.searchSinger = [{singername: "暂无匹配"}]
                    }
                    else{
                        this.searchSinger = this.changeColor(JSON.parse(JSON.stringify(respond.data.slice(0,3)))
                        ,"singer")
                    }
					
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取歌手出错',
							desc: error ? error : '未知错误'
					})
				})

        },
        getSongLists(words){
            AXIOS.get('/Search/SongList?words=' + words)
				.then(respond => {
					this.sl = respond.data
				})
				.catch(error => {
					this.$Notice.error({
							title: '获取歌单出错',
							desc: error ? error : '未知错误'
					})
				})
        },
        // search(words){
        //     if(this.selectedTab == 0){
        //         this.getSongs(words)
        //     }
        //     else if(this.selectedTab == 1){
        //         this.getAlbums(words)
        //     }
        //     else if(this.selectedTab == 2){
        //         this.getSongLists(words)
        //     }
        //     else if(this.selectedTab == 3){
        //         this.getSingers(words)
        //     }
        // },
        // 高亮显示关键词
        changeColor (resultsList,type="song") {
            resultsList.map(
                (item, index) => {
                    // console.log('item', item)
                    if (this.inputValue && this.inputValue.length > 0) {
                        // 匹配关键字正则
                        let replaceReg = new RegExp(this.inputValue, 'g')
                        // 高亮替换v-html值
                        let replaceString =
                            "<span style='color: blue'>" + this.inputValue + '</span>'
                        if(type === "song"){
                            resultsList[index].songname = item.songname.replace(
                                replaceReg,
                                replaceString
                            )
                        }
                        else if(type == "singer"){
                            resultsList[index].singername = item.singername.replace(
                                replaceReg,
                                replaceString
                            )
                        }
                        else if(type == "album"){
                            resultsList[index].albumname = item.albumname.replace(
                                replaceReg,
                                replaceString
                            )
                        }
                    
                }
            })
            return resultsList
        }

    }
}
</script>

<style scoped>

.popContainer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
}

/* 选中时不再标注 */
input:focus{
    outline: 0; 
}

li {
    list-style: none; /*去掉小圆点*/
}

dd, dt {
    line-height: 36px;
}

dl {
    margin: 0%;
}

.mod_search {
    position: relative;
    height: 300px;
    background-position: 50%;
    background-size: cover;
    background-image:url(../image/bg.jpg);
}

.mod_search .mod_search_input {
    width: 639px;
    height: 50px;
    position: relative;
    border: 0 none;
    border-radius: 5px;
    padding: 0 70px 0 15px;
    line-height: 50px;
    left: 50%;
    top: 105px;
    margin-top: 0;
    margin-left: -322px;
    background: #fff;
}

.search_input__input {
    width: 554px;
    height: 50px;
    border: 0 none;
    font-size: 14px;
    background: 0 0;
    -webkit-transition: width .6s ease-out,visibility .6s 1ms ease-out;
    transition: width .6s ease-out,visibility .6s 1ms ease-out;
}

.draw-enter-active, .draw-leave-active {
    /* transition: all 3s ease; */
    transition: opacity .5s;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    /* height: 0; */
    opacity: 0;
}

.hoverBg{
   background: rgb(182, 117, 226);
   color: #fff !important;
 }

.search_btn{
    position: relative;
    z-index:999;
}

.mod_search_tips {
    margin-top: 124px;
    text-align: center;
    color: #fff;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.5;
    font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
}

.mod_search .search_input__btn {
    width: 50px;
    height: 50px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.hoverBtn{
    color: white;
    background-color: #055cff !important;
}

.search_input__btn {
    position: absolute;
    top: 0;
    right: 0;
    border: 0 none;
    width: 38px;
    height: 35px;
    overflow: visible;
    background: 0 0;
}

.icon_txt {
    font: 0/0 a;
}

.search_tips__item {
    margin-right: 20px;
    color: #fff;
}

.drop {
    visibility: visible;
    max-height: 800px;
    transition: max-height .6s ease-out,visibility 1ms .01s;
}

.mod_search .mod_search_other, .mod_search .mod_search_result {
    top: 154px;
    left: 50%;
    margin-left: -322px;
    background: #fff;
    width: 639px;
    overflow: hidden;
}

.mod_search_result {
    position: absolute;
    top: 63px;
    left: 0;
    background: #FFF;
    width: 218px;
    border: 1px solid #c9c9c9;
    z-index: 9;
    text-align: left;
    font-size: 14px;
}

.mod_search .search_result__sort {
    position: relative;
    padding: 0;
    border-top: 0;
}

.search_result__sort {
    padding: 5px 0;
    border-top: solid 1px #f2f2f2;
    margin-top: -1px;
}

.mod_search .search_result__tit {
    position: absolute;
    top: 5px;
    left: 0;
    width: 48px;
    white-space: nowrap;
}
.search_result__link, .search_result__tit {
    padding: 0 11px 0 41px;
    line-height: 36px;
    color: #999;
}

.search_result__tit {
    position: relative;
    line-height: 40px;
    color: #999;
    font-weight: 400;
    font-size: 14px;
    padding-left: 3%;
}

.search_result__keyword {
    color: #31c27c;
}

.search_result__tit_icon{
    margin-right: 5px;
    margin-bottom: 2px;
}

.mod_search .search_result__list {
    border-left: 1px solid #d4d4d4;
    border-top: 1px solid #f2f2f2;
    margin-left: 92px;
    padding: 5px 0;
}

.mod_search_other {
    position: absolute;
    top: 63px;
    left: 0;
    background: #FFF;
    width: 218px;
    border: 1px solid #c9c9c9;
    z-index: 8;
    text-align: left;
    font-size: 14px;
    line-height: 36px;
}

.search_history {
    padding: 5px 0;
    border-bottom: 1px solid #f2f2f2;
}

.search_history__link, .search_history__tit {
    padding-left: 11px;
}

.search_history__tit {
    color: #999;
    position: relative;
}

.search_history__clear {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 36px;
    font-size: 2px;
    text-align: center;
}


.search_history__item {
    position: relative;
    color: #333;
}

.search_history__delete {
    /* display: none; */
    position: absolute;
    top: 0;
    right: 0;
    width: 33px;
    /* height: 36px; */
    font-size: 2px;
    text-align: center;
}

.search_history__icon_delete {
    position: absolute;
    top: 50%;
    right: 15px;
    margin-top: -6px;
    width: 12px;
    height: 12px;
    background-position: 0 -240px;
    color: rgb(255, 255, 255);
}

.search_history__link {
    display: block;
    padding-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.result{
    width: 80%;
    margin: 0 auto;
}

.mod_tab {
    position: relative;
    zoom: 1;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 30px;
}
.mod_tab, .mod_tab__item {
    height: 56px;
    line-height: 56px;
}

.mod_tab__item {
    position: relative;
    float: left;
    font-size: 16px;
    overflow: hidden;
    margin-right: 55px;
    color: #333;
}
.mod_tab, .mod_tab__item {
    height: 56px;
    line-height: 56px;
}   

.mod_tab__current {
    color: #055cff;
}
</style>
