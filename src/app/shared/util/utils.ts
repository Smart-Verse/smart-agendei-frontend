import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertDate(date: string) {
  return dayjs(date,"'YYYY-MM-DD'").toDate();
}

export function convertDateMinute(date: any) {
  return dayjs(date).tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss');
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
