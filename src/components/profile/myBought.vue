<template>
<div>
    <Tabs value="name1">
        <TabPane label="歌曲" name="name1" class="real-panel"><mylikesong :song="songs"></mylikesong></TabPane>
    </Tabs>
</div>
</template>
<script>
import {AXIOS} from '@/http/http'
import mylikesong from './mylike-song'
import songPanel from '../panel/songPanel'
import songlistChoose from '../panel/songlistChoose'
import singerDetail from '@/components/detail/singerDetail'
export default {
    name:"myBought",
    data(){
        return{
            songs:[],
            original:[]
        }
    },
    components:{
		mylikesong,
	},
    methods:{
        getBoughtSong(){
            AXIOS.get('/showBoughtSongs',{params:{id:sessionStorage.getItem('userid')}})
            .then((res)=>{
                this.$nextTick(()=>{
                    this.songs=res.data
                })
            })
        }
    },
    created(){
        this.getBoughtSong();
        /*AXIOS.get('/showBoughtSongs',
        {params:{id:sessionStorage.getItem('userid')}})
        .then((res)=>{
            this.songs=res.data
        })*/
    }
}
</script>
<style scoped>
</style>

