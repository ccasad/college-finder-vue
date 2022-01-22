<template>
  <div id="container">
    Name={{ college.ncaa_name }}=
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, toRefs } from "vue";

export default {
  name: "DataDetail",
  props: {
    college: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props:any) {
    const { college } = toRefs(props)
    return {};
  },
}
</script>

<style scoped>
#container {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>