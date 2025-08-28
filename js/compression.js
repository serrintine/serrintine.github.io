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

  return await blob.text();
}

function base64UrlEncode(str) {
  // Handle Unicode characters by encoding to UTF-8 first
  const utf8Arr = new TextEncoder().encode(str);
  const base64Encoded = btoa(String.fromCharCode(...utf8Arr));

  // Make URL-safe
  return base64Encoded
    .replace(/\+/g, '-') // Replace '+' with '-'
    .replace(/\//g, '_') // Replace '/' with '_'
    .replace(/=+$/, ''); // Remove trailing '='
}

function base64UrlDecode(str) {
  // Add back URL-safe characters and padding
  let base64Encoded = str
    .replace(/-/g, '+') // Replace '-' with '+'
    .replace(/_/g, '/'); // Replace '_' with '/'

  // Add back padding if necessary
  while (base64Encoded.length % 4) {
    base64Encoded += '=';
  }

  // Decode from Base64 and then convert back to string, handling Unicode
  const decodedBinary = atob(base64Encoded);
  const utf8Arr = new Uint8Array(decodedBinary.split('').map(char => char.charCodeAt(0)));
  return new TextDecoder().decode(utf8Arr);
}