<script lang="ts">
    // import { Button, Card, Input, Avatar, Separator } from '@shadcn/ui-svelte';
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import * as Avatar from "$lib/components/ui/avatar";
    import { onMount } from 'svelte';
    import { loadGoogleMaps, defaultConfig } from '$lib/google';
    import MapMarkerRadiusOutline from 'virtual:icons/mdi/map-marker-radius-outline';
    
    let mapElement: HTMLElement;
    let map: google.maps.Map;
    let desirelocation: string | undefined = '';

    onMount(async () => {
        await loadGoogleMaps();

        // Initial Directions Services
        let directionsService = new google.maps.DirectionsService();
        let directionsRenderer = new google.maps.DirectionsRenderer();

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
                    directionsService.route({
                        origin: firstplace,
                        destination: secondplace,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            console.log(result);
                            desirelocation = result?.routes[0].legs[0].start_address + ' to ' + result?.routes[0].legs[0].end_address;
                            directionsRenderer.setDirections(result);
                        }
                    });
                    firstplace = '';
                    secondplace = '';
                }
            }
        });
    });
</script>

<div class="w-full flex min-h-screen font-[prompt]">
    <!-- Main Content -->
    <div class="flex-1 w-full min-h-screen p-4">

        <div class="flex items-center justify-center gap-10 h-full">
            <!-- Googles Map -->
            <div class="w-[50%] h-full space-y-4">
                <div class="bg-muted w-full min-h-[8vh] rounded-lg shadow-lg flex items-center">
                    <MapMarkerRadiusOutline class="w-12 h-12 m-2" />
                    <p>{desirelocation}</p>
                </div>
                <div bind:this={mapElement} class="w-full h-full rounded-lg shadow-lg flex items-center justify-center">
    
                </div>
            </div>

            <!-- Profile Cards --> 
            <div class="flex flex-col items-center justify-center gap-10 w-[50%]">
                <!-- Top Navigation -->
                <div class="flex justify-between items-center gap-2 w-full h-full">
                    <Button variant="default">🔎</Button>
                    <Input placeholder="Search" />
                </div>
                <Card.Root class="w-full p-4">
                    <Card.Header>
                        <Card.Title class="flex items-center gap-2">
                            <Avatar.Root>
                                <Avatar.Image src="https://media.tenor.com/Db9euJyQnbUAAAAi/chat-pouce.gif" alt="@shadcn" />
                                <Avatar.Fallback>CN</Avatar.Fallback>
                            </Avatar.Root>
                            @UserA007X
                        </Card.Title>
                        <Card.Description>Joined November 2024</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>สวัสดีครับ ผมคือแฮกเกอร์ครับ</p>
                        <p>Joined November 2024</p>
                        <p>Male, 18</p>
                    </Card.Content>
                </Card.Root>
                <Card.Root class="w-full p-4">
                    <Card.Header>
                        <Card.Title class="flex items-center gap-2">
                            <Avatar.Root>
                                <Avatar.Image src="https://media.tenor.com/Db9euJyQnbUAAAAi/chat-pouce.gif" alt="@shadcn" />
                                <Avatar.Fallback>CN</Avatar.Fallback>
                            </Avatar.Root>
                            @UserA007X
                        </Card.Title>
                        <Card.Description>Joined November 2024</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>สวัสดีครับ ผมคือแฮกเกอร์ครับ</p>
                        <p>Joined November 2024</p>
                        <p>Male, 18</p>
                    </Card.Content>
                </Card.Root>
                <Card.Root class="w-full p-4">
                    <Card.Header>
                        <Card.Title class="flex items-center gap-2">
                            <Avatar.Root>
                                <Avatar.Image src="https://media.tenor.com/Db9euJyQnbUAAAAi/chat-pouce.gif" alt="@shadcn" />
                                <Avatar.Fallback>CN</Avatar.Fallback>
                            </Avatar.Root>
                            @UserA007X
                        </Card.Title>
                        <Card.Description>Joined November 2024</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>สวัสดีครับ ผมคือแฮกเกอร์ครับ</p>
                        <p>Joined November 2024</p>
                        <p>Male, 18</p>
                    </Card.Content>
                </Card.Root>
            </div>
        </div>
        
    </div>
</div>
