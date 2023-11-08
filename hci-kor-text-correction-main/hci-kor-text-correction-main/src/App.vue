<template>
  <v-app class="notosanskr">
    <v-navigation-drawer
      expand-on-hover
      app
      dark
      mobile-breakpoint="0"
      absolute
      mini-variant
      left
    >
      <v-list nav dense>
        <v-list-item link @click="$router.push('/')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="$router.push('/lisence')">
          <v-list-item-icon>
            <v-icon>mdi-copyright</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Lisence</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="$router.push('/developers')">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Developers</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
html,
body {
  height: 100%;
  overflow: hidden;
}
.v-main {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>
