# music-front

# 组件介绍

## 歌单选择组件（歌曲加入歌单时调用）
* 位置：@/components/panel/songlistChoose
* 用法：
```
<songlist-choose :chooseList="chooseList" :songid="songid" :mySonglist="mySonglist"></songlist-choose>
```
* 参数说明：
* chooseList true or false 是否显示
* songid 选择歌曲的id
* mySonglist 要选择的歌单
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
