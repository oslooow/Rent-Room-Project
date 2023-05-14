<script>
import Axios from 'axios'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import Dashboard from './components/DashboardPage.vue'
import Sidebar from './components/SidebarStatic.vue'
import AccomsTable from './components/AccomodationsList.vue'
import TypesTable from './components/TypesList.vue'
import HistoriesTable from './components/HistoriesList.vue'
import ReusableForm from './components/ReusableForm.vue'

export default {
  components: {
    LoginPage,
    RegisterPage,
    Dashboard,
    Sidebar,
    AccomsTable,
    TypesTable,
    HistoriesTable,
    ReusableForm
  },
  data() {
    return {
      baseUrl: 'https://rent-room-oslooow-production.up.railway.app',
      accomList: [],
      typeList: [],
      historyList: [],
      accomById: [],
      currentPage: 'dashboard',
      loggedIn: false
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },

    async getAccom() {
      try {
        let { data } = await Axios({
          url: this.baseUrl + '/accomodations/detail',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.accomList = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    async getAccomById(value) {
      let { id } = value
      try {
        let { data } = await Axios({
          url: this.baseUrl + '/accomodations/' + id,
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.accomById = data
        console.log(this.accomById)
        this.changePage('edit')
      } catch (error) {
        console.log(error)
      }
    },

    async getTypes() {
      try {
        let { data } = await Axios({
          url: this.baseUrl + '/types',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.typeList = data
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    async getHistories() {
      try {
        let { data } = await Axios({
          url: this.baseUrl + '/history',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.historyList = data
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    async postAccom(accomodations) {
      try {
        let { data } = await Axios.post(this.baseUrl + '/accomodations', accomodations, {
          headers: { access_token: localStorage.access_token }
        })

        this.$swal.fire({
          title: 'Success!',
          text: `Success adding ${data.name} to Accomodations`,
          icon: 'success',
          confirmButtonText: 'Okay!'
        })

        this.getAccom()
        this.getHistories()
        this.changePage('accomodations')
      } catch (error) {
        this.$swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    },

    async postTypes(types) {
      try {
        let { data } = await Axios.post(this.baseUrl + '/accomodations', types)

        this.$swal.fire({
          title: 'Success!',
          text: `Success adding ${data.name} to Types`,
          icon: 'success',
          confirmButtonText: 'Okay!'
        })

        this.getTypes()
        this.getHistories()
        this.changePage('types')
      } catch (error) {
        this.$swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    },

    async changeStatus(change) {
      let { id, status } = change
      console.log(change)
      try {
        let { data } = await Axios.patch(
          this.baseUrl + '/accomodations/' + id,
          { status },
          {
            headers: { access_token: localStorage.access_token }
          }
        )
        this.getAccom()
        this.getHistories()
      } catch (error) {
        this.$swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    },

    async editAccom(accomId, accomodations) {
      try {
        let { data } = await Axios.put(this.baseUrl + '/accomodations' + accomId, accomodations, {
          headers: { access_token: localStorage.access_token }
        })

        this.$swal.fire({
          title: 'Success!',
          text: `Success adding ${data.name} to Accomodations`,
          icon: 'success',
          confirmButtonText: 'Okay!'
        })

        this.getAccom()
        this.getHistories()
        this.changePage('accomodations')
      } catch (error) {
        this.$swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    },

    async login(user) {
      try {
        let { data } = await Axios.post(this.baseUrl + '/auth/login', user)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('role', data.role)
        this.loggedIn = true
        this.changePage('dashboard')
        this.getAccom()
        this.getHistories()
        this.getTypes()
      } catch (error) {
        // console.log(error.response.data.message)
        this.$swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    },

    async googleLogin(res) {
      let { credential } = res
      console.log(res)
      try {
        let { data } = await Axios.post(
          this.baseUrl + '/auth/google-login',
          {},
          {
            headers: {
              access_token_google: credential
            }
          }
        )
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('role', data.role)
        this.loggedIn = true
        this.changePage('dashboard')
        this.getAccom()
        this.getHistories()
        this.getTypes()
      } catch (error) {
        this.$swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    },

    logout() {
      localStorage.clear()
      this.changePage('login')
      this.loggedIn = false
    },

    async register(user) {
      try {
        let { data } = await Axios.post(this.baseUrl + '/auth/register', user)
        // console.log(user, data)
        this.$swal.fire({
          title: 'Success Register!',
          text: 'Register Success,Redirecting to login page',
          icon: 'success'
        })
        this.changePage('login')
      } catch (error) {
        // console.log(error.response.data.message)
        this.$swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!'
        })
      }
    }
  },

  created() {
    if (localStorage.access_token) {
      this.loggedIn = true
      this.getAccom()
      this.getHistories()
      this.getTypes()
    } else {
      this.changePage('register')
    }
  }
}
</script>

<template>
  <div>
    <RegisterPage v-if="currentPage === 'register'" @register="register" @changePage="changePage" />
    <LoginPage v-if="currentPage === 'login'" @login="login" @googleLogin="googleLogin" />

    <header></header>

    <main>
      <Sidebar
        v-if="currentPage !== 'login' && currentPage !== 'register'"
        @changePage="changePage"
        @logout="logout"
      />
      <Dashboard
        v-if="currentPage === 'dashboard'"
        @changePage="changePage"
        :accoms="accomList"
        :types="typeList"
        :histories="historyList"
      />
      <AccomsTable
        v-if="currentPage === 'accomodations'"
        :fetchAccom="accomList"
        @changeStatus="changeStatus"
        @changePage="changePage"
        @getDetail="getAccomById"
      />
      <TypesTable v-if="currentPage === 'types'" :fetchType="typeList" />
      <HistoriesTable v-if="currentPage === 'history'" :fetchHistories="historyList" />
      <ReusableForm
        v-if="currentPage === 'add' || currentPage === 'edit'"
        @submit="postAccom"
        :action="currentPage"
        :accoms="accomList"
        :types="typeList"
        :accomById="accomById"
      />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
