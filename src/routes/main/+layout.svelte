<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import Header from "$lib/components/main/Header.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Avatar from "$lib/components/ui/avatar";
    import { page } from "$app/stores";
    
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
                                <p class="text-4xl">$ 1,500</p>
                                <p class="text-sm">Available Balance</p>
                                <Sidebar.MenuButton>Payment</Sidebar.MenuButton>
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
                            <a href="/main">Home</a>
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            <a href="/settings">Settings</a>
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            <a href="/main/profile">Profile</a>
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
</Sidebar.Provider>