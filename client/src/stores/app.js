import { defineStore } from 'pinia'
import Axios from 'axios'
import Swal from 'sweetalert2'

export const useAppStore = defineStore('app', {
  state: () => ({
    baseUrl: 'http://localhost:3001/',
    accomList: [],
    accomDetail: [],
    bookmark: [],
    qrCode: [],
    loggedIn: false
  }),
  getters: {},
  actions: {
    async logout() {
      Swal.fire({
        icon: 'success',
        title: 'You Are sucessfully logged out!',
        showConfirmButton: false
      })
      localStorage.clear()
      this.loggedIn = false
      this.router.push('/accomodations')
    },

    async login(userData) {
      let { email, password } = userData
      try {
        const { data } = await Axios({
          method: 'post',
          url: this.baseUrl + 'customers/login',
          data: {
            email,
            password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('role', data.role)
        this.loggedIn = true
        this.router.push('/accomodations')
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
      }
    },

    async googleLogin(res) {
      console.log(res);
      let { credential } = res
      // console.log(credential);
      try {
        let { data } = await Axios({
          method: 'post',
          url: this.baseUrl + 'customers/google-login',
          headers: {
            access_token_google: credential
          }
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('role', data.role)
        this.loggedIn = true
        this.router.push('/accomodations')
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
      }
    },

    async register(userData) {
      let { email, password } = userData
      try {
        const { data } = await Axios({
          method: 'post',
          url: this.baseUrl + 'customers/register',
          data: {
            email,
            password
          }
        })
        this.router.push('/login')
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
      }
    },

    async fetchAccom() {
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'customers/accomodations'
        })
        this.accomList = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
      }
    },

    async fetchAccomDetail(id) {
      console.log(id + '<<<<')
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'customers/accomodations/' + id
        })
        this.accomDetail = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
      }
    },

    async postBookmark(id) {
      // console.log(id)
      try {
        const { data } = await Axios({
          method: 'post',
          url: this.baseUrl + 'customers/bookmarks/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Added to Bookmark',
          showConfirmButton: false
        })
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Login to add into bookmarks',
          showConfirmButton: false
        })
      }
    },

    async getBookmark() {
      // console.log(id)
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'customers/bookmarks/',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.bookmark = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
      }
    }
  }
})
