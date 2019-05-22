<template>
  <Layout>
    <ul>
      <li v-for="comment in comments">
        <div class="container commentBox">
          <div class="row commentRow">
            <div class="col-md-2 commentCol">
              <img class="img-responsive center-block img-circle 
              headPortrait" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)"/>>
            </div>
            <div class="col-md-10 commentCol">
              <p class="userName">{{comment.name}}</p>
              <p class="commentText">{{comment.text}}</p>
              <p class="time">{{comment.time}}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Row class="main">
      <i-col span="12">
        <div class="input-group">
      <input type="text" class="form-control" v-model="inputPage">
      <span class="input-group-btn">
        <button v-on:click="changePage" class="btn btn-default" type=
        "button">跳转</button>
      </span>
    </div>
      </i-col>
      <i-col span="12">
        <p class="page" font-size="30px" text-align="bottom">
          {{currentPageNum}}/{{pageNum}}页</p>
      </i-col>
    </Row>
  </Layout>
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
      commentNum:Number,
      commentNumPerPage:8,
      pageNum:Number,
      currentPageNum:1,
      comments:[{name:"孟凡宇",headPortait:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)",
      text:"这是一条评论",time:"2019-5-14"}],   
    }
  },
  mounted(){
    
  },
  methods:{
    changePage:function(){
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
