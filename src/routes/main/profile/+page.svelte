<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone,
        toLocalTimeZone,
    } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import YearCalender from "$lib/components/main/profile/YearCalender.svelte";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { enhance } from "$app/forms";
    
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
        <div class="grid grid-cols-2 grid-rows-3 gap-24">
            <div>
                <Label for="fullname" class="text-2xl">Full name</Label>
                <Input type="text" name="fullname" value={data.user?.fullname} id="fullname" placeholder="Ton Tonkrub" />
            </div>
            <div>
                <Label for="nickname" class="text-2xl">Nickname</Label>
                <Input type="text" name="nickname" value={data.user?.nickname} id="nickname" placeholder="tontonton" />
            </div>
            <div class="flex flex-col">
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
            <div>
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