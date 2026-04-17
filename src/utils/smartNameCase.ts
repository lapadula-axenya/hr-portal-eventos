const lowercaseWords = ["da", "de", "do", "das", "dos", "e"];

export function smartNameCase(name?: string) {
  if (!name) return "";

  return name
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i === 0 || !lowercaseWords.includes(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word,
    )
    .join(" ");
}
