<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="nav-list">
            <ion-list-header>College Finder</ion-list-header>
            <ion-note>name@email.com</ion-note>

            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :icon="p.icon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="labels-list">
            <ion-list-header>Favorites</ion-list-header>
            <ion-item v-for="(favorite, index) in favorites" lines="none" :key="index">
              <ion-icon slot="start" :icon="starOutline"></ion-icon>
              <ion-label>{{ favorite.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonList,
  IonListHeader,
  IonMenu, 
  IonNote,
  IonRouterOutlet,
  IonSplitPane
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import {
  globeOutline,
  readerOutline,
  appsOutline,
  starOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "App",
  components: {
    IonApp, 
    IonContent,  
    IonList, 
    IonListHeader, 
    IonMenu,  
    IonNote, 
    IonRouterOutlet, 
    IonSplitPane,
  },
  setup() {
    const selectedIndex = ref(0);
    const route = useRoute();
    const appPages = [
      {
        title: "Map",
        url: "/map",
        icon: globeOutline,
      },
      {
        title: "Table",
        url: "/table",
        icon: appsOutline,
      },
      {
        title: "Detail",
        url: "/detail",
        icon: readerOutline,
      },
    ];
    const path = window.location.pathname.split("/")[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    const favorites = [
      { ipedsid: 123456, name: "George Mason University"},
      { ipedsid: 234567, name: "James Madison University"},
      { ipedsid: 345678, name: "Old Dominion University"},
    ];

    return {
      selectedIndex,
      appPages, 
      globeOutline,
      readerOutline,
      appsOutline,
      starOutline,
      favorites,
      isSelected: (url: string) => url === route.path ? "selected" : ""
    }
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}
ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}
ion-menu.md ion-list {
  padding: 20px 0;
}
ion-menu.md ion-note {
  margin-bottom: 30px;
}
ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}
ion-menu.md ion-list#nav-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}
ion-menu.md ion-list#nav-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}
ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}
ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}
ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}
ion-menu.md ion-item ion-icon {
  color: #616e7e;
}
ion-menu.md ion-item ion-label {
  font-weight: 500;
}
ion-menu.ios ion-content {
  --padding-bottom: 20px;
}
ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}
ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}
ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}
ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}
ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}
ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}
ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}
ion-menu.ios ion-note {
  margin-bottom: 8px;
}
ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}
ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
