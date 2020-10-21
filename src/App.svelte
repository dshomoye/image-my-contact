<script>
	import "./Tailwindcss.svelte"
	import ContactCard from "./ContactCard.svelte"

	export let name;
</script>


<main class="container text-center mx-auto px-24">
  <h1>Hello {name}!</h1>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
		<ContactCard name="Jane Doe"/>
		<ContactCard name="Rost"/>
	</div>
</main>

<style>

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>