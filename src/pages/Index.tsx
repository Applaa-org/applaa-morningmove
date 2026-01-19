import { useState, useEffect } from 'react';
import { Move, Activity, Heart } from 'lucide-react';
import { RoutineStep } from '@/components/RoutineStep';
import { Disclaimer } from '@/components/Disclaimer';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const STORAGE_KEY = 'morningmove_progress';
const DATE_KEY = 'morningmove_date';

const ROUTINE_STEPS = [
  {
    id: 1,
    title: 'Reach & Stretch',
    icon: <Move className="w-10 h-10 text-orange-500" />,
    description: 'Gently reach arms overhead, side to side',
  },
  {
    id: 2,
    title: 'Arm Circles',
    icon: <Activity className="w-10 h-10 text-amber-500" />,
    description: 'Slow circles forward, then back',
  },
  {
    id: 3,
    title: 'Deep Breaths',
    icon: <Heart className="w-10 h-10 text-orange-400" />,
    description: '5 slow, deep breaths in and out',
  },
];

export default function Index() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check for daily reset
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(DATE_KEY);
    
    if (savedDate !== today) {
      // New day - reset progress
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      setCompletedSteps(new Set());
      setCurrentStep(0);
      setShowCelebration(false);
    } else {
      // Load today's progress
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const completed = JSON.parse(saved);
        setCompletedSteps(new Set(completed));
        setCurrentStep(completed.length);
        if (completed.length === ROUTINE_STEPS.length) {
          setShowCelebration(true);
        }
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    const completedArray = Array.from(completedSteps);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedArray));
  }, [completedSteps]);

  const handleCompleteStep = (stepId: number) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    
    if (currentStep < ROUTINE_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowCelebration(true);
    }
  };

  const handleReset = () => {
    setCompletedSteps(new Set());
    setCurrentStep(0);
    setShowCelebration(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-orange-700">
              {completedSteps.size} of {ROUTINE_STEPS.length} steps
            </span>
            {showCelebration && (
              <button
                onClick={handleReset}
                className="text-sm text-orange-600 hover:text-orange-800 underline"
              >
                Start Over
              </button>
            )}
          </div>
          <div className="w-full h-3 bg-orange-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500 ease-out"
              style={{ width: `${(completedSteps.size / ROUTINE_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Celebration Message */}
        {showCelebration && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border-2 border-green-300 shadow-lg animate-pulse">
            <h2 className="text-3xl font-bold text-green-700 mb-2">🌟 Great Start!</h2>
            <p className="text-lg text-green-600">You've completed your morning routine</p>
          </div>
        )}

        {/* Routine Steps */}
        <div className="space-y-6">
          {ROUTINE_STEPS.map((step, index) => (
            <RoutineStep
              key={step.id}
              step={step.id}
              total={ROUTINE_STEPS.length}
              title={step.title}
              icon={step.icon}
              description={step.description}
              isCompleted={completedSteps.has(step.id)}
              isActive={index === currentStep && !showCelebration}
              onComplete={() => handleCompleteStep(step.id)}
            />
          ))}
        </div>

        <Disclaimer />
        <MadeWithApplaa />
      </div>
    </div>
  );
}