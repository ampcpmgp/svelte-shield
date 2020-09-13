<script>
  import packageJson from '../../../../package.json'

  const { version } = packageJson
</script>

<style>
  .wrapper {
    display: grid;
    justify-content: right;
    margin-bottom: -10px;
  }
</style>

<small class="wrapper">Updated: {version}</small>
