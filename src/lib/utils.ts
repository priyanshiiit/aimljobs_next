export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays > 30) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  return `${diffInDays}d`;
} 