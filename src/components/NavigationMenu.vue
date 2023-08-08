<template type="html">
    <div
        class="nav-menu"
    >
        <div class="logo">
            <router-link :to="{name: 'Dashboard'}">
                <img src="img/logo.jpg">
            </router-link>
        </div>
        <v-list
            dark
        >
            <template
                v-for="(item, index) in items"
            >
                <hr
                    v-if="item.hr"
                    :key="index"
                />
                <v-list-item
                    v-else
                    :key="index"
                    :data-index="index"
                    :to="item.to"
                    :exact="item.exact"
                    color="white"
                >
                    <v-list-item-icon
                        style="width: 35px;margin-right: 15px; justify-content: center;"
                    >
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </div>
</template>

<style lang="scss">
.nav-menu {
    .v-list__tile--active {
        &:hover {
            background-color: #fff !important;
        }

        background-color: #fff;
    }
}
</style>

<style lang="scss" scoped>
.logo {
    text-align: center;
    padding: 7px;
    height: 63px;
    background-color: #fff;

    a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
}

hr {
    opacity: 0.4;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['user']),
        items() {
            let items = [
                // {title: 'Parts', icon: 'fa-drafting-compass', to: {name: 'Parts'}},
                {title: 'Sales Orders', icon: 'fa-cash-register', to: {name: 'Orders'}},
                {title: 'Customers', icon: 'fa-users', to: {name: 'Customers'}},
                {title: 'Inventories', icon: 'fa-plus', to: {name: 'Inventories'}},
                // {title: 'Issues Log', icon: 'fa-bug', to: {name: 'IssuesLog'}},
                // {title: 'Sales Oder Line Items', icon: 'fa-shopping-cart', to: {name: 'SalesOderLineItem'}},
                {title: 'Users list', icon: 'fa-user', to: {name: 'Users-list'}},
                {title: 'Tech Support', icon: 'fa-life-ring', to: {name: 'Support'}}
                // {title: 'Users', icon: 'fa-user', to: {name: 'Users'}, admin: true}
            ]

            if (this.user.roles !== 'ROLE_ADMIN') {
                items = items.filter(i => !i.admin)
            }

            return items
        }
    }
}
</script>
