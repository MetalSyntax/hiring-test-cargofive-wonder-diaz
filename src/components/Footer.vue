<template>
    <footer class="bg-dark footer-copyright">
        <b-container >
            <b-row>
                <b-col>
                    <div class="text-center text-light">
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
.bg-dark {
    --bs-bg-opacity: 1;
    background-color:#020e28 !important;
}
</style>