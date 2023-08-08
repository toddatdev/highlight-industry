<template>
    <div style="height: 100%;">
        <main-toolbar>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-spacer/>
            <v-btn
                text
                @click="editUserId = 'new'"
                :disabled="loading || usersLoading"
            >
                <v-icon small>fa-plus</v-icon>
                <div v-if="!appSmall">&nbsp;Add User</div>
            </v-btn>
        </main-toolbar>
        <v-container
            style="position: absolute; top: 0; left: 0; width: 100%; z-index: 10;"
            class="text-center"
            fluid
            align-center
            justify-center
            v-if="loading"
        >
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            />
        </v-container>
        <v-simple-table
            v-if="users.length"
            class="elevation-1"
            fill-height
        >
            <thead>
            <tr>
                <th style="width: 80px;" v-if="!readOnly"></th>
                <th>Email Address</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="_user in users"
                :key="_user.username"
            >
                <td class="justify-center layout pt-1" v-if="!readOnly">
                    <v-btn
                        v-if="_user.username !== user.username"
                        small
                        color="black"
                        icon
                        :disabled="loading || usersLoading"
                        @click="editUserId = _user.username"
                    >
                        <v-icon small>fa-edit</v-icon>
                    </v-btn>
                    <v-btn
                        class="ml-0"
                        v-if="_user.username !== user.username"
                        icon
                        small
                        color="black"
                        :disabled="loading || usersLoading"
                        @click="deleteItem(_user)"
                    >
                        <v-icon small>fa-trash-alt</v-icon>
                    </v-btn>
                </td>
                <td>{{ _user.username }}</td>
                <td>{{ _user.firstname }}</td>
                <td>{{ _user.lastname }}</td>
            </tr>
            </tbody>
        </v-simple-table>
        <UserEditor
            v-if="editUserId"
            :recordId="editUserId"
            @close="editUserId = null"
        />
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserEditor from './UserEditor'
import PaginationMixin from '@/mixins/PaginationMixin'

export default {
    mixins: [PaginationMixin],
    components: {
        UserEditor
    },
    data() {
        return {
            editUserId: null,
            loading: false,
            paginationRowsPerPage: 500
        }
    },
    computed: {
        ...mapState(['user']),
        ...mapState('users', {
            users: 'data',
            usersMeta: 'meta',
            usersLoading: 'usersLoading'
        }),
        headers() {
            return [
                ...(this.readOnly ? [] : [{
                    text: '',
                    sortable: false,
                    align: 'left',
                    width: 70
                }]),
                {
                    text: 'Email Address',
                    sortable: false,
                    align: 'left',
                    value: 'username'
                },
                {
                    text: 'First Name',
                    sortable: false,
                    align: 'left',
                    value: 'firstname'
                },
                {
                    text: 'Last Name',
                    sortable: false,
                    align: 'left',
                    value: 'lastname'
                }
            ]
        }
    },
    methods: {
        ...mapActions('users', {
            find: 'find',
            deleteUser: 'delete'
        }),
        async deleteItem(user) {
            if (!window.confirm('Are you sure you want to delete this user?')) {
                return
            }
            this.loading = true
            try {
                await this.deleteUser(user.username)
                this.loading = false
            } catch (e) {
                this.loading = false
                throw e
            }
        },
        async paginationUpdated() {
            await this.findUsers()
        },
        async findUsers() {
            this.loading = true
            try {
                await this.find({
                    params: {
                        rowCount: this.pagination.rowsPerPage,
                        current: this.pagination.page
                    }
                })
                if (this.usersMeta.current > 1 && this.usersMeta.rowCount * (this.usersMeta.current - 1) > this.usersMeta.total) {
                    return this.resetPagination()
                }
                this.loading = false
            } catch (e) {
                this.loading = false
                throw e
            }
        }
    },
    async created() {
        await this.findUsers()
    }
}
</script>
