<template>
    <div class="mx-5 my-5">
        <main-toolbar>
            <v-toolbar-title>Customers</v-toolbar-title>
        </main-toolbar>
        <v-data-table
            :headers="headers"
            :items="customers"
            :items-per-page="5"
            title="Click Here For More Details"
            class="elevation-1"
            @click:row="getSingleData"
        >
        </v-data-table>


        <v-dialog
            v-model="dialog"
            width="700"
        >
            <v-card class="">
                <v-card-title class="text-h5 grey lighten-2">
                    Single Customer Data
                </v-card-title>

                <v-container class="grey lighten-5">
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Customer Number
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.CustomerNumber}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Type of Customer
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.TypeofCustomer}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Company
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Company}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Street
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Street}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Suite
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Suite}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                City
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.City}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                State
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.State}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Zip
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Zip}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Country
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Country}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                TaxExempt
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.TaxExempt}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                PaymentTerms
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.PaymentTerms}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Phone
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Phone}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Email
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Email}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Fax
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Fax}}
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-card
                                class="pa-2 font-weight-bold"
                                outlined
                                tile
                            >
                                Title
                            </v-card>
                        </v-col>

                        <v-col
                            cols="12"
                            md="8"
                        >
                            <v-card
                                class="pa-2"
                                outlined
                                tile
                            >
                                {{selectedRow.Title}}
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>

    </div>

</template>

<style lang="scss"></style>

<script>

import get from "lodash/get";

export default {
    components: {},
    data() {

        return {
            headers: [
                {text: 'Customer Number', align: 'start', sortable: false, value: 'CustomerNumber'},
                { text: 'Type of Customer', value: 'TypeofCustomer' },
                { text: 'Company', value: 'Company' },
                { text: 'Street', value: 'Street' },
                { text: 'Suite', value: 'Suite' },
                { text: 'City', value: 'City' },
                { text: 'State', value: 'State' },
                { text: 'Zip', value: 'Zip' },
                { text: 'Country', value: 'Country' },
                { text: 'Tax Exempt', value: 'TaxExempt' },
                { text: 'Payment Terms', value: 'PaymentTerms' },
                { text: 'Phone', value: 'Phone' },
                { text: 'Email', value: 'Email' },
                { text: 'Fax', value: 'Fax' },
                { text: 'Title', value: 'Title' },
            ],
            customers: [],
            selectedRow : [],
            dialog: false,
        }
    },
    computed: {},
    methods: {

        async index(){
            this.error = false
            this.loading = true
            try {
                let response = await this.$http({
                    method: 'GET',
                    url: 'https://dev-rest.highlightportal.com/customers',
                })

                this.customers = response.data
                this.loading = false

            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Customers Data Available'
                }
                throw error
            }
        },

        getSingleData(row) {
            this.selectedRow  = row ;
            this.dialog = true;

        },
    },
    mounted() {
        this.index();
    },
    async created() {
    }
}
</script>
