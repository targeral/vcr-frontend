<template>
  <div
    :class="classes.meta"
  >
    <div
      v-if="enable.avatar"
      :class="classes.avatar"
    >
      {{ avatar }}
    </div>
    <div
      v-if="enable.detail"
      :class="classes.detail"
    >
      <div
        v-if="enable.title"
        :class="classes.title"
      >
        {{ title }}
      </div>
      <div
        v-if="enable.description"
        :class="classes.description"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        prefix: 'vcr-card'
      }
    },
    props: {
      avatar: [String],
      title: [String],
      description: [String]
    },
    computed: {
      classes () {
        return {
          meta: `${this.prefix}-meta`,
          avatar: `${this.prefix}-meta-avatar`,
          title: `${this.prefix}-meta-title`,
          description: `${this.prefix}-meta-description`,
          detail: `${this.prefix}-meta-detail`
        }
      },
      enable () {
        return {
          avatar: !!this.avatar,
          title: !!this.title,
          description: !!this.description,
          detail: !!this.title || !!this.description
        }
      }
    }
  }
</script>