
export const theme = [
  { key: "DARK", value: "Escuro" },
  { key: "LIGHT", value: "Claro" }
]

export const language = [
  { key: "PORTUGUESE", value: "Português" },
  { key: "ENGLISH", value: "Inglês" },
  { key: "SPANISH", value: "Espanhol" }
]

export const languages: any = {
  PORTUGUESE: "pt-BR",
  ENGLISH: "en-US",
  SPANISH: "es-ES",
}


export function generateUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function base64ToArrayBuffer(base64: any): ArrayBuffer {
  const binaryString = atob(base64.split(',')[1]);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
