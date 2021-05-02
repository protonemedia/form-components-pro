<template>
  <div class>
    <label class>
      <Label :label="label" />

      <a @submit.prevent>
        <slot>Browse...</slot>
        <input
          :name="name"
          :multiple="multiple"
          type="file"
          v-bind="$attrs"
          v-on="listenersWithFileChange"
          ref="input"
          style="visibility: hidden; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; width: 100%; height: 100%;"
        />
      </a>

      <slot name="filenames">
        <div v-if="model">
          <p v-for="(filename, key) in filenames" :key="key">{{ filename }}</p>
        </div>
      </slot>
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { File } from "@protonemedia/form-components-pro-vue2-core";
import Error from "./Error.vue";
import Label from "./Label.vue";

export default {
  components: {
    Error,
    Label,
  },

  mixins: [File],
};
</script>