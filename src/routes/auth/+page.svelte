<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import { enhance } from '$app/forms';
    import type { PageData } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Avatar from '$lib/components/ui/avatar'
    import Google from 'virtual:icons/mdi/google';

    export let data: PageData;
    let user = data.user;
</script>

<div class="flex items-center justify-center min-h-screen font-[montserrat]">
    <div class="flex items-center justify-center w-full">
        <!-- Login -->
        <div class="w-[50%] h-screen flex items-center justify-center">
            {#if user}
                <div class="flex flex-col justify-center items-center gap-10">
                    <h1 class="text-7xl font-bold">Login</h1>
                    <Avatar.Root class="w-64 h-64">
                        <Avatar.Image src={`${PUBLIC_POCKETBASE_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`} alt="@shadcn" />
                        <Avatar.Fallback>CN</Avatar.Fallback>
                    </Avatar.Root>
                    <p>You're logged with {user.username}</p>
                    <form method="post" action="?/logout">
                        <Button type="submit" class="w-64">Logout</Button>
                    </form>
                </div>
            {:else}
                
                <form method="post" action="?/google" class="flex flex-col gap-10 items-center justify-center" use:enhance>
                    <h1 class="text-7xl font-bold">Login</h1>
                    <Button type="submit" variant="outline" class="w-64">
                        <Google class="w-6 h-6 mr-2" />
                        Sign in with Google
                    </Button>
                </form>
            {/if}
        </div>
        <!-- Side background -->
        <div class="hidden md:flex bg-[#475569] w-[50%] h-screen">

        </div>
    </div>
</div>