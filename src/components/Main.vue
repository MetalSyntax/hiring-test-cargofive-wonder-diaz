<template>
    <section>
        <NavBar />
        <Table />
        <Footer />
    </section>
</template>

<script>
import Table from './Table.vue'
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'

export default {
    name: 'Main',
    components: {
        Table, NavBar, Footer
    }
}
</script>

<style>

</style>