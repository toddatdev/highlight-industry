let paramMap = {
    page: 'paginationPage',
    descending: 'paginationDescending',
    sortBy: 'paginationSortBy'
}

export default {
    data() {
        return {
            loading: false,
            paginationDescending: false,
            paginationPage: 1,
            paginationSortBy: null,
            paginationRowsPerPage: 10
        }
    },
    computed: {
        pagination() {
            return {
                descending: this.paginationDescending,
                page: this.paginationPage,
                sortBy: this.paginationSortBy,
                rowsPerPage: this.paginationRowsPerPage
            }
        },
        paginationTotalItems() {
            return 0
        },
        paginationTotalPages() {
            return Math.ceil(this.paginationTotalItems / this.paginationRowsPerPage)
        }
    },
    methods: {
        async paginationUpdated() {
            // Override this method
        },
        resetPagination() {
            this.paginationDescending = false
            this.paginationPage = 1
            this.paginationSortBy = null
            this.updatePaginationQueryParams()
            this.paginationUpdated()
        },
        updatePaginationQueryParams() {
            this.$router.setQueryParams({page: this.paginationPage})
        },
        async updatePagination(value) {
            if (this.loading) {
                return
            }
            let equal = true
            Object.entries(value).forEach(([key, value]) => {
                if (!this[paramMap[key]]) {
                    return
                }
                if (this[paramMap[key]] + '' !== value + '') {
                    equal = false
                }
            })
            if (equal) {
                return
            }
            console.log('update pagination', value)
            this.paginationPage = value.page
            this.paginationDescending = value.descending
            this.paginationSortBy = value.sortBy
            this.updatePaginationQueryParams()
            clearTimeout(this.debouncedPaginationUpdated)
            this.debouncedPaginationUpdated = setTimeout(() => {
                this.paginationUpdated()
            }, 500)
        }
    },
    created() {
        if (this.$route.query.page && !isNaN(this.$route.query.page * 1)) {
            this.paginationPage = this.$route.query.page * 1
        }
    },
    beforeDestroy() {
        clearTimeout(this.debouncedPaginationUpdated)
    }
}
