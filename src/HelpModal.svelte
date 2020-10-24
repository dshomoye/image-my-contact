<script>
  import cntl from "cntl";
  import { fly } from "svelte/transition";

  let show = false;
</script>

<style>
  .modal {
    top: 20%;
    left: 50%;
    width: 26rem;
    margin-left: -12rem;
  }
  .ribbon {
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }
</style>

<div class="fixed top-0 right-0 bg-gray-500 text-white pb-6 pl-6 ribbon">
  <button
    class="p-2 text-2xl focus:outline-none"
    on:click={() => (show = true)}>?</button>
</div>

{#if show}
  <div
    transition:fly={{ y: -200, duration: 300 }}
    class={cntl`
  text-center p-12 m-auto fixed 
  modal bg-white border border-gray-600 
  shadow-lg rounded-lg`}>
    <article>
      <p>
        You can export a vcard of your Google contacts as vCards by following
        the instructions
        <a
          class="underline"
          href="https://support.google.com/contacts/answer/7199294?co=GENIE.Platform%3DDesktop&hl=en">here</a>
        or search for instructions for any other service. To not risk overriding
        any photos, only contacts without any photos can be updated. Shuffle and
        select contacts you wish to generate an image for then download the
        generated vCard file. The downloaded vCard file can be imported back and
        duplicate contacts can be resolved or deleted afterwards.
      </p>
      <button
        class={cntl`
      m-auto px-4 py-2 mt-8 border 
      rounded-sm border-blue-400 
      hover:bg-blue-400 transition 
      duration-300 transform hover:scale-105
      hover:text-white focus:outline-none`}
        on:click={() => (show = false)}>
        Okay</button>
    </article>
  </div>
{/if}
