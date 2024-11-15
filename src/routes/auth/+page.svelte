<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import { enhance } from '$app/forms';
    import type { PageData } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Avatar from '$lib/components/ui/avatar'
    import * as Card from '$lib/components/ui/card';
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Google from 'virtual:icons/mdi/google';
    import IdCardOutline from 'virtual:icons/mdi/id-card-outline';

    let { data }: { data: PageData } = $props()
    let realName = $state("");
    let identityNumber = $state("");
    let facePhoto: FileList | null = $state(null);

    function handleSubmit() {
        // Placeholder for form submission
        console.log({ realName, identityNumber, facePhoto });
    }

    let user = data.user;
</script>

<div class="flex items-center justify-center min-h-screen font-[montserrat]">
    <div class="flex items-center justify-center w-full">
        <!-- Login -->
        <div class="w-[50%] h-screen flex items-center justify-center">
            {#if user}
                <div class="flex flex-col justify-center items-center gap-10">
                    <h1 class="text-7xl font-bold">Login</h1>
                    <Avatar.Root class="w-64 h-64">
                        <Avatar.Image src={`${PUBLIC_POCKETBASE_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`} alt="@shadcn" />
                        <Avatar.Fallback>CN</Avatar.Fallback>
                    </Avatar.Root>
                    <p>You're logged with {user.username}</p>
                    <form method="post" action="?/logout">
                        <Button type="submit" class="w-64">Logout</Button>
                    </form>
                </div>
            {:else}
                
                <form method="post" action="?/google" class="flex flex-col gap-10 items-center justify-center" use:enhance>
                    <h1 class="text-7xl font-bold">Login</h1>
                    <Button type="submit" variant="outline" class="w-64">
                        <Google class="w-6 h-6 mr-2" />
                        Sign in with Google
                    </Button>
                </form>
            {/if}
        </div>
        <!-- Side background -->
        <div class="hidden md:flex bg-[#475569] w-[50%] h-screen">
            <!-- Security Form, Input identity-number, FacePhoto, RealName -->
            <Card.Root class="max-w-md mx-auto my-auto h-auto">
                <Card.Header>
                  <Card.Title>Security Verification</Card.Title>
                  <Card.Description>
                    Please provide your personal information for verification purposes
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <form onsubmit={handleSubmit} class="space-y-6">
                    <IdCardOutline class="w-16 h-16" />
                    <div class="space-y-2">
                      <Label for="realName">Real Name</Label>
                      <Input
                        id="realName"
                        type="text"
                        bind:value={realName}
                        placeholder="Enter your legal name"
                        required
                      />
                    </div>
            
                    <div class="space-y-2">
                      <Label for="identityNumber">Identity Number</Label>
                      <Input
                        id="identityNumber"
                        type="text"
                        bind:value={identityNumber}
                        placeholder="Enter your ID number"
                        required
                      />
                    </div>
            
                    <div class="space-y-2">
                      <Label for="facePhoto">Face Photo</Label>
                      <Input
                        id="facePhoto"
                        type="file"
                        accept="image/*"
                        bind:value={facePhoto}
                        required
                      />
                      <p class="text-sm text-gray-500">
                        Please upload a clear photo of your face
                      </p>
                    </div>
            
                    <Button type="submit" class="w-full">Submit Verification</Button>
                  </form>
                </Card.Content>
              </Card.Root>
        </div>
    </div>
</div>