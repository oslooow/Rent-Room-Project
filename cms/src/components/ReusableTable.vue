<script>
export default {
  props: ['data', 'length', 'rows'],
  emits: ['changeStatus','changePage','getDetail'],
  methods: {
    statusChange() {
      this.$emit('changeStatus', {
        id: this.data.id,
        status: this.data.status
      })
    },
    changePage(page) {
      this.$emit('changePage', page)
    },
    accomDetail(){
      this.$emit('getDetail',this.data)
    }
  }
}
</script>

<template>
  <!-- <h3>{{ data }}</h3> -->
  <tr>
    <td v-for="ele in rows" :key="ele.id">
      <!-- {{ data[ele.content] }} -->
      <div v-if="ele.content === 'imgUrl'">
        <img :src="data[ele.content]" alt="" class="object-contain h-32 w-32" />
      </div>
      <span v-else-if="ele.content === 'authorId'">
        {{ data.User.username }}
      </span>
      <span v-else-if="ele.content === 'typeId'">
        {{ data.Type.name }}
      </span>
      <span v-else-if="ele.content === 'status'">
        <select
          @change="statusChange"
          v-model="data.status"
          id="option"
          name="status"
          class="block w-25 px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled selected>{{ data[ele.content] }}</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Archived">Archived</option>
        </select>
      </span>
      <span v-else-if="ele.content === 'action'" class="ml-auto">
        <div class="ml-auto">
          <a
            @click.prevent="accomDetail"
            class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
            href=""
          >
            Edit
          </a>
        </div>
      </span>
      <span v-else>
        {{ data[ele.content] }}
      </span>
    </td>
  </tr>
</template>
