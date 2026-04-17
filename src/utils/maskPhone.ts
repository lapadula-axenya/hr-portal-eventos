const PHONE_REGEX_10 = /(\d{0,2})(\d{0,4})(\d{0,4})/; // (00) 0000-0000
const PHONE_REGEX_11 = /(\d{0,2})(\d{0,5})(\d{0,4})/; // (00) 00000-0000

export function maskPhone(value?: string): string {
  if (!value) return "";

  const onlyNumbers = value.replace(/\D/g, "");
  const pattern = onlyNumbers.length <= 10 ? PHONE_REGEX_10 : PHONE_REGEX_11;

  return onlyNumbers.replace(pattern, (_, areaCode, part1, part2) => {
    const prefix = areaCode
      ? `(${areaCode}` + (areaCode.length === 2 ? ")" : "")
      : "";
    const suffix = [part1, part2].filter(Boolean).join("-");
    return [prefix, suffix].filter(Boolean).join(" ");
  });
}
