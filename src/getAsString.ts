export function getAsString(value: string | string[]): string {
  // Checking if the passed value is an array
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
