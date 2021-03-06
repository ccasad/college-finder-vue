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
        <DataMap 
          v-if="view==='map'"
          :colleges="colleges"
        ></DataMap>
        <DataTable 
          v-if="view==='table'"
          :colleges="colleges"
        ></DataTable>
      </div>
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button color="primary" size="small">
        <ion-icon :icon="flashOutline"></ion-icon>
      </ion-fab-button>

      <ion-fab-list side="top">
        <ion-fab-button @click="showTable" data-desc="Table" color="light">
          <ion-icon :icon="appsOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="showMap" data-desc="Map" color="light">
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
import { defineComponent, ref, onMounted } from "vue";

import DataMap from "@/components/DataMap.vue";
import DataTable from "@/components/DataTable.vue";

export default defineComponent({
  components: {
    DataMap,
    DataTable,
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
    let view = ref("table");
    let colleges:any = ref();

    const getData = async () => {
      let data = await fetch("/assets/data/colleges_matched.geojson");
      colleges.value = await data.json();
    };

    const showTable = () => {
      view.value = "table";
    };
    const showMap = () => {
      view.value = "map";
    };

    onMounted(async () => {
      await getData();
    });

    return { 
      view,
      colleges,
      optionsOutline,
      funnelOutline,
      globeOutline,
      readerOutline,
      appsOutline,
      flashOutline,
      showTable,
      showMap,
    }
  },
});
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