<template>
    <v-footer id="core-footer">
        <div class="footer-items">
            <a v-for="link in links" :key="link.name" :href="link.Link" class="footer-link">
                {{ link.name }}
                <v-icon>mdi-home</v-icon>
            </a>
        </div>
        <v-spacer />
        <span class="font-weight-light copyright">
            <h3>&copy; 2024 RefManager. Todos los derechos reservados.</h3>
        </span>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: [{ name: 'INICIO', Link: '/#' }],
    }),
};
</script>

<style lang="scss">
#core-footer {
    flex: 0 0 auto;
    z-index: 0;
    margin-top: auto;
    height: 100px;
}
.copyright {
    font-size: 14px;
}
.footer-items {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
}
.footer-link {
    margin: 5px 5px 5px 0;
    text-decoration: none;
}
</style>
