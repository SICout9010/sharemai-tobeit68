<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import * as Avatar from "$lib/components/ui/avatar";
    import Button from "$lib/components/ui/button/button.svelte";
    import LogoWithName from "./LogoWithName.svelte";
    export let user;
</script>

<nav class="flex bg-base-100 p-4">
    <div class="relative flex md:flex-1 items-center justify-start">
        <LogoWithName />
    </div>
    <div class="flex-none">
        {#if user}
        <div class="flex gap-4 items-center">
            <p class="hidden md:block">Welcome, {user.username}</p>
            <Avatar.Root>
                <Avatar.Image 
                src={`${PUBLIC_POCKETBASE_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`} alt="user-avatar" 
                />
                <Avatar.Fallback>US</Avatar.Fallback>
            </Avatar.Root>
            <form action="/auth?/logout" method="post">
                <Button type="submit" variant="ghost">Logout</Button>
            </form>
        </div>
        {:else}
            <Button href="/auth" variant="ghost">Login</Button>
            <Button href="/auth" class="rounded-3xl">Sign Up</Button>
        {/if}
    </div>
</nav>