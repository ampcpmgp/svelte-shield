<style>
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-row-gap: 16px;
  }
</style>

<div class="wrapper">
  <slot name="header" />
  <slot name="content" />
  <slot name="footer" />
</div>
