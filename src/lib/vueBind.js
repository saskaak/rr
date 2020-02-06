/*

Create computed properties that act as local copies of props bound via a v-model or the .sync modifier. The local copies
can then be mutated and the changes are automatically reflected in the parent.

In the parent template:
  <ChildComponent
    v-model="text"
    :color.sync="color"
  />

In the child component:
  @import bind from 'vueBind';
  ...
  props: [value, color],
  computed: {
    localValue: bind.vModel,
    localColor: bind.sync('color'),
  }

These copies can be mutated in the child component. For example:
  <input v-model="localValue" />
  <color-picker v-model="localColor" />

*/


const vModel = {
  get() {
    return this.value;
  },
  set(newValue) {
    this.$emit('input', newValue);
  },
};

function sync(propName) {
  return {
    get() {
      return this[propName];
    },
    set(newValue) {
      this.$emit(`update:${propName}`, newValue);
    },
  }
}

export default { vModel, sync }
