<script lang="ts">
  import { isBrowserFeature, Principal } from '@theemo/theme';
  import { getTheemoContext } from '@theemo/svelte';
  import type { Feature, FeatureWithValue } from '@theemo/theme';

  const theemo = getTheemoContext();

  const canUnset = (feature: Feature) => {
    return (
      isBrowserFeature(feature) &&
      (feature as FeatureWithValue).principal === Principal.User
    );
  };
</script>

<h1>Themes</h1>

<div id="themes">
  {#each theemo.themes as theme}
    <button type="button" on:click={() => theemo.switchTheme(theme.name)}>
      {theme.name}
    </button>
  {/each}
</div>

<h2>Features</h2>

<div id="features">
  {#each theemo.features as feature}
    <fieldset>
      <legend>{feature.name}</legend>

      <p>Principal: {feature.principal}</p>

      <div id="options">
        {#each feature.options as option}
          <label>
            <input
              type="radio"
              name={feature.name}
              value={option}
              checked={feature.value === option}
              on:change={() => theemo.setFeature(feature.name, option)}
            />
            <span>
              {option}

              {#if isBrowserFeature(feature) && option === feature.browserValue}
                (System)
              {/if}
            </span>
          </label>
        {/each}
      </div>

      {#if canUnset(feature)}
        <button
          type="button"
          on:click={() => theemo.unsetFeature(feature.name)}
        >
          Unset Mode
        </button>
      {/if}
    </fieldset>
  {/each}
</div>
