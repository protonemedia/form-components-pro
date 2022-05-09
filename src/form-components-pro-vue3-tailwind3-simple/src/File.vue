<template>
  <div class="mt-4">
    <label class="block">
      <Label :label="label" />
      <div :class="{ 'mt-1': label }">
        <a
          @submit.prevent
          class="
            inline-block
            px-3
            py-2
            rounded-md
            border border-gray-300
            shadow-sm
            bg-gray-100
            hover:bg-gray-300
            py-1
            cursor-pointer
            relative
          "
        >
          <slot>Browse...</slot>
          <input
            :name="name"
            :multiple="multiple"
            type="file"
            v-bind="$attrs"
            v-on="listenersWithFileChange"
            ref="input"
            class="invisible absolute inset-0 w-full h-full disabled:opacity-75"
          />
        </a>

        <slot name="filenames">
          <div class="mt-2 text-sm italic" v-if="model">
            <p v-for="(filename, key) in filenames" :key="key">
              {{ filename }}
            </p>
          </div>
        </slot>
      </div>
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { File } from "@protonemedia/form-components-pro-vue3-core";
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