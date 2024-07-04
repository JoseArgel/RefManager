<template>
    <v-app-bar id="core-app-bar" absolute color="transparent" flat height="88">
        <v-toolbar-title class="font-weight-light align-self-center">
            <v-btn v-show="!responsive" icon @click.stop="onClick">
                <v-icon>mdi-view-list</v-icon>
            </v-btn>
            {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items class="flex-fill">
            <v-row align="center" class="mx-0">
                <v-text-field class="mr-4 purple-input" color="purple" label="Search..." hide-details />

                <v-btn height="48" icon @click="toggleTheme">
                    <v-icon color="tertiary">mdi-theme-light-dark</v-icon>
                </v-btn>

                <v-btn to="/#" height="48" icon>
                    <v-icon color="tertiary">mdi-account</v-icon>
                </v-btn>
            </v-row>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'pinia';
import { useAppStore } from '../../stores/app';
import { useDisplay, useTheme } from 'vuetify';

export default {
    setup() {
        const theme = useTheme();
        const cookieTheme = useCookieTheme();

        return {
            theme,
            toggleTheme: () => {
                const themeValue = theme.global.current.value.dark ? 'light' : 'dark';
                theme.global.name.value = themeValue;
                cookieTheme.value = themeValue;
            },
        };
    },

    computed: {
        responsive() {
            const display = useDisplay();
            return display.lgAndUp.value;
        },
    },

    watch: {
        $route(val) {
            this.title = val.name;
        },
    },

    created() {
        this.setDrawer(this.responsive);
        this.title = this.$route.name;
    },

    methods: {
        ...mapActions(useAppStore, ['setDrawer', 'toggleDrawer']),
        onClick() {
            this.setDrawer(!useAppStore().drawer);
        },
    },
};
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
    width: auto;
}

#core-app-bar a {
    text-decoration: none;
}
</style>