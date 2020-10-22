<script>
  import "./Tailwindcss.svelte";
  import ContactCard from "./ContactCard.svelte";
  import vCard from "vcf";
  import cntl from "cntl";
  import UploadIcon from "./UploadIcon.svelte";
  import DownloadIcon from "./DownloadIcon.svelte";
  import { fly } from "svelte/transition";

  const fReader = new FileReader();
  /**@type {vCard[]} */
  let contacts = [];

  /**
   * @typedef UpdatePayload
   * @property {Number} index
   * @property {string} blob
   */

  /**
   * @type {Object<string,UpdatePayload>}
   */
  let contactsToUpdate = {};

  let updateFileUrl="";

  const uploadBtnStyle = cntl`
	flex flex-col items-center p-4 bg-white 
	text-blue rounded-lg shadow-sm tracking-wide 
	uppercase border border-blue cursor-pointer 
	hover:bg-blue-400 hover:text-white hover:shadow-lg
	transform hover:scale-105 transition duration-200
  `;

  const addToUpdate = (index, blob) => {
    contactsToUpdate[index] = {
      index,
      blob,
    };
  };

  const removeFromUpdate = (index) => {
    contactsToUpdate[index] = null;
    delete contactsToUpdate[index];
  };

  $: {
    try {
      Object.keys(contactsToUpdate).map((k) => {
        const cIndex = parseInt(k)
        const c = contacts[cIndex];
        c.set("photo", contactsToUpdate[k].blob, { encoding: "b", type: "png" });
        contacts[cIndex] = c
      });
      if(contacts.length > 1) {
        console.log(contacts.map(c => c.toString()).join("\r\n"))
        const updatedContacts = contacts.map(c => c.toString()).join("\r\n")
        updateFileUrl = "data:text/plain;charset=utf-8," + encodeURIComponent(updatedContacts)
      }
    } catch(err) {
      console.error(err)
    }
  }

  fReader.onload = (e) => {
    if (e.target.readyState != 2) return;
    try {
      contacts = vCard.parse(e.target.result).filter((vc) => {
        return !(vc.data.photo && vc.data.photo.valueOf());
      });
    } catch (error) {
      alert("Error reading contact(s) from file.");
    }
  };
</script>

<main class="container text-center mx-auto lg:p-24 p-5 min-h-screen">
  <h1 class="uppercase text-red-500 font-bold text-5xl mb-4 underline">
    🖼 Image 💪🏾 Contact 📇
  </h1>
  {#if contacts && contacts.length > 0}
    <div>
      <p class="text-sm">Start Over?</p>
      <button
        on:click={() => (contacts = [])}
        class={cntl`px-3 py-2 rounded 
          shadow-sm m-1 mb-5 transition 
          duration-200 hover:bg-red-400 
          transform hover:scale-105 border-red-900 border`}>
        Clear ❌
      </button>
    </div>
  {:else}
    <div class="mb-12">
      <p class="text-md py-4">Click Below to continue</p>
      <div class="flex items-center justify-center bg-grey-lighter">
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
      <p class="block text-sm py-4">
        Only contacts without photos will be loaded.
      </p>
    </div>
  {/if}
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 px-8">
    {#each contacts as contact, i}
      {#if contact.data.fn.valueOf() && true}
        <ContactCard
          name={contact.data.fn.valueOf()}
          on:applyphoto={(e) => addToUpdate(`${i}`, e.detail.data)}
          on:unapplyphoto={() => removeFromUpdate(`${i}`)} />
      {/if}
    {/each}
  </div>
  {#if contacts && contacts.length > 0}
    <a
      transition:fly={{ y: 100, duration: 1000 }}
      class={cntl`rounded-full bg-blue-500 p-5 
        text-white shadow-xl transform transition 
        hover:scale-110 hover:shadow-2xl fixed 
        fab focus:outline-none`}
      href={updateFileUrl}
      download="newcontacts.vcf">
      <DownloadIcon />
      </a>
  {/if}
</main>

<style>
  .fab {
    right: 2rem;
    bottom: 2rem;
  }
  @media (min-width: 768px) {
    .fab {
      right: 8rem;
    }
  }
</style>
