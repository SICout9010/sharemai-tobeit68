<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import YearCalender from "$lib/components/main/profile/YearCalender.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { enhance } from "$app/forms";
    import {
        type DateValue,
        DateFormatter,
    } from "@internationalized/date";
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    
    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });

    let { data } = $props();
    
    let birthday_value = $state<DateValue>(data.user?.birthday);
    let gender_value = $state<string>(data.user?.gender_value);
</script>

<div class="w-full flex min-h-screen font-[prompt]">
    <form method="POST" action="?/update_info" class="w-full flex flex-col gap-10 items-start justify-start p-10" use:enhance={({ formData }) => {
        formData.append("birthday", birthday_value ? birthday_value.toString() : '');
        formData.append("gender", gender_value || '');
    }}>
        <!-- Card showing profile -->
        <Card.Root class="w-full md:max-w-2xl p-2">
            <Card.Header>
                <Card.Title class="text-2xl">Profile</Card.Title>
            </Card.Header>
            <Card.Content class="space-y-4 md:flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Avatar.Root>
                        <Avatar.Image src={`${PUBLIC_POCKETBASE_URL}/api/files/${data.user?.collectionId}/${data.user?.id}/${data.user?.avatar}`} alt="user-avatar" />
                        <Avatar.Fallback>{data.user?.fullname}</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="flex flex-col">
                        <p class="text-2xl">{data.user?.fullname}</p>
                        <p class="text-muted-foreground">{data.user?.nickname}</p>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center gap-4">
                    <p class="text-4xl">THB{data.user?.credits ?? 0}</p>
                    <Button class="shadow-lg" variant="outline" href='/main/payment'>Payment</Button>
                </div>
            </Card.Content>
        </Card.Root>
        <div class="grid grid-cols-2 grid-rows-3 gap-4 md:gap-24">
            <div>
                <Label for="fullname" class="text-2xl">Full name</Label>
                <Input type="text" name="fullname" value={data.user?.fullname} id="fullname" placeholder="Ton Tonkrub" />
            </div>
            <div>
                <Label for="nickname" class="text-2xl">Nickname</Label>
                <Input type="text" name="nickname" value={data.user?.nickname} id="nickname" placeholder="tontonton" />
            </div>
            <div class="flex flex-col col-span-2 md:col-span-1">
                <Label class="text-2xl">Birthday</Label>
                <Popover.Root>
                    <Popover.Trigger>
                        <Button
                            variant="outline"
                            class={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !birthday_value && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon class="mr-2 size-4" />
                            {birthday_value ? df.format(new Date(birthday_value.toString())) : "Select a date"}
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content class="w-auto p-0">
                        <YearCalender bind:value={birthday_value} type="single" initialFocus />
                    </Popover.Content>
                </Popover.Root>
            </div>
            <div class="col-span-2 md:col-span-1">
                <Label class="text-2xl">Gender</Label>
                <Select.Root type="single" bind:value={gender_value}>
                    <Select.Trigger class="w-[180px]">
                        {gender_value ?? "Please select"}
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="Male">Male</Select.Item>
                      <Select.Item value="Female">Female</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>
            <div>
                <Label for="email" class="text-2xl">Gmail</Label>
                <Input type="email" value={data.user?.email} id="email" disabled />
            </div>
        </div>
        <!-- Information -->
        <div class="w-full h-[30vh]">
            <Label for="info" class="text-2xl">Information</Label>
            <Textarea id="info" name="info" value={data.user?.info} class="h-full" />
        </div>
        <Button class="w-[280px] mt-10" type="submit">Save</Button>
    </form>

</div>