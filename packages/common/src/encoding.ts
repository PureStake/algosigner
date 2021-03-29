export function base64ToByteArray(blob: string): Uint8Array {
  return new Uint8Array(
    atob(blob)
      .split('')
      .map((x) => x.charCodeAt(0))
  );
}

export function byteArrayToBase64(array: any): string {
  return btoa(String.fromCharCode.apply(null, array));
}