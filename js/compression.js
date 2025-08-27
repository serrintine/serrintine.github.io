function b64decode(str) {
  const binary_string = window.atob(str);
  const len = binary_string.length;
  const bytes = new Uint8Array(new ArrayBuffer(len));
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

async function compress(str) {
  const stream = new Blob([str], {
    type: 'application/json',
  }).stream();

  const compressedReadableStream = stream.pipeThrough(new CompressionStream("gzip"));
  const compressedResponse = await new Response(compressedReadableStream);
  const blob = await compressedResponse.blob();
  const buffer = await blob.arrayBuffer();

  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

async function decompress(str) {
  const stream = new Blob([b64decode(str)], {
    type: "application/json",
  }).stream();

  const compressedReadableStream = stream.pipeThrough(new DecompressionStream("gzip"));
  const response = await new Response(compressedReadableStream);
  const blob = await response.blob();

  return JSON.parse(await blob.text());
}