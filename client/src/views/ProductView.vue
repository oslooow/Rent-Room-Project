<template>
  <div class="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    <!-- {{ accomList }} -->
    <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
      <productCard v-for="accoms in accomList" :key="accoms.id" :data="accoms" :page="'product'"/>
    </ul>
  </div>
</template>

<script>
import productCard from '../components/ProductCard.vue'
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '../stores/app'
export default {
  components: {
    productCard
  },
  methods: {
    ...mapActions(useAppStore,['fetchAccom'])
  },
  computed: {
    ...mapState(useAppStore, ['accomList'])
  },
  created() {
    this.fetchAccom()
  }
}
</script>

<style></style>
