<template>
    <v-app-bar
        class="main-toolbar"
        color="primary"
        dark
        app
        fixed
        clipped-right
        extension-height="64"
        v-show="!($route.query && $route.query._screenshot)"
    >
        <v-app-bar-nav-icon
            @click.stop="setShowNav"
            v-if="appSmall"
        ></v-app-bar-nav-icon>
        <slot/>
        <v-spacer></v-spacer>
        <v-toolbar-items
            @click.stop="$store.commit('setShowUserNav', !showUserNav)"
        >
            <v-btn text v-if="!appSmall">
                {{ user.firstname || '' }} {{ user.lastname || '' }}
            </v-btn>
            <v-btn
                icon
            >
                <v-icon>fa-user</v-icon>
            </v-btn>
        </v-toolbar-items>
        <template v-slot:extension v-if="$slots.extension">
            <slot name="extension"/>
        </template>
    </v-app-bar>
</template>

<style lang="scss">
.main-toolbar {
    .v-toolbar__extension {
        background-color: #f2f2f2;
    }
}
</style>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['user', 'showNav', 'showUserNav'])
    },
    methods: {
        setShowNav() {
            console.log('show nav', this.showNav)
            this.$store.commit('setShowNav', !this.showNav)
        }
    }
}
</script>
