<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import LogoWithName from "$lib/components/main/LogoWithName.svelte";
    import rb_1209 from "$lib/assets/rb_1209.png";
    // Sponsor logos
    import Camphub from "$lib/assets/Camphub.png";
    import TWA from "$lib/assets/twa.jpg";
    import TopCharoen from "$lib/assets/Topcharoen.png";
    import Major from "$lib/assets/major.jpg";
    import Aona from "$lib/assets/AONA.jpg";
    import Lactasoy from "$lib/assets/Lactasoy.jpg";
</script>

<style>
  /* เพิ่มพื้นหลังหลัก */
  :global(body) {
    background-color: #252736;
  }
</style>

<header class="flex justify-between items-center px-8 py-4 bg-transparent text-white">
  <!-- โลโก้ทางซ้าย -->
   <LogoWithName class="scale-75" />
  
  <!-- ปุ่ม Sign Up และ Login ทางขวา -->
  <div class="flex space-x-4">
    <Button class="bg-[#1E2031] text-white font-semibold px-4 py-2 rounded" href="/auth">Sign Up</Button>
    <Button class="bg-[#1E2031] text-white font-semibold px-4 py-2 rounded " href="/main">Login</Button>
  </div>
</header>

<main class="flex flex-col items-center justify-center w-full min-h-screen text-white font-[prompt]">
    <!-- เนื้อหาทางซ้าย -->
    <section id="hero-left" class="bg-transparent text-white py-12 px-12 rounded-lg max-w-7xl mx-auto flex items-center gap-24 justify-between w-full h-full">
      <!-- เนื้อหาทางซ้าย -->
      <div class="text-left max-w-xl">
        <h1 class="text-6xl font-bold mb-6 font-[montserrat]">Traveling solo? Find a buddy and share the journey here!</h1>
        <p class="text-lg mb-8">แอปจับคู่หารค่ารถช่วยผู้ใช้ร่วมเดินทาง ลดค่าโดยสาร ประหยัดพลังงาน และลดการปล่อยก๊าซเรือนกระจก</p>
        <Button class="bg-[#1E2031] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg" href="/main">หาเพื่อนร่วมทางเลยตอนนี้</Button>
      </div>
      
      <!-- รูปภาพทางขวา -->
      <div class="hidden md:block max-w-md">
        <img src={rb_1209} alt="ภาพที่เกี่ยวข้องกับการเดินทาง" class="rounded-lg w-full h-full object-cover scale-150">
      </div>
    </section>
    <!-- Sponsors -->
    <Separator class="my-4 max-w-5xl" />
    <section class="w-full h-[20vh] flex flex-col items-center justify-center gap-4">
      <p class="text-primary font-bold text-2xl">ขอบคุณผู้ใหญ่ใจดี</p>
      <div class="w-full flex flex-wrap items-center justify-center gap-8">
        <img src={Camphub} alt="sponsor" class="w-24 h-24 object-contain">
        <img src={TWA} alt="sponsor" class="w-24 h-24 object-contain">
        <img src={TopCharoen} alt="sponsor" class="w-24 h-24 object-contain">
        <img src={Major} alt="sponsor" class="w-24 h-24 object-contain">
        <img src={Aona} alt="sponsor" class="w-24 h-24 object-contain">
        <img src={Lactasoy} alt="sponsor" class="w-24 h-24 object-contain">
      </div>
    </section>
  </main>
  
  
  
  
  
  
