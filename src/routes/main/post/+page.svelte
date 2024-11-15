<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { onMount } from 'svelte';
    import { loadGoogleMaps, defaultConfig } from '$lib/google';
    import MapMarkerRadiusOutline from 'virtual:icons/mdi/map-marker-radius-outline';
    import Label from "$lib/components/ui/label/label.svelte";
    import { enhance } from "$app/forms";
    
    let mapElement: HTMLElement;
    let map: google.maps.Map;
    let desirelocation: string | undefined = $state();

    let { data } = $props();

    const sex_preferences = [
        { value: "male", label: "Male"},
        { value: "female", label: "Female"},
        { value: "both", label: "Both"}
    ]

    // Value to pass to form
    let sexValue = $state("");
    let firstplace: string = $state('');
    let secondplace: string = $state('');
    let seats: number = $state(1);
    let distance_km: number = $state(0);
    let possible_costs: number = $state(0);

    const sexContent = $derived(
        sex_preferences.find((f) => f.value === sexValue)?.label ?? "Select a gender"
    );

    onMount(async () => {
        await loadGoogleMaps();

        // Initial Directions Services
        let directionsService = new google.maps.DirectionsService();
        let directionsRenderer = new google.maps.DirectionsRenderer();

        map = new google.maps.Map(mapElement, {
            center: defaultConfig.center,
            zoom: defaultConfig.zoom
        });
        directionsRenderer.setMap(map);

        map.addListener('dblclick', ({ domEvent, latLng }: { domEvent: MouseEvent, latLng: any }) => {
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
                        console.log(result?.routes[0].legs[0].start_location.lat(), result?.routes[0].legs[0].start_location.lng());
                        console.log(result?.routes[0].legs[0].end_location.lat(), result?.routes[0].legs[0].end_location.lng());
                        firstplace = `${result?.routes[0].legs[0].start_location.lat()} ${result?.routes[0].legs[0].start_location.lng()}`;
                        secondplace = `${result?.routes[0].legs[0].end_location.lat()} ${result?.routes[0].legs[0].end_location.lng()}`;
                        distance_km = result?.routes[0].legs[0].distance?.value ? result.routes[0].legs[0].distance.value / 1000 : 0;

                        // Calculate possible costs as 10THB per KM.
                        possible_costs = distance_km * 10;
                        possible_costs /= seats;
                        possible_costs.toFixed(2);

                        directionsRenderer?.setDirections(result);
                    }
                });
            }
        });
    });

    function handleSeatUpdated() {
        if (seats > 0 && distance_km > 0) {
            possible_costs = distance_km * 10;
            possible_costs /= seats;
            possible_costs.toFixed(2);
        }
    }

    // HandleReset, reset every reactive variables
    function handleReset() {
        firstplace = '';
        secondplace = '';
        seats = 1;
        distance_km = 0;
        possible_costs = 0;
    }

</script>

<div class="w-full flex min-h-screen font-[prompt]">
    <!-- Main Content -->
    <div class="flex-1 w-full min-h-screen md:p-4">

        <div class="relative flex flex-col md:flex-row items-center justify-center gap-10 h-full">
            <!-- Googles Map -->
            <div class="w-full md:w-[50%] h-full space-y-4">
                <div class="bg-muted w-full min-h-[8vh] rounded-lg shadow-lg flex items-center">
                    <MapMarkerRadiusOutline class="w-12 h-12 m-2" />
                    <p>{desirelocation}</p>
                </div>
                <div bind:this={mapElement} class="w-full h-[50vh] md:h-full rounded-lg shadow-lg flex items-center justify-center">
    
                </div>
            </div>

            <!-- Inputs -->
             <div class="w-full md:w-[50%] flex items-center justify-center gap-10 h-full">
                <Card.Root class="w-full max-w-2xl h-full">
                    <Card.Header>
                        <Card.Title class="text-2xl">Create your post, {data.user?.fullname}</Card.Title>
                        <Card.Description>Share with others</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <form method="POST" action="?/create_post" class="space-y-4" use:enhance>
                            <Input type="number" name="distance_km" value={distance_km} class="hidden" formnovalidate  />
                            <Input type="text" name="user_id" value={data.user?.id} class="hidden" formnovalidate  />
                            <div>
                                <Label for="departure_location">Departure Location</Label>
                                <Input type="text" required name="departure_location" bind:value={firstplace} readonly placeholder="Departure Location" />
                                <p class="text-muted-foreground text-sm">Click on the map to select the location.</p>
                            </div>
                            <div>
                                <Label for="destination">Destination</Label>
                                <Input type="text" required name="destination" bind:value={secondplace} readonly placeholder="Destination" />
                                <p class="text-muted-foreground text-sm">Click on the map to select the location.</p>
                            </div>
                            <div class="flex w-full justify-between gap-4">
                                <div>
                                    <Label for="seats">Available Seats</Label>
                                    <Input type="number" name="seats" max={4} min={1} bind:value={seats} onchange={handleSeatUpdated} placeholder="Available Seats" />
                                </div>
                                <div>
                                    <Label for="prefer_sex">Prefer</Label>
                                    <Select.Root type="single" name="prefer_sex" bind:value={sexValue}>
                                        <Select.Trigger class="w-[180px]">
                                          {sexContent}
                                        </Select.Trigger>
                                        <Select.Content>
                                          <Select.Group>
                                            <Select.GroupHeading>Gender</Select.GroupHeading>
                                            {#each sex_preferences as sex}
                                              <Select.Item value={sex.value} label={sex.label}>
                                                {sex.label}
                                              </Select.Item>
                                            {/each}
                                          </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </div>
                            </div>
                            <div>
                                <Label for="additional_notes">Additional Notes</Label>
                                <Textarea required name="additional_notes" placeholder="Additional Notes" />
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <Label for="possible_costs">Possible Costs</Label>
                                <p class="text-2xl">{possible_costs} THB/Person</p>
                            </div>
                            <Button type="submit" class="w-full" formnovalidate >Create Post</Button>
                            <Button type="button" onclick={handleReset} class="w-full" variant="destructive" formnovalidate >Reset</Button>
                        </form>
                    </Card.Content>
                </Card.Root>
             </div>
        </div>
    </div>
</div>