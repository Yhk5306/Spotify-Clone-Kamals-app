<template>
  <div class="ms_content_wrapper padder_top80">
    <h2>" {{this.undefinedValue}} " Couldn't Found Please Try Something else</h2>
    <span>Please make sure you spell words correctly or use fewer or different keywords. </span>
  </div>
</template>

<script>
export default {
  props:['undefinedValue']
}
</script>

<style scoped>
h2{
  color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
}
span{
  color: #eeeeee;
}
</style>