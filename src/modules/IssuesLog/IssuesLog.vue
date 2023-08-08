<template>
    <div class="mx-5 my-5">
        <main-toolbar>
            <v-toolbar-title>Issues Log</v-toolbar-title>
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
                    Single Issue Log
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
                                Issue Ticket Number
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
                                {{selectedRow.IssueTicketNumber}}
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
                                Call In Date Time
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
                                {{selectedRow.CallInDateTime}}
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
                                Distributor Or EndUser
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
                                {{selectedRow.DistributorOrEndUser}}
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
                                Degree Of Urgency
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
                                {{selectedRow.DegreeOfUrgency}}
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
                                Needs Manual
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
                                {{selectedRow.NeedsManual}}
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
                                Machine Condition
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
                                {{selectedRow.MachineCondition}}
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
                                Time Criticality
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
                                {{selectedRow.TimeCriticality}}
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
                                Contact Name
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
                                {{selectedRow.ContactName}}
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
                                Contact Tel No
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
                                {{selectedRow.ContactTelNo}}
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
                                Contact TelNo 2
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
                                {{selectedRow.ContactTelNo2}}
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
                                Contact Email
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
                                {{selectedRow.ContactEmail}}
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
                                Machine Serial Num
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
                                {{selectedRow.MachineSerialNum}}
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
                                Machine Job Num
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
                                {{selectedRow.MachineJobNum}}
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
                                Model
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
                                {{selectedRow.Model}}
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
                                Style
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
                                {{selectedRow.Style}}
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
                                Type
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
                                {{selectedRow.Type}}
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
                                Biz Pro Customer Number
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
                                {{selectedRow.BizProCustomerNumber}}
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
                                Customer Name
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
                                {{selectedRow.CustomerName}}
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
                                Issue Description
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
                                {{selectedRow.IssueDescription}}
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
                                Resolution
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
                                {{selectedRow.Resolution}}
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
                                Resolution Detailed
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
                                {{selectedRow.ResolutionDetailed}}
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
                                Issue Resolved
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
                                {{selectedRow.IssueResolved}}
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
                                User
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
                                {{selectedRow.User}}
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
                {text: 'Issue Ticket Number', align: 'start', sortable: false, value: 'IssueTicketNumber'},
                { text: 'Call In Date Time', value: 'CallInDateTime' },
                { text: 'Distributor Or End User', value: 'DistributorOrEndUser' },
                { text: 'Degree Of Urgency', value: 'DegreeOfUrgency' },
                { text: 'Needs Manual', value: 'NeedsManual' },
                { text: 'Machine Condition', value: 'MachineCondition' },
                { text: 'Time Criticality', value: 'TimeCriticality' },
                { text: 'Contact Name', value: 'ContactName' },
                { text: 'Contact Tel No', value: 'ContactTelNo' },
                { text: 'Contact Tel No2', value: 'ContactTelNo2' },
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
                    url: 'https://dev-rest.highlightportal.com/issues_logs',
                })

                this.customers = response.data
                this.loading = false

            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Issues Log Data Available'
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
