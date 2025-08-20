import { useNavigate } from 'react-router-dom';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';

interface EmptyStateProps {
  title: string;
  message: string;
  buttonText: string;
  navigateTo: string;
}

export default function EmptyState({ title, message, buttonText, navigateTo }: EmptyStateProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="text-center py-16 px-4">
      <RocketLaunchIcon className="mx-auto h-12 w-12 text-base-content/30" />
      <h3 className="mt-4 text-xl font-semibold text-base-content/80">{t(title)}</h3>
      <p className="mt-2 text-base-content/60">{t(message)}</p>
      <div className="mt-6">
        <button onClick={() => navigate(navigateTo)} className="btn btn-primary rounded-2xl border-b-4 border-primary-focus
                  hover:shadow-elevated active:translate-y-0.5 transition-all duration-150">
          {t(buttonText)}
        </button>
      </div>
    </div>
  );
}