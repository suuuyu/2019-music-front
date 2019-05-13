<template>
    <div>
        <router-view></router-view>
        <menu-panel></menu-panel>
    </div>
</template>

<script>
import menuPanel from '../components/panel/navegatorPanel'
export default {
    components: {
        'menu-panel': menuPanel
    },
		name: 'inner',
		data() {
			return {

			}
		}
}
</script>

<style scoped>

</style>
