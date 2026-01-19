import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoutineStepProps {
  step: number;
  total: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  onComplete: () => void;
}

export function RoutineStep({ 
  step, 
  total, 
  title, 
  icon, 
  description, 
  isCompleted, 
  isActive,
  onComplete 
}: RoutineStepProps) {
  return (
    <div 
      className={cn(
        "relative p-8 rounded-2xl transition-all duration-500",
        isActive 
          ? "bg-gradient-to-br from-orange-100 to-amber-100 shadow-xl scale-105 border-2 border-orange-300" 
          : isCompleted 
            ? "bg-green-50 border-2 border-green-200" 
            : "bg-white/60 border-2 border-orange-100"
      )}
    >
      {/* Step indicator */}
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg
        bg-gradient-to-br from-orange-400 to-amber-500">
        {step}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
          isActive ? "bg-white shadow-lg" : "bg-orange-50"
        )}>
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        {isActive && (
          <button
            onClick={onComplete}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Complete
          </button>
        )}

        {isCompleted && (
          <div className="flex items-center space-x-2 text-green-600 font-semibold">
            <CheckCircle2 className="w-6 h-6" />
            <span>Done!</span>
          </div>
        )}
      </div>
    </div>
  );
}