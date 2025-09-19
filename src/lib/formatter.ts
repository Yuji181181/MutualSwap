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
