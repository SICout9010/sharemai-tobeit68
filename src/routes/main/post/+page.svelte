<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import * as Avatar from "$lib/components/ui/avatar";
    import { onMount } from 'svelte';
    import { loadGoogleMaps, defaultConfig } from '$lib/google';
    import MapMarkerRadiusOutline from 'virtual:icons/mdi/map-marker-radius-outline';
    
    let mapElement: HTMLElement;
    let map: google.maps.Map;
    let desirelocation: string | undefined = $state();

    let { data } = $props();

    onMount(async () => {
        await loadGoogleMaps();

        map = new google.maps.Map(mapElement, {
        center: defaultConfig.center,
        zoom: defaultConfig.zoom
        });
    });
</script>

<div class="w-full flex min-h-screen font-[prompt]">
    <!-- Main Content -->
    <div class="flex-1 w-full min-h-screen md:p-4">

        <div class="relative flex items-center justify-center gap-10 h-full">
            <!-- Googles Map -->
            <div class="w-full md:w-[50%] h-full space-y-4">
                <div class="bg-muted w-full min-h-[8vh] rounded-lg shadow-lg flex items-center">
                    <MapMarkerRadiusOutline class="w-12 h-12 m-2" />
                    <p>{desirelocation}</p>
                </div>
                <div bind:this={mapElement} class="w-full h-full rounded-lg shadow-lg flex items-center justify-center">
    
                </div>
            </div>

            <!-- Inputs -->
             <div class="w-full md:w-[50%] flex items-center justify-center gap-10 h-full">
                <Card.Root class="w-full max-w-2xl h-full">
                    <Card.Header>
                        <Card.Title class="text-2xl">Share your location {data.user?.fullname}</Card.Title>
                        <Card.Description>Share your location with others</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div class="space-y-4">
                            <Avatar.Root class="w-24 h-24 mx-auto">
                                <Avatar.Image src={data.user?.avatar} alt={data.user?.fullname} />
                            </Avatar.Root>
                            <Button class="w-full">Share Location</Button>
                        </div>
                    </Card.Content>
                </Card.Root>
             </div>
        </div>
    </div>
</div>