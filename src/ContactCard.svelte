<script>
  import "a-avataaar";
  import Canvg from "canvg";
  import cntl from "cntl";
  import { blur } from "svelte/transition";
  import { onMount, createEventDispatcher } from "svelte";
  
  import { updateSVgWithStyle } from "./utils";

  const dispatch = createEventDispatcher();

  export let name = "John Smith";

  let svgFile = "";
  let canvasRef;
  let svgString;
  let svgCtx;
  let applyImage = false;
  let shuffledName = name;

  onMount(() => {
    svgCtx = canvasRef.getContext("2d");
  });
  let cardStyle = "";
  let btnStyle = "";

  $: {
    cardStyle = cntl`
      p-12 pb-5 border border-gray-300 rounded
      shadow-sm -mt-8 hover hover:shadow-md 
      transition duration-200 ease-in card
      ${applyImage ? `bg-green-200` : `bg-white`}
  `;
    btnStyle = cntl`
      shadow bg-transparent hover:bg-blue-400
      hover:text-white focus:shadow-outline 
      focus:outline-none px-4 py-2 rounded
      text-sm cursor-pointer no-underline
      border border-gray-700 hover:border-gray-300
      hover:no-underline ${applyImage ? `bg-white` : `bg-transparent`}
      `;
  }

  const handleCheck = () => {
    if (applyImage) {
      Canvg.fromString(svgCtx, svgString).render();
      dispatch("applyphoto", {
        data: canvasRef.toDataURL("image/png").split(";base64,")[1],
      });
    } else {
      dispatch("unapplyphoto");
    }
  };

  const handleSvgChange = async (event) => {
    svgString = updateSVgWithStyle(event);
    const dataurl = "data:image/svg+xml," + encodeURIComponent(svgString);
    const res = await fetch(dataurl);
    const blob = await res.blob();
    svgFile = URL.createObjectURL(blob);
    handleCheck();
  };

  const shufflenameSeed = () => {
    shuffledName = shuffledName
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
  };
</script>

<style>
  .card {
    min-width: 160px;
  }
  .avatar {
    --avataaar-width: 80px;
  }

  @media (min-width: 768px) {
    .card {
      min-width: 120px;
    }
  }
  a {
    -webkit-appearance: none;
  }
</style>

<div
  class="transform hover:scale-105 transition duration-200 ease-in"
  transition:blur>
  <div class="rounded-full">
    <a-avataaar
      identifier={shuffledName}
      on:svgchange={handleSvgChange}
      class="avatar" />
  </div>
  <div class={cardStyle}>
    <p>{name}</p>
    <div>
      <button
        class={cntl`ml-2 rounded border 
        border-blue-600 px-2 py-1 hover:bg-blue-600 
        hover:text-white text-xs`}
        title="Shuffle the generated icon"
        on:click={shufflenameSeed}>shuffle</button>
    </div>
    <hr class="border-gray-500 my-2" />
    <div class="flex mt-5 items-center">
      <div class="m-auto">
        <a
          type="button"
          title="Save SVG file."
          href={svgFile}
          target="_blank"
          download={`${name}-avatar.svg`}>
          <span class={btnStyle}>
            Save SVG
          </span>
        </a>
      </div>
      <div class="m-auto">
        <label
          class="text-gray-600 text-sm hover:text-blue-800 items-center m-auto"
          title="Apply image to contact in vcard.">
          <input
            class="mr-1 leading-tight"
            type="checkbox"
            download={`${name}-avatar.svg`}
            bind:checked={applyImage}
            on:change={handleCheck} />
          <span>{applyImage ? 'Remove' : 'Update'}</span>
        </label>
      </div>
    </div>
  </div>
  <div class="hidden"><canvas bind:this={canvasRef} /></div>
</div>
