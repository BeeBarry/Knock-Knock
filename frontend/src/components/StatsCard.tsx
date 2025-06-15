
interface StatsCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'coral' | 'sage' | 'sunny';
}

const StatsCard = ({ icon, value, label, color }: StatsCardProps) => {
  const colorClasses = {
    coral: 'bg-gradient-to-br from-[hsl(var(--coral))]/10 to-[hsl(var(--coral-secondary))]/10 border-[hsl(var(--coral))]/20',
    sage: 'bg-gradient-to-br from-[hsl(var(--sage))]/10 to-[hsl(var(--sage-light))]/10 border-[hsl(var(--sage))]/20',
    sunny: 'bg-gradient-to-br from-[hsl(var(--sunny))]/10 to-[hsl(var(--sunny))]/20 border-[hsl(var(--sunny))]/30'
  };

  const iconColors = {
    coral: 'text-[hsl(var(--coral))]',
    sage: 'text-[hsl(var(--sage))]',
    sunny: 'text-[hsl(var(--sunny))]'
  };

  return (
    <div className={`${colorClasses[color]} p-6 rounded-2xl border-2 transform hover:scale-105 transition-all duration-200`}>
      <div className={`${iconColors[color]} mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export default StatsCard;
