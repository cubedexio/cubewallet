<template>
  <div class="">
    <textarea 
    autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" rows="4" cols="30" 
    :placeholder='placeholder' class='cube-textarea' :value='value' ref="cubetextarea" @input='updateValue()'/>
  </div>
</template>

<script>


export default {
    props: ['value','placeholder'],
    components: {
        
    },
    data:  function() {
        return {
        }
    },
    methods: {
        updateValue: function() {
            this.$emit('input', this.$refs.cubetextarea.value);
        }
    }
}
</script>

<style scoped>

.cube-textarea {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    
    font-size: inherit;
    /* color: white; */
    
    padding: 8px;
    border: solid 1px #651FFF;
    border-radius: 7px;

    display: block;

    resize: none;

    color: inherit;
    font-size: 1em;
    line-height: inherit;
    outline: 0;

}
</style>
