<script>
  import packageJson from '../../../../version.json'

  const { value } = packageJson
</script>

<style>
  .wrapper {
    display: grid;
    justify-content: right;
    margin-bottom: -10px;
  }
</style>

<small class="wrapper">Version: {value}</small>
