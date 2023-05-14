<script>
import { mapActions, mapWritableState } from 'pinia'
import { useAppStore } from '../stores/app'
export default {
  methods: {
    ...mapActions(useAppStore, ['logout', 'login'])
  },
  computed: {
    ...mapWritableState(useAppStore, ['loggedIn'])
  },
  created() {
    if (localStorage.access_token) {
      this.loggedIn = true
    }
  }
}
</script>

<template>
  <!-- {{ loggedIn }} -->
  <div class="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
    <RouterLink to="/" class="block text-teal-600" href="">
      <img src="../assets/palm.png" class="w-10 h-10" alt="" />
    </RouterLink>

    <div class="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" class="hidden md:block">
        <ul class="flex items-center gap-6 text-sm">
          <li>
            <RouterLink
              to="/accomodations"
              class="text-gray-500 transition hover:text-gray-500/75"
              href=""
            >
              Accomodations
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/bookmarks"
              class="text-gray-500 transition hover:text-gray-500/75"
              href="/"
            >
              My Bookmarks
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <div class="sm:flex sm:gap-4" v-if="loggedIn=== false">
          <a
            class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/login"
          >
            Login
          </a>

          <a
            class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
            href="/register"
          >
            Register
          </a>
        </div>
        <div class="sm:flex sm:gap-4" v-if="loggedIn=== true">
          <a @click.prevent="logout"
            class="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href=""
          >
            Logout
          </a>
        </div>

        <button
          class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
