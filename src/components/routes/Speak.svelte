<script>
  import { onMount } from "svelte";
  import { mode } from "../../states/morpheme";
  import Home from "../containers/Home/Home.svelte";

  onMount(() => {
    mode.set("speak");
  });
</script>

<Home />
