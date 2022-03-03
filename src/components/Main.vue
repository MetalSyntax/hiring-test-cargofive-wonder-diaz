<template>
    <section>
        <NavBar />
        <Table />
    </section>
</template>

<script>
import Table from './Table.vue'
import NavBar from './NavBar.vue'

export default {
    name: 'Main',
    components: {
        Table, NavBar
    }
}
</script>

<style>

</style>