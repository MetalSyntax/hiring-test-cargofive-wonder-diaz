<template>
    <footer class="bg-dark">
        <b-container >
            <b-row>
                <b-col>
                    <div class="footer-copyright text-center text-light">
                        <p class="my-2">Copyright &copy; {{ new Date().getFullYear() }}. All rights reserved. <br>Created by <a class="text-light" href="https://metalsyntax.vercel.app/">MetalSyntax</a>.</p>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>

</style>