<template>
    <div class="mx-5 my-5">
        <main-toolbar>
            <v-toolbar-title>Sales Orders</v-toolbar-title>
        </main-toolbar>
        <v-data-table
            :headers="headers"
            :items="salesOrders"
            :items-per-page="5"
            title="Click Here For More Details"
            class="elevation-1"
            @click:row="getSingleData"
        >

            <template v-slot:item.actions="{ item }">
                <v-btn
                    small
                    class="mr-2 primary"
                    @click="viewItem(item)"
                >
                    <v-icon
                        small
                        class="mr-2"
                    >
                        fa-eye
                    </v-icon> View Line Items
                </v-btn>

            </template>


        </v-data-table>


        <v-dialog
            v-model="dialog"
            width="700"
        >
            <v-card class="">
                <v-card-title class="text-h5 grey lighten-2">
                    Single Order List
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
                                Sales Order Number
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
                                {{selectedRow.SalesOrderNumber}}
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
                                Sold To Customer
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
                                {{selectedRow.SoldToCustomer}}
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
                                Ship To Customer
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
                                {{selectedRow.ShipToCustomer}}
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
                                Sales Date
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
                                {{selectedRow.SalesDate}}
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
                                Required Date
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
                                {{selectedRow.RequiredDate}}
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
                                Customer PO
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
                                {{selectedRow.CustomerPO}}
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
                                Source Of Order
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
                                {{selectedRow.SourceOfOrder}}
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
                                Payment Terms
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
                                Shipped Via
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
                                {{selectedRow.ShippedVia}}
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
                                Tax
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
                                {{selectedRow.Tax}}
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
                                Tax2
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
                                {{selectedRow.Tax2}}
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
                                Freight
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
                                {{selectedRow.Freight}}
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>



    </div>
</template>



<style lang="scss">
</style>

<script>

import get from "lodash/get";

export default {
    components: {},
    data() {
        return {
            headers: [
                {
                    text: 'Sales Order Number',
                    align: 'start',
                    sortable: false,
                    value: 'SalesOrderNumber',
                },
                { text: 'Sold To Customer', value: 'SoldToCustomer' },
                { text: 'Ship To Customer', value: 'ShipToCustomer' },
                // { text: 'Sales Date', value: 'SalesDate' },
                // { text: 'Required Date', value: 'RequiredDate' },
                { text: 'Payment Terms', value: 'PaymentTerms' },
                { text: 'Shipped Via', value: 'calories' },
                { text: 'Tax Exempt', value: 'TaxExempt' },
                { text: 'Tax', value: 'Tax' },
                { text: 'Tax2', value: 'Tax2' },
                { text: 'Freight', value: 'Freight' },
                { text: 'Action', value: 'actions', sortable: false },

            ],
            salesOrders: [],
            selectedRow : [],
            dialog: false,
        }
    },
    computed: {},
    methods: {
        async listSalesOrders(){
            this.error = false
            this.loading = true
            try {
                let response = await this.$http({
                    method: 'GET',
                    url: 'https://dev-rest.highlightportal.com/sales_orders',
                })
                console.log(response);

                this.salesOrders = response.data
                this.loading = false

            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Sales Order Data Available'
                }
                throw error
            }
        },

        getSingleData(row) {
            this.selectedRow  = row ;
            this.dialog = true;

        },

        viewItem (item) {
            this.$router.push({ name: 'SalesOderLineItem', params: { item: item.SalesOrderNumber }})
        },

    },
    mounted() {
        this.listSalesOrders();
    },
    async created() {
    }
}
</script>
