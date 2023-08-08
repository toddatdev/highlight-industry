import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './modules/Dashboard/Dashboard'
import Support from './modules/Support/Support'
import Parts from './modules/Parts/Parts'
import Orders from './modules/Orders/Orders'
import Customers from "./modules/Customers/Customers";
import Inventories from "./modules/Inventory/Inventories";
import Users from './modules/Users/Users'
import UserListing from  './modules/UsersList/UserListing'
import Profile from './modules/Profile/Profile'
import StorePage from "./pages/StorePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import IssuesLog from "./modules/IssuesLog/IssuesLog";
import SalesOrderLineItems from "./modules/SalesOrderLineItems/SalesOrderLineItems";

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/parts',
            name: 'Parts',
            component: Parts
        },
        {
            path: '/orders',
            name: 'Orders',
            component: Orders
        },
        {
            path: '/sales-order-line-items/:item',
            name: 'SalesOderLineItem',
            component: SalesOrderLineItems
        },
        {
            path: '/customers',
            name: 'Customers',
            component: Customers
        },
        {
            path: '/inventories',
            name: 'Inventories',
            component: Inventories
        },
        {
            path: '/issues-log',
            name: 'IssuesLog',
            component: IssuesLog
        },
        {
            path: '/support',
            name: 'Support',
            component: Support
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '/users-list',
            name: 'Users-list',
            component: UserListing
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/home',
            name: 'home',
            component: StorePage
        },
        {
            path: '/product-details',
            name: 'product-details',
            component: ProductDetailPage
        }
    ]
})

let QueryString = function (obj, prefix) {
    var str = []
    for (var p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            var k = prefix ? prefix + '[' + p + ']' : p
            var v = obj[p]
            str.push(typeof v === 'object' ? QueryString(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v))
        }
    }
    return str.join('&')
}

router.setQueryParams = function (params) {
    let queryString = {}
    for (let query in this.currentRoute.query) {
        queryString[query] = this.currentRoute.query[query]
    }
    for (let param in params) {
        if (params[param] === null) {
            if (typeof queryString[param] !== 'undefined') {
                delete queryString[param]
            }
        } else {
            queryString[param] = params[param]
        }
    }
    this.push('?' + QueryString(queryString))
}

window.$router = router

export default router
