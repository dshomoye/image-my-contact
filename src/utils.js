export function updateSVgWithStyle (event) {
  let svg = event.detail.data
  const elementStyle = getComputedStyle(event.target);
  svgVariables.forEach((svgvar) => {
    const val = elementStyle.getPropertyValue(svgvar);
    svg = svg.replace(`var(${svgvar})`, val);
  });
  svg = svg.replace(
    "var(--avataaar-internal-circle-color)",
    "#6fb8e0"
  );
  return svg
}

const svgVariables = [
  "--avataaar-hair-color",
  "--avataaar-skin-color",
  "--avataaar-facial-hair-color",
  "--avataaar-hat-color",
];