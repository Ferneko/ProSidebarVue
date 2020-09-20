<template >
  <li v-if="this.subMenu == null">
    <router-link :to="this.path">
      <i :class="icone"></i>
      <span>{{this.texto}}</span>
    </router-link>
  </li>
  <li v-else class="sidebar-dropdown" v-bind:class="{active:aberto}">
    <a @click="abreMenu">
      <i :class="icone"></i>
      <span>{{this.texto}}</span>
    </a>
    <div class="sidebar-submenu" v-bind:style="{display: display}">
      <ul v-for="(item , i) in this.subMenu" :key="i">
        <li>
          <router-link :to="item.path">
            <span>{{item.texto}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </li>
</template> 

<script>
export default {
  props: ["texto", "path", "icone", "subMenu"],
  mounted: function () {
    console.log();
  },
  data() {
    return {
      display: "none",
      aberto: false,
      condition: false,
    };
  },
  methods: {
    abreMenu() {
      console.log(this.open);
      if (this.aberto) {
        this.display = "none";
        this.aberto = false;
      } else {
        this.display = "block";
        this.aberto = true;
      }
    },
  },
};
</script>

<style scoped>
.sidebar-dropdown {
  cursor: pointer;
}
</style>