<template>
    <v-navigation-drawer id="app-drawer" v-model="inputValue" width="260" elevation="5" floating>
        <v-list-item class="text-center" two-line>
            <v-avatar color="white">
                <v-icon color="blue-darken-2">mdi-robot-excited-outline</v-icon>
            </v-avatar>

            <v-list-item-title class="title">RefManager</v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3 mb-3" />

        <v-list density="compact" nav>
            <v-list-item v-for="(link, i) in links" :key="i" :to="link.to" active-class="primary white--text">
                <template #prepend>
                    <v-icon>{{ link.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAppStore } from '../../stores/app';

export default {
    data: () => ({
        links: [
            { to: '/', icon: 'mdi-home', text: 'INICIO' },
            { to: '/fuentes', icon: 'mdi-text-box-search', text: 'FUENTES' },
            { to: '/estilos', icon: 'mdi-pencil-ruler-outline', text: 'ESTILOS' },
            { to: '/campos', icon: 'mdi-form-textbox', text: 'CAMPOS' },
            { to: '/anexar', icon: 'mdi-package-check', text: 'ANEXAR' },
            { to: '/referencia', icon: 'mdi-format-list-checkbox', text: 'REFERENCIA' },
        ],
    }),

    computed: {
        ...mapState(useAppStore, ['color']),
        inputValue: {
            get() {
                return useAppStore().drawer;
            },
            set(val) {
                this.setDrawer(val);
            },
        },
    },

    methods: {
        ...mapActions(useAppStore, ['setDrawer', 'toggleDrawer']),
    },
};
</script>
