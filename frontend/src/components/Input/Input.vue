<template>
    <div class="input-container">
        <input 
            :type="type" 
            class="field" 
            :placeholder="label" 
            :name="name" 
            :id="name" 
            :required="required" 
            v-model="value"
            @input="handleInput"
        />
        <label for="name" class="label">{{label}}</label>
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: 'field'
        },
        label: {
            type: String,
            default: 'Label'
        },
        value: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        }
    },
    data () {
        return {
            content: this.value
        }
    },
    methods: {
        handleInput (event) {
            this.$emit('input', event.currentTarget.value);
        }
    }
}

</script>

<style lang="scss">
    @import './Input.scss'
</style>