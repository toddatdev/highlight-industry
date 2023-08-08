<template lang="html">
    <div>
        <v-list>
            <v-list-item
                :to="{ name: 'Profile' }"
                exact
            >
                <v-list-item-action>
                    <v-icon>fa-user</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                @click="$store.dispatch('logout')"
                exact
            >
                <v-list-item-action>
                    <v-icon>fa-sign-out-alt</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<style lang="scss">

</style>

<script>
export default {}
</script>
