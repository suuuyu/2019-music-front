<template>
    <div>
        <router-view></router-view>
        <panel></panel>
    </div>
</template>

<script>
import panel from '../components/panel/navegatorPanel'
export default {
    components: {
        'panel': panel
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
