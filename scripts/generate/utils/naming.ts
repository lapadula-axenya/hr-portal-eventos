export function toPascalCase(str: string): string {
  return str.replace(/(^\w|-\w)/g, (match) =>
    match.replace("-", "").toUpperCase()
  );
}

export function toCamelCase(str: string): string {
  const camel = str.replace(/-./g, (match) => match[1].toUpperCase());
  return camel.charAt(0).toLowerCase() + camel.slice(1);
}
