import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '../components/StartPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegistrationPage from '../components/RegistrationPage.vue'
import CustomerProfile from '../components/CustomerProfile.vue'
import HomePageCustomer from '../components/HomePageCustomer.vue'
import AllCustomers from '../components/AllCustomers.vue'
import AllDrivers from '../components/AllDrivers.vue'
import AllVehicles from '../components/AllVehicles.vue'
import DispatcherProfile from '../components/DispatcherProfile.vue'
import HomePageDispatcher from '../components/HomePageDispatcher.vue'
import DriverProfile from '../components/DriverProfile.vue'
import HomePageDriver from '../components/HomePageDriver.vue'
import AllDrivesDriver from '../components/AllDrivesDriver.vue'
import ChangePassword from '../components/ChangePassword.vue'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/'
		},
		{
            path: '/',
			name: 'StartPage',
			component: StartPage
		},
		{
            path: '/login',
			name: 'LoginPage',
			component: LoginPage
		},
		{
            path: '/signup',
			name: 'RegistrationPage',
			component: RegistrationPage
		},
		{
            path: '/customer/profile',
			name: 'CustomerProfile',
			component: CustomerProfile
		},
		{
            path: '/customer/home',
			name: 'HomePageCustomer',
			component: HomePageCustomer
		},
		{
            path: '/dispatcher/all/customers',
			name: 'AllCustomers',
			component: AllCustomers
		},
		{
            path: '/dispatcher/all/drivers',
			name: 'AllDrivers',
			component: AllDrivers
		},
		{
            path: '/dispatcher/all/vehicles',
			name: 'AllVehicles',
			component: AllVehicles
		},
		{
            path: '/dispatcher/profile',
			name: 'DispatcherProfile',
			component: DispatcherProfile
		},
		{
            path: '/dispatcher/home',
			name: 'HomePageDispatcher',
			component: HomePageDispatcher
		},
		{
            path: '/driver/profile',
			name: 'DriverProfile',
			component: DriverProfile
		},
		{
            path: '/driver/home',
			name: 'HomePageDriver',
			component: HomePageDriver
		},
		{
            path: '/driver/drives',
			name: 'AllDrivesDriver',
			component: AllDrivesDriver
		},
		{
            path: '/change/password',
			name: 'ChangePassword',
			component: ChangePassword
		},

	]
})