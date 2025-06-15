import { Home, Users, User, MessageSquare, ArrowLeft, HandHeart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const Header = ({ showBackButton = false, title }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Get the appropriate icon based on the current route
  const getPageIcon = () => {
    // For user profile pages (dynamic routes)
    if (location.pathname.startsWith('/profile/')) {
      return <User className="w-6 h-6 text-white" />;
    }

    // For main pages
    switch (location.pathname) {
      case '/':
        return <Home className="w-6 h-6 text-white" />;
      case '/community':
        return <HandHeart className="w-6 h-6 text-white" />;
      case '/profile':
        return <User className="w-6 h-6 text-white" />;
      case '/messages':
        return <MessageSquare className="w-6 h-6 text-white" />;
      default:
        return <Home className="w-6 h-6 text-white" />;
    }
  };

  return (
    <header className="bg-card shadow-lg shadow-orange-100/30 dark:shadow-orange-950/40 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-muted/40 dark:hover:bg-muted/60 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <div className="bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] p-3 rounded-2xl shadow-lg">
              {getPageIcon()}
            </div>
            <div>
              {title ? (
                <h1 className="text-2xl font-bold text-foreground">
                  {title}
                </h1>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Knock Knock
                  </h1>
                </div>
              )}
              {!title && (
                <p className="text-sm text-muted-foreground">Your neighborhood expertise network</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate('/')}
                className={`transition-colors font-medium ${
                  isActive('/') 
                    ? 'text-[hsl(var(--coral))]' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/community')}
                className={`transition-colors ${
                  isActive('/community') 
                    ? 'text-[hsl(var(--coral))] font-medium' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Community
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className={`transition-colors ${
                  isActive('/profile') 
                    ? 'text-[hsl(var(--coral))] font-medium' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Profile
              </button>
              <button 
                onClick={() => navigate('/messages')}
                className={`transition-colors ${
                  isActive('/messages') 
                    ? 'text-[hsl(var(--coral))] font-medium' 
                    : 'text-muted-foreground hover:text-[hsl(var(--coral))]'
                }`}
              >
                Messages
              </button>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
