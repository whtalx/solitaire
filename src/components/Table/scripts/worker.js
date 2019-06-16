const code = `
let time = 0;
setInterval('postMessage(++time)', 1000);
`;

const blob = new Blob([code], {type: "application/javascript"});
export default URL.createObjectURL(blob);
