<script lang="ts">
    import { Home, User, Settings, CreditCard, ArrowBigUp } from 'lucide-svelte';
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import Header from "$lib/components/main/Header.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Drawer from "$lib/components/ui/drawer";
    import { page } from "$app/stores";
    import { buttonVariants } from '$lib/components/ui/button/button.svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import PostCard from '$lib/components/main/PostCard.svelte';
    
    let { children, data } = $props();
</script>
    
<Sidebar.Provider class="font-[prompt]">
    <Sidebar.Root>
        <Sidebar.Group>
            <Sidebar.GroupLabel>My Account</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    <Sidebar.MenuItem>
                        {#if $page.url.pathname === '/main'}
                            <div class="flex flex-col items-center justify-center">
                                <p class="text-4xl">THB {data.user?.credits ?? 0}</p>
                                <p class="text-sm">Available Balance</p>
                                <Sidebar.MenuButton>
                                    <a href="/main/payment" class="w-full">Payment</a>
                                </Sidebar.MenuButton>
                            </div>
                        {:else}
                            <div class="flex flex-col items-center justify-center">
                                <Avatar.Root class="w-16 h-16">
                                    <Avatar.Image src={`${PUBLIC_POCKETBASE_URL}/api/files/${data.user?.collectionId}/${data.user?.id}/${data.user?.avatar}`} alt="@shadcn" />
                                    <Avatar.Fallback>CN</Avatar.Fallback>
                                </Avatar.Root>
                                <p>{data.user?.username}</p>
                                <p class="text-muted-foreground">@{data.user?.email}</p>
                            </div>
                        {/if}
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            <a href="/main" class="w-full">Home</a>
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            <a href="#" class="w-full">Settings</a>
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            <a href="/main/profile" class="w-full">Profile</a>
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.GroupContent>
            </Sidebar.Group>
    </Sidebar.Root>
    <main class="w-full">
        <Header user={data.user ?? undefined} />
        <Sidebar.Trigger />
        {@render children?.()}
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 w-full bg-background border-t md:hidden">
        <div class="flex items-center justify-around h-16">
            <a href="/main" class="flex flex-col items-center p-2">
                <Home class="h-6 w-6" />
                <span class="text-xs">Home</span>
            </a>
            <a href="/main/profile" class="flex flex-col items-center p-2">
                <User class="h-6 w-6" />
                <span class="text-xs">Profile</span>
            </a>
            <!-- The Middle is Drawer which will render Card components -->
            {#if $page.url.pathname === '/main'}        
                <Drawer.Root>
                    <Drawer.Trigger class="flex flex-col items-center">
                        <ArrowBigUp class="h-6 w-6" />
                        <span class="text-xs">Posts</span>
                    </Drawer.Trigger>
                    <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Posts</Drawer.Title>
                        <Drawer.Description>@2024 Sharemai</Drawer.Description>
                    </Drawer.Header>
                    <!-- For loop for each posts -->
                    <div class="flex flex-col items-center justify-center gap-4">
                        {#each data.posts as post}
                                <PostCard data={post} />
                        {/each}
                    </div>
                    <Drawer.Footer class="pt-2">
                        <Button href="/main/post">Create Post</Button>
                        <Drawer.Close class={buttonVariants({ variant: "outline" })}
                        >Cancel</Drawer.Close
                        >
                    </Drawer.Footer>
                    </Drawer.Content>
                </Drawer.Root>
            {/if}
            <a href="/main/payment" class="flex flex-col items-center p-2">
                <CreditCard class="h-6 w-6" />
                <span class="text-xs">Payment</span>
            </a>
            <a href="/main/settings" class="flex flex-col items-center p-2">
                <Settings class="h-6 w-6" />
                <span class="text-xs">Settings</span>
            </a>
        </div>
    </nav>
</Sidebar.Provider>