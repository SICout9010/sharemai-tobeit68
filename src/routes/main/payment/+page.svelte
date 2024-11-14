<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { CreditCard } from "lucide-svelte";
    import { toast } from "svelte-sonner";
  
    let paymentMethod = 'credit-card';
    let cardNumber = '';
    let expirationDate = '';
    let cvv = '';
    let cardholderName = '';
    let amountToPay: string = '5';
  
    const handleSubmit = async () => {
      // Handle payment submission
      console.log({ paymentMethod, cardNumber, expirationDate, cvv, cardholderName });

      // Call API to process payment
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amountToPay: Number(amountToPay),
          paymentMethod,
          cardNumber,
          expirationDate,
          cvv,
          cardholderName,
        }),
      })
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('Payment successful');
      } else {
        toast.error('Payment failed');
      }
    }
  </script>
  
  <div class="container mx-auto py-10">
    <Card.Root class="max-w-md mx-auto">
      <Card.Header>
        <Card.Title class="text-2xl">Payment Details</Card.Title>
        <Card.Description>Complete your payment information</Card.Description>
      </Card.Header>
      <Card.Content>
        <!-- Select $5 or $10 or $100 -->
        <Tabs.Root bind:value={amountToPay}>
          <Tabs.List class="flex justify-between">
            {#each ['5', '10', '100'] as amount}
              <Tabs.Trigger value={amount} class="px-4 py-2 rounded-lg cursor-pointer">
                ${amount}
              </Tabs.Trigger>
            {/each}
            </Tabs.List>
        </Tabs.Root>

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div class="space-y-2">
            <Label for="payment-method">Payment Method</Label>
            <Select.Root type='single' bind:value={paymentMethod}>
              <Select.Trigger class="w-full">
                {paymentMethod ?? "Select payment method"}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="credit-card">Credit Card</Select.Item>
                <Select.Item value="paypal">PayPal</Select.Item>
                <Select.Item value="online-banking">Online Banking</Select.Item>
                <Select.Item value="true-money">True Money</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
  
          {#if paymentMethod === 'credit-card'}
            <div class="space-y-4">
              <div class="space-y-2">
                <Label for="cardholder">Cardholder Name</Label>
                <Input 
                  id="cardholder"
                  type="text" 
                  bind:value={cardholderName}
                  placeholder="John Doe"
                />
              </div>
  
              <div class="space-y-2">
                <Label for="card-number">Card Number</Label>
                <Input 
                  id="card-number"
                  type="text" 
                  bind:value={cardNumber}
                  maxlength={16}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
  
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="expiry">Expiration Date</Label>
                  <Input 
                    id="expiry"
                    type="text" 
                    bind:value={expirationDate}
                    placeholder="MM/YY"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="cvv">CVV</Label>
                  <Input 
                    id="cvv"
                    type="text" 
                    bind:value={cvv}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          {/if}
  
          <Button type="submit" class="w-full">
            <CreditCard class="mr-2 h-4 w-4" />
            Pay Now
          </Button>
        </form>
      </Card.Content>
    </Card.Root>
  </div>