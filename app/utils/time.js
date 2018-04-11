export default function getCurrentWeek() {
  const termStart = new Date('2018/2/26');
  const now = new Date();
  const pastWeek = (now - termStart) / (1000 * 60 * 60 * 24 * 7);
  return Math.ceil(pastWeek);
}
