<template>
    <div class="mx-5 my-5">
        <main-toolbar>
            <v-toolbar-title>Sales Oder Line Items</v-toolbar-title>
        </main-toolbar>
        <v-data-table
            :headers="headers"
            :items="singleLineItemList"
            :items-per-page="5"
            class="elevation-1"

        >
        </v-data-table>


        <v-dialog
            v-model="dialog"
            width="700"
        >
            <v-card class="">
                <v-card-title class="text-h5 grey lighten-2">
                    Single Sales Order Line Item
                </v-card-title>

                <v-container class="grey lighten-5">

        <!--                    <v-row no-gutters>-->
        <!--                        <v-col-->
        <!--                            cols="12"-->
        <!--                            md="4"-->
        <!--                        >-->
        <!--                            <v-card-->
        <!--                                class="pa-2 font-weight-bold"-->
        <!--                                outlined-->
        <!--                                tile-->
        <!--                            >-->
        <!--                                Sales Order Number-->
        <!--                            </v-card>-->
        <!--                        </v-col>-->

        <!--                        <v-col-->
        <!--                            cols="12"-->
        <!--                            md="8"-->
        <!--                        >-->
        <!--                            <v-card-->
        <!--                                class="pa-2"-->
        <!--                                outlined-->
        <!--                                tile-->
        <!--                            >-->
        <!--                                {{selectedRow.SalesOrderNumber}}-->
        <!--                            </v-card>-->
        <!--                        </v-col>-->
        <!--                    </v-row>-->

                </v-container>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>


    </div>

</template>

<style lang="scss"></style>

<script>

import get from "lodash/get";
// import SingleSaleItem from './SingleSaleItem';

export default {
    components: {
        // SingleSaleItem
    },
    data() {
        return {
            headers: [
                { text: 'Line Number', value: 'LineNumber' },
                { text: 'Item Number', value: 'ItemNumber' },
                { text: 'Quantity', value: 'Quantity' },
                { text: 'Ship Qty', value: 'ShipQty' },
                { text: 'Price', value: 'Price' },
                { text: 'Discount', value: 'Discount' },
                { text: 'Description', value: 'Description' },
            ],
            singleLineItemList: [],
            selectedData : [],
            dialog: false,
        }
    },
    computed: {},
    methods: {

        async index(){
            this.error = false
            this.loading = true
            let itemID =  this.$route.params.item;

            try {
                let response = await this.$http({
                    method: 'GET',
                    url: 'https://dev-rest.highlightportal.com/sales_order_lineitems?SalesOrderNumber='+itemID,
                })
                this.singleLineItemList = response.data
                console.log(this.singleLineItemList);

                this.loading = false

            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Sales Order Line Item Data Available'
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

        this.index();
    }
}
</script>
