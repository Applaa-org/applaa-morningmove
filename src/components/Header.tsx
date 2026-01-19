import { Sun } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-50 to-amber-50 backdrop-blur-xl shadow-sm border-b border-orange-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Sun className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            MorningMove
          </h1>
        </div>
      </div>
    </header>
  );
}