<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import Badge from "../ui/badge/badge.svelte";
    import { selectedRoute } from "$lib/stores/route";
    import type { RecordModel } from "pocketbase";

    let { data }: { data: RecordModel } = $props();

    const handleClick = () => {
        selectedRoute.set({
            start: data.departure_location,
            end: data.destination
        })
    };
</script>

<Card.Root onclick={handleClick} class="w-[90%] p-4 hover:shadow-2xl hover:ring-2 cursor-pointer">
    <Card.Header>
        <Card.Title class="flex items-center gap-2">
            <Avatar.Root>
                <Avatar.Image src={`${PUBLIC_POCKETBASE_URL}/api/files/${data.expand?.user_id.collectionId}/${data.expand?.user_id.id}/${data.expand?.user_id.avatar}`} alt="@shadcn" />
                <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
            {data.expand?.user_id.fullname}
        </Card.Title>
        <Card.Description>{data.created}</Card.Description>
    </Card.Header>
    <Card.Content>
        <p>{data.additional_notes}</p>
    </Card.Content>
    <Card.Footer class="flex flex-col items-start">
        <div>
            <Badge>Available Seats: </Badge>
            {data.available_seats}
        </div>
        <div>
            <Badge>Gender preference:</Badge>
            {data.preferences.sex.charAt(0).toUpperCase() + data.preferences.sex.slice(1)}
        </div>
        <div>
            <Badge>Cost per person</Badge>
            {data.cost_per_person.toFixed(2)}บาท
        </div>
    </Card.Footer>
</Card.Root>