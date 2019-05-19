<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Icon style="font-size:60px;color:white;margin-top:20px" type="md-contact" />
            <p><b>欢迎1000号管理员</b></p>
            <Button style='margin-bottom:15px' type=primary icon='md-exit' @click='out()'>退出登录</Button>
            <Menu active-name="1-1" width="auto" :open-names="['1']" accordion>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="md-information-circle" />
                        信息概览
                    </template>
                    <MenuItem name="1-1" @click.native="toData()">数据</MenuItem>
                    <MenuItem name="1-2" @click.native="me()">我</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="md-musical-notes" />
                        音乐管理
                    </template>
                    <MenuItem name="2-1" @click.native='song()'>歌曲管理</MenuItem>
                    <MenuItem name="2-2" @click.native='album()'>专辑管理</MenuItem>
                    <MenuItem name="2-3" @click.native='singer()'>歌手管理</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="md-contacts" />
                        用户管理
                    </template>
                    <MenuItem name="3-1" @click.native='ban()'>封禁处理</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div>
                    <p v-bind="head">{{head}}</p>
                </div>
            </Header>
            <Content :style="{padding: '0 4px 4px',margin:'16px'}">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </Content>
        </Layout>
    </div>
</template>
<script>
export default {
    name:"admin",
    data(){
        return{
            head:'信息概览/数据'
        }
    },
    methods:{
        out(){
            sessionStorage.removeItem('adminid')
            this.$Message.info({
                content: 'Bye Bye',
                duration: 3
            });
            this.$router.push('/login')
        },
        toData(){
            this.head='信息概览/数据'
        },
        me(){
            this.head='信息概览/我'
        },
        song(){
            this.head='音乐管理/歌曲管理'
            this.$router.push('/admin/ManageSong')
        },
        album(){
            this.head='音乐管理/专辑管理'
            this.$router.push('/admin/ManageAlbum')
        },
        singer(){
            this.head='音乐管理/歌手管理'
            this.$router.push('/admin/ManageSinger')
        },
        ban(){
            this.head='用户管理/封禁处理'
            this.$router.push('/admin/BanUser')
        }
    }
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .ivu-layout-sider-children>p{
        color: white;
        margin:20px auto;
        font-size: 20px;
        font-weight: 800;
        margin-top: 0
    }
    .ivu-layout-header > div > p{
        color: black;
        margin:auto;
        font-size: 20px;
        font-weight: 800;
        margin-top:0
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
.ivu-menu-item{
    background: rgb(4, 39, 59) !important;
    color:white;
    font-weight: 200 !important;
}
.ivu-menu-item:hover{
    background: rgb(6, 49, 71) !important;
}
.ivu-menu-submenu{
    background: rgb(8, 61, 92) !important;
    color:white;
    font-weight: 600;
    font-size: 16px;
}
.ivu-menu-submenu:hover{
    background: rgb(6, 54, 82) !important;
}
li > div > i{
    font-size: 19px
}
ul{
    text-align: left
}
</style>
<style>
.ivu-layout-sider-children{
    background: rgb(8, 61, 92) !important;
    text-align: center
}
</style>


