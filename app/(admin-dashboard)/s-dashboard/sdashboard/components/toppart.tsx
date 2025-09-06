import type React from "react";
import { BarChart3, FileText, Calendar, MessageCircle } from "lucide-react";

export default function TopPart() {
  return (
    <div className="p-8">
      <div className="max-w-[1274px] mx-auto">
        <QuickActions />
      </div>
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

<div className="w-full mx-auto">

<div className="self-stretch justify-center text-neutral-800 text-3xl font-semibold font-['Manrope'] leading-10">Welcome Jenny From Binford Ltd.!</div>
<div className="self-stretch justify-center text-neutral-600 text-base font-normal font-['Manrope'] leading-7">Here's what's happening with your logistics operations today.</div>

    <div className="flex flex-col gap-6 mt-10">

      <h2 className="text-lg font-medium text-neutral-800 font-sans">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <ActionCard key={index} {...action} />
          ))}
        </div>
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

<>
    <div className="flex-1 px-6 py-8 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
      <div className="flex items-start gap-6">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <h3 className="text-lg font-medium text-neutral-800 font-sans leading-relaxed">
            {title}
          </h3>
          <p className="text-base text-neutral-600 font-sans leading-snug">
            {description}
          </p>
        </div>
      </div>
    </div>
</>
  );
}
