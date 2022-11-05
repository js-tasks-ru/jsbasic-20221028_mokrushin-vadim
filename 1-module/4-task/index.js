function checkSpam(str) {
  const lowerStr = str.toLowerCase();
  return (
    lowerStr.includes("1xBet".toLowerCase()) ||
    lowerStr.includes("XXX".toLowerCase())
  );
}
