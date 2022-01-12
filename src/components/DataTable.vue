<template>
  <div id="container">
    <ion-list>
      <ion-list-header>Filtered Colleges {{ listing.length }}</ion-list-header>
      <ion-item v-for="(item, index) in listing" :key="index">
        <ion-avatar slot="start">
          <img :src="myLogoSrc" alt="my-logo" style="width:40px" />
        </ion-avatar>
        <ion-label>
          
          <h2>{{ item.name }}</h2>
          <h3>{{ item.division }}</h3>
          <p>{{ item.city }}, {{ item.state }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import myLogoSrc from "@/assets/svgs/acu_logo.svg";

export default {
  name: "DataTable",
  props: {
    colleges: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props:any) {
    let listing:any = ref([]);
    
    // watch(() => props.colleges, () => {
    //   listing.value = props.colleges;
    //   console.log("listing", listing.value);
    // }, {
    //   immediate: true,
    //   deep: true,
    // });

    const getData = async () => {
      const data = await fetch("/assets/data/colleges_with_distance.json");
      const collegesObj = await data.json();
      listing.value = collegesObj;
    };

    onMounted(async () => {
      await getData();
    });

    return { 
      listing,
      myLogoSrc,
    }
  },
}
</script>

<style scoped>
/* #container {
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
} */
</style>