<script lang="ts">
    import logo from "$lib/assets/Logo.png";
  import { cn } from "$lib/utils";

    let { class: classname }: { class?: string | null | undefined } = $props();
</script>

<img src={logo} width="50" height="50" alt="logo" class={cn("absolute scale-75 drop-shadow-lg", classname)}> 
<a href="/" class="ml-12 self-center text-xl font-bold">Sharemai</a>