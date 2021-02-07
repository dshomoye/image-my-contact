<script>
  import cntl from "cntl";
  import { fly } from "svelte/transition";

  let show = false;
</script>

<style>
  .modal {
    top: 20%;
    left: 50%;
    width: 28rem;
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
        You can export a vCard of your Google contacts by following
        the instructions
        <a
          class="underline"
          href="https://support.google.com/contacts/answer/7199294?co=GENIE.Platform%3DDesktop&hl=en">here</a>
        or search for instructions for any other service. 
        <br/>To not risk overriding
        existing photos, only contacts without a photo are shown/modified.
        <br/> Shuffle and
        select (by checking the "update" checkbox) contacts you wish to generate an image for, then download the
        generated vCard file. 
        <br/> Only contacts marked as "update" (green background) will have photos attached in the vCard. 
        The downloaded vCard file can be imported back into Google contacts or anywhere other contact service.
        <br/> You can also download individual generated svg.
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
