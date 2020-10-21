<script>
  import "./Tailwindcss.svelte";
  import ContactCard from "./ContactCard.svelte";
  import vCard from "vcf";
  import cntl from "cntl";
  import UploadIcon from "./UploadIcon.svelte";

  const fReader = new FileReader();
  /**@type {vCard[]} */
  let contacts = [];

  const uploadBtnStyle = cntl`
	flex flex-col items-center p-4 bg-white 
	text-blue rounded-lg shadow-sm tracking-wide 
	uppercase border border-blue cursor-pointer 
	hover:bg-blue-400 hover:text-white hover:shadow-lg
	transform hover:scale-105 transition duration-200
	`;

  fReader.onload = (e) => {
    if (e.target.readyState != 2) return;
    if (e.target.error) {
      alert("Error Reading file.");
      return;
    }
    try {
      contacts = vCard.parse(e.target.result);
    } catch (error) {
      alert("Error reading contact(s).");
    }
  };
</script>

<main class="container text-center mx-auto px-24">
  <h1 class="uppercase text-red-500 font-bold text-5xl mt-12 mb-4 underline">
    🖼 Image 💪🏾 Contact 📇
  </h1>
  {#if contacts && contacts.length > 0}
    <div>
      <p class="text-sm">Start Over?</p>
      <button
        on:click={() => (contacts = [])}
        class="px-3 py-2 rounded shadow-sm m-1 mb-5 transition duration-200 hover:bg-red-400 transform hover:scale-105">Clear
        ❌
      </button>
    </div>
  {:else}
    <div>
      <p class="text-md py-4 lowercase">Click Below to continue</p>
      <div class="flex items-center justify-center bg-grey-lighter mb-12">
        <label class={uploadBtnStyle}>
          <UploadIcon />
          <span class="mt-2 text-sm leading-normal">Select vcard file</span>
          <input
            type="file"
            class="hidden"
            on:change={(e) => fReader.readAsText(e.target.files[0])}
            accept=".vcf" />
        </label>
      </div>
    </div>
  {/if}
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-12">
    {#each contacts as contact, i}
      {#if contact.data.fn.valueOf() && true}
        <ContactCard name={contact.data.fn.valueOf()} />
      {/if}
    {/each}
  </div>
</main>
