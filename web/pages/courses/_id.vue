<template>
  <div class="pa-3">
    <h3>课程详情</h3>
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((v, i) => ({ text: v.name, value: v._id }))"
    ></v-select>
    <video :src="episode.file" width="100%" controls></video>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })

    return {
      id,
      course
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>

<style scoped></style>
