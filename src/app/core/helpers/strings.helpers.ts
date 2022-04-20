export function camelize(str: string, includeFirst = false): string {
  const regx = `${includeFirst ? '(?:^[a-z])|' : ''}(?:W+(.))`;
  const replacer = (match: string) => match.trim().toUpperCase();
  return str.replace(RegExp(regx, 'igm'), replacer);
}

export function fixnumber(n: number | string = 0): string {
  let nd = `${String(n).match(/\.\d+/gim) || ''}`.replace('.', '').length;
  if (nd > 2) nd = 2;
  return Number(n)?.toFixed(nd);
}

export async function copyText(text: string) {
  await navigator?.clipboard?.writeText(text);
}

export function isEmail(str: string): boolean {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(str).toLocaleLowerCase());
}