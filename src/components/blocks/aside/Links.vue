<template>
  <nav class="links">
    <div v-for="menu in menus" :key="menu.name" class="links__item">
      <div v-if="menu.path" @click="closeSubMenu">
        <router-link :to="menu.path">
          <p class="links__element">{{ menu.title }}</p>
        </router-link>
      </div>
      <div v-else>
        <div @click="toggleSubMenu(menu.name)">
          <p :class="['links__parent', {'active': isActiveSubMenu(menu.name) || isCurrentRouteInSubMenu(menu.items || [])}]">
            {{ menu.title }}
            <ArrowDown v-if="menu.items" :pathFill="getArrowColor(menu.name)" :clipFill="'none'"
                       :isActive="isActiveSubMenu(menu.name)"/>
          </p>
        </div>
        <transition name="fade">
          <div class="links__list" v-if="isActiveSubMenu(menu.name)">
            <div v-for="item in menu.items" :key="item.path" @click="closeSubMenu">
              <router-link :to="item.path" active-class="router-link-active-custom">
                <p class="links__element">{{ item.title }}</p>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>


<script>
import ArrowDown from '@/components/ui/ArrowDown.vue';

export default {
  name: 'LinksBlock',
  components: {
    ArrowDown,
  },
  data() {
    return {
      activeSubMenu: null,
      menus: [
        {
          name: 'booking',
          title: 'Услуги',
          items: [
            {title: 'Бронирование', path: '/booking'},
            {title: 'Заявки', path: '/application'}
          ]
        },
        // {
        //   name: 'application',
        //   title: 'Заявки',
        //   path: '/application'
        // },
        {
          name: 'users',
          title: 'Пользователи',
          path: '/users',
        },
        {
          name: 'residents',
          title: 'Резиденты',
          items: [
            {title: 'Резиденты1', path: '/residents1'},
            {title: 'Резиденты2', path: '/residents2'}
          ]
        },
        {
          name: 'infrastructure',
          title: 'Инфраструктура',
          path: '/infrastructure',
        },
        // {
        //   name: 'booking',
        //   title: 'Бронирование',
        //   path: '/booking',
        // },
        {
          name: 'events',
          title: 'События ',
          path: '/events',
        },
        {
          name: 'content',
          title: 'Контент приложения ',
          path: '/content',
        },
        {
          name: 'employees',
          title: 'Сотрудники ',
          path: '/employees',
        },
        {
          name: 'notifications',
          title: 'Уведомления ',
          path: '/notifications',
        },
        {
          name: 'support',
          title: 'Служба поддержки ',
          path: '/support',
        },
      ],
    };
  },
  watch: {
    '$route'() {
      this.activeSubMenu = null;
    }
  },
  methods: {
    toggleSubMenu(menu) {
      this.activeSubMenu = this.activeSubMenu === menu ? null : menu;
    },
    isActiveSubMenu(menu) {
      return this.activeSubMenu === menu;
    },
    getArrowColor(menu) {
      return this.isActiveSubMenu(menu) || this.isCurrentRouteInSubMenu(this.menus.find(m => m.name === menu).items) ? 'white' : '#75809E';
    },
    closeSubMenu() {
      this.activeSubMenu = null;
    },
  },
  computed: {
    isCurrentRouteInSubMenu() {
      return (items) => items.some(item => this.$route.path.startsWith(item.path));
    }
  },
};
</script>


<style scoped lang="scss">
.links {
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  &__element {
    color: #0E1F4D;
    padding: 10px;
    border-radius: 10px;
    font-family: 'SFProDisplay SemiBold';
    font-size: 15px;
    line-height: 22px;
  }

  &__parent {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
    @include SemiBold15;
  }

  &__list {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
}

.router-link-active-custom {
  .links__element {
    background: $yellow2;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.router-link-active {
  display: block;
  background: $yellow;
  border-radius: 10px;

  .links__element {
    color: $white;
  }
}

.active {
  background: $yellow;
  color: $white;
}
</style>