import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '../components/StartPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegistrationPage from '../components/RegistrationPage.vue'

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

	]
})