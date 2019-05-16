<style scoped>
    .search-box {
        position: fixed;
        top: 18%;
        right: 30px;
        /* transform: translate(-100%, 0%); */
        background: #ffffff;
        /* height: 40px; */
        border-radius: 40px;
        padding: 10px;
        box-shadow: 0px 0px 1.5px #888888;
    }
    .search-btn {
        color: #605eee;
        float: right;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.4s;
        text-decoration: none;
    }
    .search-txt {
        border: none;
        background: none;
        outline: none;
        float: left;
        padding: 0;
        color: #605eee;
        font-size: 16px;
        transition: 0.4s;
        line-height: 40px;
        width: 0;
    }
    .search-box:hover > .search-txt {
        width: 240px;
        /* padding: 0 6px; */
    }
    .search-box:hover > .search-btn {
        background: #dee8eb;
    }
</style>


<template>
    <div class="search-box">
			<input class="search-txt" type="text" placeholder="Type to search" />
			<a class="search-btn" href="#">
				<i class="ivu-icon ivu-icon-ios-search" style="font-size: 20px;"></i>
			</a>
		</div>
</template>
