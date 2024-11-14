<script lang="ts">
    // import { Button, Card, Input, Avatar, Separator } from '@shadcn/ui-svelte';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { onMount } from 'svelte';
    import { loadGoogleMaps, defaultConfig } from '$lib/google';
    import { selectedRoute } from "$lib/stores/route.js";
    import MapMarkerRadiusOutline from 'virtual:icons/mdi/map-marker-radius-outline';
    import PostCard from "$lib/components/main/PostCard.svelte";
    
    let mapElement: HTMLElement;
    let map: google.maps.Map;
    let desirelocation: string | undefined = $state();

    // check onMount
    let isMounted = false;

    // Googles Map variables that will be decleared later after onMount.
    let directionsService: google.maps.DirectionsService | undefined = $state();
    let directionsRenderer: google.maps.DirectionsRenderer | undefined = $state();

    let { data } = $props();
    console.log(data);

    onMount(async () => {
        await loadGoogleMaps();
        isMounted = true;

        // Initial Directions Services
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();

        let firstplace: string;
        let secondplace: string;

        map = new google.maps.Map(mapElement, {
        center: defaultConfig.center,
        zoom: defaultConfig.zoom
        });
        directionsRenderer.setMap(map);

        map.addListener('click', ({ domEvent, latLng }: { domEvent: MouseEvent, latLng: any }) => {
            if (domEvent.ctrlKey) {
                if (!firstplace) {
                    firstplace = latLng;
                } else {
                    secondplace = latLng;
                    directionsService?.route({
                        origin: firstplace,
                        destination: secondplace,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            console.log(result);
                            console.log(result?.routes[0].legs[0].start_location.lat(), result?.routes[0].legs[0].start_location.lng());
                            console.log(result?.routes[0].legs[0].end_location.lat(), result?.routes[0].legs[0].end_location.lng());
                            desirelocation = result?.routes[0].legs[0].start_address + ' to ' + result?.routes[0].legs[0].end_address;
                            directionsRenderer?.setDirections(result);
                        }
                    });
                    firstplace = '';
                    secondplace = '';
                }
            }
        });
    });

    // Reactive Event detect if start_latLng and end_latLng is changed.
    $effect(() => {
        if ($selectedRoute.start && $selectedRoute.end && isMounted) {
            directionsService?.route({
                origin: $selectedRoute.start,
                destination: $selectedRoute.end,
                travelMode: google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    desirelocation = result?.routes[0].legs[0].start_address + ' to ' + result?.routes[0].legs[0].end_address;
                    directionsRenderer?.setDirections(result);
                }
            });
        }
    }) 
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
                <div bind:this={mapElement} class="w-full h-full rounded-lg rounded-b-none shadow-lg flex items-center justify-center">
    
                </div>
            </div>

            <!-- Profile Cards --> 
            <div class="hidden md:flex flex-col items-center justify-start gap-10 w-full h-full md:w-[50%]">
                <!-- Top Navigation -->
                <div class="hidden md:flex justify-between items-center gap-2 w-full h-[5vh]">
                    <Button variant="default">🔎</Button>
                    <Input placeholder="Search" />
                </div>
                {#each data.posts as post}
                    <PostCard data={post} />
                {/each}
                <Button class="w-[90%]" href="/main/post">Create Post</Button>
            </div>
        </div>
        
    </div>
</div>
