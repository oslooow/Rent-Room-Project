<script>
export default {
  emits: ['submit'],
  props: ['accoms', 'action', 'types', 'accomById'],
  
  data() {
    return {
        name: '',
        typeId: '',
        price: '',
        roomCapacity: '',
        facility: '',
        location: '',
        imgUrl: ''
    }
  },
  methods: {
    submitHandler() {
      let accom = {
        name: this.name,
        typeId: this.typeId,
        price: this.price,
        roomCapacity: this.roomCapacity,
        facility: this.facility,
        location: this.location,
        imgUrl: this.imgUrl
      }
      if (this.action === 'add') {
        this.$emit('submit', accom)
      } else {
        let id = this.accom.id
        this.$emit('submit', id, accom)
      }
    }
  },
  created() {
    if (this.action === 'edit') {
      this.name = this.accomById.name
      this.typeId = this.accomById.typeId
      this.price = this.accomById.price
      this.roomCapacity = this.accomById.roomCapacity
      this.facility = this.accomById.facility
      this.location = this.accomById.location
      this.imgUrl = this.accomById.imgUrl
    }
  }
}
</script>
<template>
  <div>
    <!-- {{ accomById }} -->
    <!--
  This component uses @tailwindcss/forms

  yarn add @tailwindcss/forms
  npm install @tailwindcss/forms

  plugins: [require('@tailwindcss/forms')]
-->

    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <h1
          class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl"
          v-if="action === 'add'"
        >
          Add Accomodation
        </h1>
        <h1
          class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl"
          v-else-if="action === 'edit'"
        >
          Edit Accomodation
        </h1>
        <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
          inventore quaerat mollitia?
        </p>

        <form
          @submit.prevent="submitHandler"
          action=""
          class="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p class="text-center text-lg font-medium" v-if="action === 'add'">
            Add New Accomodation
          </p>
          <p class="text-center text-lg font-medium" v-else-if="action === 'edit'">
            Edit Accomodation
          </p>

          <div>
            <label for="name" class="sr-only">Name</label>
            <div class="relative">
              <input
                name="name"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Accomodation Name"
                v-if="action === 'add'"
                v-model="name"
              />
              <input
                name="name"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                v-else-if="action === 'edit'"
                v-model="name"
              />
            </div>
          </div>

          <div>
            <select
              id="option"
              name="typeId"
              class="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="typeId"
            >
              <option v-if="action === 'add'" value="" disabled selected>Select</option>
              <option v-for="ele in types" :key="ele.id" :value="ele.id">{{ ele.name }}</option>
            </select>
          </div>

          <div>
            <label for="price" class="sr-only">Price</label>
            <div class="relative">
              <input
                name="price"
                type="number"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Accomodation Price"
                v-if="action === 'add'"
                v-model="price"
              />
              <input
                name="price"
                type="number"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                v-else-if="action === 'edit'"
                v-model="price"
              />
            </div>
          </div>

          <div>
            <label for="roomCapacity" class="sr-only">Room Capacity</label>
            <div class="relative">
              <input
                name="roomCapacity"
                type="number"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Accomodation Capacity"
                v-if="action === 'add'"
                v-model="roomCapacity"
              />
              <input
                name="roomCapacity"
                type="number"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                v-else-if="action === 'edit'"
                v-model="roomCapacity"
              />
            </div>
          </div>

          <div>
            <label for="facility" class="sr-only">Facility</label>
            <div class="relative">
              <input
                name="facility"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Accomodation Facility"
                v-if="action === 'add'"
                v-model="facility"
              />
              <input
                name="facility"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                v-else-if="action === 'edit'"
                v-model="facility"
              />
            </div>
          </div>

          <div>
            <label for="location" class="sr-only">Location</label>
            <div class="relative">
              <input
                name="location"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Accomodation Location"
                v-if="action === 'add'"
                v-model="location"
              />
              <input
                name="location"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                v-else-if="action === 'edit'"
                v-model="location"
              />
            </div>
          </div>

          <div>
            <label for="ImageUrl" class="sr-only">Image Url</label>
            <div class="relative">
              <input
                name="imgUrl"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Accomodation Image URL"
                v-if="action === 'add'"
                v-model="imgUrl"
              />
              <input
                type="imgUrl"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                v-else-if="action === 'edit'"
                v-model="imgUrl"
              />
            </div>
          </div>
          <br />
          <button
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 mt-10 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
