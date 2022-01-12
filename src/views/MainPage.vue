<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="funnelOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          
        </ion-toolbar>
      </ion-header>
    
      <div>
        <DataMap v-if="view==='map'" :colleges="selected"></DataMap>
        <DataTable v-if="view==='table'" :colleges="selected"></DataTable>
        <DataDetail v-if="view==='detail'" :colleges="selected"></DataDetail>
      </div>
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button color="primary" size="small">
        <ion-icon :icon="flashOutline"></ion-icon>
      </ion-fab-button>

      <ion-fab-list side="top">
        <ion-fab-button data-desc="Detail" color="light">
          <ion-icon :icon="readerOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button data-desc="Table" color="light">
          <ion-icon :icon="appsOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button data-desc="Map" color="light">
          <ion-icon :icon="globeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonIcon, IonPage, IonToolbar, IonFab, IonFabButton, IonFabList } from "@ionic/vue";
import { 
  optionsOutline,
  funnelOutline,
  globeOutline,
  readerOutline,
  appsOutline,
  flashOutline,
} from "ionicons/icons";
import { ref, onMounted } from "vue";

import DataMap from "@/components/DataMap.vue";
import DataTable from "@/components/DataTable.vue";
import DataDetail from "@/components/DataDetail.vue";

export default {
  components: {
    DataMap,
    DataTable,
    DataDetail,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonIcon,
    IonPage,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonFabList,
  },
  setup() {
    let view = ref("map");
    let selected:any = ref();
    let collegesAll:any;
    let collegesLocalized:any;

    const getData = async () => {
      let data = await fetch("/assets/data/colleges.geojson");
      collegesAll = await data.json();
      data = await fetch("/assets/data/colleges_with_distance.geojson");
      collegesLocalized = await data.json();
      selected = collegesLocalized;
    };

    onMounted(async () => {
      await getData();
    });

    return { 
      view,
      selected,
      optionsOutline,
      funnelOutline,
      globeOutline,
      readerOutline,
      appsOutline,
      flashOutline,
    }
  },
}
</script>

<style scoped>
ion-fab-button[data-desc] {
  position: relative;
}
ion-fab-button[data-desc]::after {
  position: absolute;
  content: attr(data-desc);
  z-index: 1;
  right: 50px;
  bottom: 5px;
  color: white;
  background-color: transparent;
  line-height: 24px;
  padding: 4px 8px;
}
</style>