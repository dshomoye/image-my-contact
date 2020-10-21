<script>
	import "./Tailwindcss.svelte"
	import ContactCard from "./ContactCard.svelte"
</script>


<main class="container text-center mx-auto px-24">
  <h1 class="uppercase text-red-500 font-bold text-5xl my-12 underline">🖼 Image 💪🏾 Contact📇</h1>
	<div class="grid grid-cols-2 lg:grid-cols-3 gap-12">
		<ContactCard name="Jane Doe"/>
		<ContactCard name="Rost"/>
	</div>
</main>