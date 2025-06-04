<script setup lang="ts">
import { isBrowserFeature, Principal, type Feature, type FeatureWithValue } from '@theemo/theme';
import { injectTheemo } from '@theemo/vue';

const canUnset = (feature: Feature) => {
  return isBrowserFeature(feature) && (feature as FeatureWithValue).principal === Principal.User;
};

const theemo = injectTheemo();
</script>

<template>
  <h1>Themes</h1>

  <div id="themes" v-for="theme in theemo?.themes">
    <button type="button" @click="theemo?.switchTheme(theme.name)">
      {{theme.name}}
    </button>
  </div>

  <h2>Features</h2>

  <div id="features" v-for="feature in theemo?.features">
    <fieldset>
      <legend>{{feature.name}}</legend>

      <p>Principal: {{feature.principal}}</p>

      <div id="options" v-for="option in feature.options">
        <label>
          <input
            type="radio"
            name="{{feature.name}}"
            value="{{option}}"
            :checked="feature.value == option"
            @change="theemo?.setFeature(feature.name, option)"
          />
          <span>
            {{option}}

            <template v-if="isBrowserFeature(feature) && option === feature.browserValue">
              (System)
            </template>
          </span>
        </label>
      </div>

      <button type="button" @click="theemo?.unsetFeature(feature.name)" v-if="canUnset(feature)">
        Unset Mode
      </button>
    </fieldset>
  </div>
</template>

