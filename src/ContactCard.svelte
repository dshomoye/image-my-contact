<script>
  import "a-avataaar";
  import { blur } from "svelte/transition";
  import cntl from "cntl";
  import { onMount } from "svelte";
  import { updateSVgWithStyle } from "./utils";
  import Canvg from "canvg";
  import DownloadIcon from "./DownloadIcon.svelte";

  export const name = "John Smith";
  export const contactIndex = null;
  let svgFile = "";
  let canvasRef;
  let svgString;
  let svgCtx;
  let pngBlob;
  let applyImage = false;

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
      hover:no-underline ${applyImage ? `bg-white` : `bg-transparent`}
      `;
  }

  const setImageBlob = (event) => {
    applyImage = event.target.checked;
    if (applyImage) {
      Canvg.fromString(svgCtx, svgString).render();
      pngBlob = canvasRef.toDataURL("image/png");
      console.log("set image blob");
    }
  };

  const handleSvgChange = async (event) => {
    svgString = updateSVgWithStyle(event);
    const dataurl = "data:image/svg+xml," + encodeURIComponent(svgString);
    const res = await fetch(dataurl);
    const blob = await res.blob();
    svgFile = URL.createObjectURL(blob);
  };
</script>

<style>
  .card {
    min-width: 160px;
  }
</style>

<div
  class="transform hover:scale-105 transition duration-200 ease-in"
  transition:blur>
  <div class="rounded-full">
    <a-avataaar identifier={name} on:svgchange={handleSvgChange} />
  </div>
  <div class={cardStyle}>
    <p>{name}</p>
    <hr class="border-gray-500" />
    <div class="flex mt-5 items-center">
      <div class="m-auto">
        <a
          class={btnStyle}
          type="button"
          title="Save image as SVG file."
          href={svgFile}
          target="_blank"
          download={`${name}-avatar.svg`}>
          <DownloadIcon />
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
            on:change={setImageBlob} />
          <span>{applyImage ? 'Remove' : 'Update'}</span>
        </label>
      </div>
    </div>
  </div>
  <div class="hidden"><canvas bind:this={canvasRef} /></div>
</div>
