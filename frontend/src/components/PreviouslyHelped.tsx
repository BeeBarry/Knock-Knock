// src/components/PreviouslyHelped.tsx
// src/components/PreviouslyHelped.tsx
import type {HelpHistory} from '../types';

interface PreviouslyHelpedProps {
    helpHistory: PreviousHelp[];
}

export default function PreviouslyHelped({ helpHistory }: PreviouslyHelpedProps) {
    if (helpHistory.length === 0) {
        return (
            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Previously helped</h3>
                <p className="text-gray-500">Ingen hjälp-historik ännu</p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Previously helped</h3>
            <div className="space-y-2">
                {helpHistory.map((help, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
            <span className="text-gray-900">
              {help.personName} med {help.helpType}
            </span>
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {help.daysAgo}d ago
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}