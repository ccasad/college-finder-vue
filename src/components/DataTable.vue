<template>
  <div id="container">
    <ion-list>
      <ion-list-header>Filtered Colleges: {{ listing.length }}</ion-list-header>
      <ion-item 
        
        router-link="{name:'Detail'}"
        router-direction="forward"
        v-for="(item, index) in listing"
        :key="index"
        button
        detail
      >
        <ion-avatar slot="start">
          <img :src="myLogoSrc" alt="my-logo" style="width:40px" />
        </ion-avatar>
        <ion-label>
          
          <h2>{{ item.properties.ncaa_name }}</h2>
          <h3>Division {{ item.properties.ncaa_division }}</h3>
          <p>{{ getCityState(item) }}</p>
        </ion-label>

      </ion-item>
    </ion-list>
  </div>
</template>

<script lang="ts">
// address_city: "NORMAL"
// address_state: "AL"
// address_street: "4900 MERIDIAN STREET"
// address_zip: 35762
// ipeds_id: 100654
// ipeds_naics_code: 611310
// ipeds_naics_desc: "COLLEGES, UNIVERSITIES, AND PROFESSIONAL SCHOOLS"
// ipeds_name: "ALABAMA A & M UNIVERSITY"
// is_hist_black: true
// is_private: false
// ncaa_conf_id: 916
// ncaa_conf_name: "Southwestern Athletic Conf."
// ncaa_division: 1
// ncaa_name: "Alabama A&M University"
// ncaa_org_id: 6
// ncaa_region: "SOUTH REGION"
// total_enrollment: 6106
// website_athletic: "www.aamusports.com"
// website_main: "www.aamu.edu/"
import { useRouter } from "vue-router";
import { defineComponent, ref, onMounted, watch } from "vue";
import myLogoSrc from "@/assets/svgs/acu_logo.svg";
import { upperCaseFirstLetter } from "@/common/utilities";

export default defineComponent({
  name: "DataTable",
  props: {
    colleges: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props:any, context:any) {
    const router = useRouter();
    let listing:any = ref([]);
    
    const getCityState = (college:any) => {
      return `${upperCaseFirstLetter(college.properties.address_city)}, ${upperCaseFirstLetter(college.properties.address_state)}`;
    };

    watch(() => props.colleges, () => {
      if (props.colleges && props.colleges.features) {
        listing.value = props.colleges.features;
      }
    }, {
      immediate: true,
      deep: true,
    });

    return {
      router,
      listing,
      myLogoSrc,
      getCityState,
    };
  },
});
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