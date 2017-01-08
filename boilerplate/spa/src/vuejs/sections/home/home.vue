<template>
  <section class="s-home">
    home
  </section>
</template>
<script>

  import events from 'core/events';

  export default {

    mounted() {

      console.log('home section loaded');
      events.notifyObservers('section:loaded');
    },
    destroyed() {

      events.notifyObservers('section:destroyed');
    }
  };

</script>
