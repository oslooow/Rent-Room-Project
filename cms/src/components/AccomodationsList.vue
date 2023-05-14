<script>
import ReusableTable from './ReusableTable.vue'
export default {
  data() {
    return {
      contents: [
        { content: 'imgUrl' },
        { content: 'name' },
        { content: 'price' },
        { content: 'typeId' },
        { content: 'facility' },
        { content: 'location' },
        { content: 'authorId' },
        { content: 'status' },
        { content: 'action' }
      ]
    }
  },
  props: ['fetchAccom'],
  emits: ['changeStatus','changePage'],
  components: {
    ReusableTable
  },
  methods: {
    handleChangeStatus(data) {
      this.$emit('changeStatus',data)
    },
    changePage(page) {
      this.$emit('changePage', page)
    },
    getDetail(data){
      this.$emit('getDetail',data)
    }
  }
}
</script>
<template>
  <div class="overflow-x-auto ml-16 mt-5">
    <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
      <thead>
        <tr>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Image</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Name</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Price</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Type</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Facility</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Location</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Author</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Status</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Edit</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <ReusableTable
          v-for="ele in fetchAccom"
          :key="ele.id"
          :data="ele"
          :length="fetchAccom.length"
          :rows="contents"
          @changeStatus="handleChangeStatus"
          @changePage="changePage"
          @getDetail="getDetail"
        />
      </tbody>
    </table>
  </div>
</template>
