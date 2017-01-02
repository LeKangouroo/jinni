<template>
  <section class="s-home">
    home
  </section>
</template>
<script>

  import events from 'classes/events';

  export default {

    mounted() {

      console.log('home section loaded');
      events.emit('section:loaded');
    },
    destroyed() {

      events.emit('section:destroyed');
    }
  };

</script>
