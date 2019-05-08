<template>
    <div>
        <Tabs value="name1">
            <TabPane label="歌曲" name="name1"><Song :song=song></Song></TabPane>
            <TabPane label="歌单" name="name2"><Songlist :songlist=songlist></Songlist></TabPane>
            <TabPane label="专辑" name="name3"><Album :albums=albums></Album></TabPane>
        </Tabs>
    </div>
</template>

<script>
import mylikesong from './mylike-song'
import mylikealbum from './mylike-album'
import mylikesonglist from './mylike-songlist'
export default {
    components: {
        'Song': mylikesong,
        'Songlist': mylikesonglist,
        'Album': mylikealbum
    },
    name: 'mylike',
    props: ['user', 'sMethod', 'slMethod', 'aMethod'],
    data () {
        return {
            song: {

            },
            songlist: {

            },
            albums: {

            }
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.ivu-tabs-nav-container{
    font-size: 16px !important;
}
</style>


