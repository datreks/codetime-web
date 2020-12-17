<template>
  <v-app dark>
    <v-overlay
      :color="$vuetify.theme.dark ? `#111` : `#fff`"
      :z-index="100"
      :opacity="1"
      :value="user.logined === undefined"
      class="text-center"
    >
      <v-img
        class="rotate"
        eager
        max-height="64px"
        max-width="64px"
        src="/favicon.ico"
      ></v-img>
      <div class="text--secondary caption">{{ $t("loading") }}</div>
    </v-overlay>
    <v-navigation-drawer
      v-model="settingsDrawer"
      clipped
      app
      fixed
      temporary
      right
    >
      <settings-drawer-content></settings-drawer-content>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="getLangPath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="v-bar--underline" flat dense clipped-left fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ $t(title) }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="user.logined"
        icon
        @click.stop="settingsDrawer = !settingsDrawer"
      >
        <v-avatar to="/account" size="32px">
          <v-img :src="user.avatar"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="d-flex flex-column" style="min-height: 100%">
        <div style="flex: 1">
          <v-container>
            <v-scroll-y-transition>
              <nuxt />
            </v-scroll-y-transition>
          </v-container>
        </div>
        <div>
          <v-footer>
            <span>&copy; {{ new Date().getFullYear() }} Data Trekkers </span>
            <v-divider vertical class="mx-2"></v-divider>
            <span> codetime@datreks.com </span>
          </v-footer>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SettingsDrawerContent from "~/components/SettingsDrawerContent.vue";
export default {
  components: { SettingsDrawerContent },
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "mdi-view-dashboard-variant",
          title: "dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-account",
          title: "account",
          to: "/account",
        },
        {
          icon: "mdi-shield-star",
          title: "badge",
          to: "/badge",
        },
        {
          icon: "mdi-github",
          title: "contributor",
          to: "/contributor",
        },
      ],
      miniVariant: true,
      right: true,
      settingsDrawer: false,
      title: "Code Time",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  prerender() {
    const lang = !localStorage.getItem("language")
      ? "en"
      : localStorage.getItem("language");
    localStorage.setItem("language", lang);
    this.$i18n.locale = lang;
  },
  mounted() {
    this.$store.dispatch("user/login");
  },
  methods: {
    getLangPath(to) {
      return `${to}`;
    },
  },
};
</script>
<style>
.rotate {
  -webkit-animation: my-rotate 1s linear infinite;
  animation: my-rotate 1s linear infinite;
  display: inline-block;
}
@-webkit-keyframes my-rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes my-rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.theme--light .v-bar--underline,
.theme--dark .v-bar--underline {
  border-width: 0 0 thin 0;
  border-style: solid;
}

.theme--light .v-bar--topline,
.theme--dark .v-bar--topline {
  border-width: 0 thin 0 0;
  border-style: solid;
}

.theme--light .v-bar--underline.theme--light,
.theme--dark .v-bar--underline.theme--light {
  border-bottom-color: #0000001f !important;
}

.theme--light .v-bar--underline.theme--dark,
.theme--dark .v-bar--underline.theme--dark {
  border-bottom-color: #ffffff1f !important;
}

.theme--light .v-bar--topline.theme--light,
.theme--dark .v-bar--topline.theme--light {
  border-bottom-color: #0000001f !important;
}

.theme--light .v-bar--topline.theme--dark,
.theme--dark .v-bar--topline.theme--dark {
  border-bottom-color: #ffffff1f !important;
}
</style>
