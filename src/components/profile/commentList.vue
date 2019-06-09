<template>
  <div>
      <ul class="comment__list js_all_list"> 
        <li class="comment__list_item c_b_normal js_cmt_li" v-for="(comment, index) in comments" :key="index">
            <a class="comment__avatar js_nick" >
              <img class="js_lazy_comment_pic" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000';this.onerror=null"  style="display: block; visibility: visible;" src="//y.gtimg.cn/music/photo_new/T001R300x300M000002RaR8P3WLVH5.jpg?max_age=2592000">
            </a>
          <h4 class="comment__title">
            <router-link class="c_tx_thin js_nick js_nick_only" :to="'/profile/' + comment.userid + '/mylike'" :key="comment.userid">{{comment.name}}</router-link>
          </h4>
          <p class="c_tx_normal comment__text js_hot_text" >{{comment.text}}</p>
          <div class="comment__opt js_comment_opt" >
              <span class="comment__date c_tx_thin">{{comment.time}}</span>
          </div>
        </li>
      </ul>
      <Page :total="commentNum" :page-size="commentNumPerPage" show-elevator @on-change="changePage"/>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { AXIOS } from '../../http/http';
export default{
  props:["commentList"],
  name:'commentList',
  data(){
    return{
      inputPage:1,
      commentNum: 0,
      commentNumPerPage:8,
      pageNum: 0,
      currentPageNum:1,
      comments:[{name:"孟凡宇",headPortait:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)",
      text:"这是一条评论",time:"2019-5-14"}],   
    }
  },
  mounted(){
    console.log(this.commentList)
  },
  methods:{
    changePage(inputPage){
      this.inputPage = inputPage
      if(this.inputPage <= 0 || this.inputPage > this.pageNum){
        this.inputPage = 1;
        alert("无效输入！");
      }else{
        var inputPage = this.inputPage;
        this.currentPageNum = inputPage;
        var commentList1 = this.commentList.slice(this.commentNumPerPage*
        (this.currentPageNum-1),this.commentNumPerPage*this.currentPageNum);
        this.comments = [];
        for(let i=0; i<commentList1.length; i++){
          let comment = {};
          comment.text = commentList1[i].commenttext;
          comment.time = commentList1[i].commenttime;
          comment.name = commentList1[i].name;
          comment.userid = commentList1[i].userid
          this.comments.push(comment);
        }
      }

    },
  },
  watch:{
    commentList(){
      var List = this.commentList;
      this.comments = [];
      this.commentNum = List.length;
      this.pageNum = Math.floor((this.commentNum-1)/
      this.commentNumPerPage + 1);
      for(let i=0; i<this.commentList.length; i++){
        let comment = {};
        comment.text = List[i].commenttext;
        comment.time = List[i].commenttime;
        comment.headPortait = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)";
        comment.name = List[i].name;
        comment.userid = List[i].userid
        this.comments.push(comment);
        if(i == 7){
          break;
        }
      }
    },
  },
}
</script>
<style scoped>
 .mod_all_comment {
    margin-bottom: 46px;
}
.comment_type__title {
    position: relative;
    height: 34px;
    line-height: 34px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #ededed;
}
.comment_type__title h2 {
    font-weight: 400;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.comment__list {
  min-height: 100px;
  padding-bottom: 14px;
}
.comment__list_item {
    position: relative;
    padding: 15px 0 15px 56px;
    zoom: 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #ededed;
}
.comment__avatar {
    position: absolute;
    left: 0;
    top: 20px;
    width: 38px;
    height: 38px;
}
.comment__avatar img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 999px;
}
.comment__title {
    font-weight: 400;
    margin-bottom: 6px;
    overflow: hidden;
    height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.comment__title a, .comment__title span {
    float: left;
}
.comment__text {
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 24px;
    text-align: justify;
}
.comment__opt {
    line-height: 24px;
    text-align: right;
    overflow: hidden;
}
.comment__date {
    float: left;
    line-height: 28px;
}
.comment__zan {
    vertical-align: -1px;
}
.comment__delete, .comment__good, .comment__link, .comment__report, .comment__zan {
    margin-right: 22px;
}
.main{
  width:300px;
  margin-left:750px;
  margin-top:30px;
}
.page{
  width:90%;
  margin-left:auto;
  font-size:20px;
  text-align:left;
}
.input-group{
  width:130px;
  margin-left:auto;
}
.time{
  font-size:10px;
  margin-top:10px;
  height:15px;
  width:100%;
  text-align:left;
}
.commentText{
  font-size:20px;
  margin-top:10px;
  height:100px;
  width:100%;
  text-align: left;
}
.userName{
  text-align:left;
  font-size:25px;
  margin-top:10px;
  height:40px;
  width:100%;
}
.headPortrait{
  width:100px;
  margin-top:45px;
  margin-left:10px;
}
.commentCol{
  height:100%;
}
.commentRow{
  height:200px;
  width:100%;

}
.commentList{
  height:1000px;
  width:1024px;
  margin-left:auto;
  margin-right:auto;
}
.commentBox{
  border-width:1px 0px 1px 0px;
  border-style:solid;
  border-color:grey;
  height:200px;
  width:100%;
}
</style>
