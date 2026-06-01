import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

interface ScoreDonutProps {
  score: number;
}

export default function ScoreDonut({ score }: ScoreDonutProps) {
  // Select color matching target ranges strictly according to design parameters
  let mainColor = "#34A853"; // Google Green

  if (score < 50) {
    mainColor = "#EA4335"; // Google Red
  } else if (score < 80) {
    mainColor = "#FBBC04"; // Google Yellow
  }

  const chartData = [
    {
      name: "Alignment",
      value: score,
      fill: mainColor
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      
      {/* Container circle */}
      <div className="relative w-48 h-48 flex items-center justify-center bg-[#F8F9FA] rounded-full border-2 border-[#E8EAED]">
        
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            barSize={12}
            data={chartData}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: "rgba(0, 0, 0, 0.03)" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Display Score center */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-5xl font-black font-mono tracking-tighter text-[#202124]">
            {score}
          </span>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#5F6368] uppercase -mt-1">
            % Matches
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-[#202124] font-bold uppercase tracking-wider font-sans">
        <span className="text-[#FBBC04] text-lg">✦</span> Overall Fit Score
      </div>

    </div>
  );
}
