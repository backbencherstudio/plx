import type React from "react";
import { BarChart3, FileText, Calendar, MessageCircle } from "lucide-react";

export default function TopPart() {
  return (
    <div className="w-full">
      <QuickActions />
    </div>
  );
}

function QuickActions() {
  const actions = [
    {
      title: "Live Schematic",
      description:
        "View real-time operations across Pipeline, Trucking, Rail, and Marine logistics",
      icon: BarChart3,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Request Nomination",
      description:
        "Submit a new nomination request with commodity details and transport preferences",
      icon: FileText,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Book A Meeting",
      description:
        "Schedule a consultation with our logistics team for your specific needs",
      icon: Calendar,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Direct Message",
      description:
        "Send a message to your dedicated admin team for immediate assistance",
      icon: MessageCircle,
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold font-['Manrope'] text-neutral-800 mb-2">
          Welcome Jenny From Binford Ltd.!
        </h1>
        <p className="text-base font-normal font-['Manrope'] text-neutral-600">
          Here's what's happening with your logistics operations today.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-medium text-neutral-800 font-sans">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <ActionCard key={index} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  icon: Icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}) {
  return (
    <div className="w-full px-4 sm:px-6 py-6 sm:py-8 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
      <div className="flex items-start gap-4 sm:gap-6">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-medium text-neutral-800 font-sans leading-relaxed">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 font-sans leading-snug">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
