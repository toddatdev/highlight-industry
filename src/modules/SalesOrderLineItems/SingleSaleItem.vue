<template>
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
                                Tax Exempt
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

                </v-container>

        <v-divider></v-divider>
    </v-card>
</template>

<script>
     export default {
         components : {},
         props: ['selectedRow'],
         data() {
             return {
             }

         },
     }

</script>
