interface ItalianFlagBarProps {
  className?: string;
}

const ItalianFlagBar = ({ className = "" }: ItalianFlagBarProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="w-4 h-1 sm:w-5 sm:h-1 bg-green-600 rounded-full" />
      <span className="w-4 h-1 sm:w-5 sm:h-1 bg-white rounded-full" />
      <span className="w-4 h-1 sm:w-5 sm:h-1 bg-red-600 rounded-full" />
    </div>
  );
};

export default ItalianFlagBar;


