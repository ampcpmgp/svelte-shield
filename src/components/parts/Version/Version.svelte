<script>
  import packageJson from "../../../../version.json";

  const { value } = packageJson;
</script>

<small class="wrapper">Version: {value}</small>

<style>
  .wrapper {
    display: grid;
    justify-content: right;
    margin-bottom: -10px;
  }
</style>
