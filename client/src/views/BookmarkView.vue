<template>
  <div class="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
      <productCard v-for="accom in bookmark" :key="accom.id" :page="'bookmarks'" :data="accom"/>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productCard from '../components/ProductCard.vue'
import { useAppStore } from '../stores/app'
export default {
  components: {
    productCard
  },
  methods: {
    ...mapActions(useAppStore,['getBookmark'])
  },
  computed: {
    ...mapState(useAppStore, ['bookmark'])
  },
  created() {
    this.getBookmark()
  }
}
</script>

<style></style>
