export const calculateTimeDifference = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  // 期限と現在時刻の差分（ミリ秒）を計算
  const difference = due.getTime() - now.getTime();

  // ミリ秒を日、時間、分に変換
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  // テキストとして表示する
  let text = "";
  if (days > 0) {
    text += days + "日 ";
  }
  if (hours > 0) {
    text += hours + "時間 ";
  }
  text += minutes + "分";

  return text;
};
