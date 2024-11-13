<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import type { RecordModel } from "pocketbase";

    let { data }: { data: RecordModel } = $props();
</script>

<Card.Root class="w-[90%] p-4">
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
</Card.Root>