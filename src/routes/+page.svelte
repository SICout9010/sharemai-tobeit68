<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<style>
  /* เพิ่มพื้นหลังหลัก */
  :global(body) {
    background-color: #252736;
  }
</style>

<header class="flex justify-between items-center px-8 py-4 bg-transparent text-white">
  <!-- โลโก้ทางซ้าย -->
  <div class="text-2xl font-bold text-white">
    ShareMai
  </div>
  
  <!-- ปุ่ม Sign Up และ Login ทางขวา -->
  <div class="flex space-x-4">
    <Button class="bg-[#1E2031] text-white font-semibold px-4 py-2 rounded" href="/auth">Sign Up</Button>
    <Button class="bg-[#1E2031] text-white font-semibold px-4 py-2 rounded " href="/main">Login</Button>
  </div>
</header>

<main class="flex items-center justify-center w-full h-screen text-white">
    <!-- เนื้อหาทางซ้าย -->
    <section id="hero-left" class="bg-transparent text-white py-24 px-12 rounded-lg shadow-xl max-w-7xl mx-auto flex items-center gap-24 justify-between w-full h-full">
      <!-- เนื้อหาทางซ้าย -->
      <div class="text-left max-w-xl">
        <h1 class="text-6xl font-bold mb-6">Traveling solo? Find a buddy and share the journey here!</h1>
        <p class="text-lg mb-8">แอปจับคู่หารค่ารถช่วยผู้ใช้ร่วมเดินทาง ลดค่าโดยสาร ประหยัดพลังงาน และลดการปล่อยก๊าซเรือนกระจก</p>
        <button class="bg-[#1E2031] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg">หาเพื่อนร่วมทางเลยตอนนี้</button>
      </div>
      
      <!-- รูปภาพทางขวา -->
      <div class="hidden md:block max-w-md">
        <img src="Group14.png" alt="ภาพที่เกี่ยวข้องกับการเดินทาง" class="rounded-lg shadow-lg w-full h-full object-cover">
      </div>
    </section>
  </main>
  
  
  
  
  
  
