<script lang="ts">
    import Header from "$lib/components/main/Header.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    
    let { children, data } = $props();
</script>
    
<Sidebar.Provider>
    <Sidebar.Root>
        <Sidebar.Group>
            <Sidebar.GroupLabel>My Account</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                <Sidebar.MenuItem>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-4xl">$ 1,500</p>
                        <p class="text-sm">Available Balance</p>
                        <Sidebar.MenuButton>Payment</Sidebar.MenuButton>
                    </div>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Settings</Sidebar.MenuButton>
                </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.GroupContent>
            </Sidebar.Group>
    </Sidebar.Root>
    <main class="w-full">
        <Header user={data.user ?? undefined} />
        <Sidebar.Trigger class="absolute" />
        {@render children?.()}
    </main>
</Sidebar.Provider>