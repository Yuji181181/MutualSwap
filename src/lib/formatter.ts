export const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "未設定";
  try {
    // 文字列の場合はDateオブジェクトに変換
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // 無効な日付の場合
    if (Number.isNaN(dateObj.getTime())) return "未設定";

    // UTC時刻を使用してフォーマット（タイムゾーンの問題を回避）
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  } catch {
    return "未設定";
  }
};

//DateTimeをHTML input要素用の値に変換
export const toLocalInputValue = (
  date: Date | null | undefined,
): string | undefined => {
  if (!date) return undefined;
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

//日付入力値をISO8601文字列に正規化
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

// ISO形式の日付文字列かどうかを判定
export const isIsoDateString = (value: string): boolean => {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
};

// サーバーレスポンスの日付文字列をDateオブジェクトに復元
export const reviveDates = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map((i) => reviveDates(i));
  if (input && typeof input === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      result[k] = reviveDates(v);
    }
    return result;
  }
  if (typeof input === "string" && isIsoDateString(input)) {
    const time = Date.parse(input);
    if (!Number.isNaN(time)) return new Date(time);
  }
  return input;
};
