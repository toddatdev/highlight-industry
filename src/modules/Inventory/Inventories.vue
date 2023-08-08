<template>
    <div class="mx-5 my-5">
        <main-toolbar>
            <v-toolbar-title>Inventories</v-toolbar-title>
        </main-toolbar>
        <v-data-table
            :headers="headers"
            :items="customers"
            :items-per-page="5"
            class="elevation-1"
            title="Click Here For More Details"
            @click:row="getSingleData"
        >
        </v-data-table>


        <v-dialog
            v-model="dialog"
            width="700"
        >
            <v-card class="">
                <v-card-title class="text-h5 grey lighten-2">
                    Single Inventory Data
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
                                Item Number
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
                                {{selectedRow.ItemNumber}}
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
                                Description
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
                                {{selectedRow.Description}}
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
                                UnitOfMeasure
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
                                {{selectedRow.UnitOfMeasure}}
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
                                Stock Purchase
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
                                {{selectedRow.StockPurchase}}
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
                                HSTariffClassNum
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
                                {{selectedRow.HSTariffClassNum}}
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
                {text: 'Item Number', align: 'start', sortable: false, value: 'ItemNumber'},
                { text: 'Description', value: 'Description' },
                { text: 'Unit Of Measure', value: 'UnitOfMeasure' },
                { text: 'Stock Purchase', value: 'StockPurchase' },
                { text: 'HSTariffClassNum', value: 'HSTariffClassNum' },
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
                    url: 'https://dev-rest.highlightportal.com/inventories?page=1&itemsPerPage=10&Description=""',
                })
                console.log(response);

                this.customers = response.data
                this.loading = false

            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Inventory Data Available'
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
