export const formatDate = (date: Date | null) => {
  if (!date) return "未設定";
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return "未設定";
  }
};

//日付入力値をISO8601文字列に変換
export const normalizeDeadlineToISO = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const raw = value.trim();
  if (!raw) return undefined;
  let candidate = raw.replaceAll("/", "-");
  if (candidate.includes(" ") && !candidate.includes("T")) {
    candidate = candidate.replace(" ", "T");
  }
  const d = new Date(candidate);
  if (!Number.isNaN(d.getTime())) return d.toISOString();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?Z$/.test(raw)) {
    return raw;
  }
  return undefined;
};
