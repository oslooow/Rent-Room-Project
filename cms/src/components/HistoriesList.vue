<script>
import ReusableTable from './ReusableTable.vue'
export default {
  data() {
    return {
      contents: [{ content: 'name' }, { content: 'description' }, { content: 'updatedBy' }]
    }
  },
  props: ['fetchHistories'],
  components: {
    ReusableTable
  }
}
</script>
<template>

  <div class="overflow-x-auto ml-16 mt-5">
    <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
      <thead>
        <tr>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">Name</th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">
            Description
          </th>
          <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">
            Updated By
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <ReusableTable
          v-for="ele in fetchHistories"
          :key="ele.id"
          :data="ele"
          :length="fetchHistories.length"
          :rows="contents"
        />
      </tbody>
    </table>
  </div>
</template>
