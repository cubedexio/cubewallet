<template>
  <div>
    <input class='cube-input' :placeholder="placeholder" :value='value' ref="cubeinput" @input='updateValue()'/>
  </div>
</template>

<script>


  export default {
    props: [
      'value',
      'placeholder'
    ],
    components: {},
    data: function () {
      return {}
    },
    methods: {
        updateValue: function() {
            this.$emit('input', this.$refs.cubeinput.value);
        }
    }
}
</script>

<style scoped>
.cube-input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: white;
    height: 3em;
    /* line-height: 2.2em; */
    border-bottom: solid 1px white;
    border-radius: 0;
}

  .cube-input::-webkit-input-placeholder {
    color: white;
  }

  .cube-input:-moz-placeholder {
    color: white;
  }

  .cube-input:-ms-input-placeholder {
    color: white;
  }

  .reversed .cube-input {
    color: black;
    border-bottom: solid 1px black;
}
</style>
