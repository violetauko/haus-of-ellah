import { ArrowRight } from "lucide-react";

export default function AboutBrand() {
  return (
    <section className="bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center pt-0 lg:pt-8">
            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-light tracking-wide mb-8 leading-tight">
              ABOUT BRAND
            </h1>

            {/* Description Text */}
            <div className="space-y-5 mb-10">
              <p className="text-gray-700 text-sm leading-relaxed max-w-sm font-light">
                We have been collaborating with brands with love and passion for over 5 years. Developing the human studio, we pursue the goal of helping brands to grow beautifully and sustainably.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed max-w-sm font-light">
                We try to reshape uniquely in its kind and meet the high demands of our clients.
              </p>
            </div>

            {/* CTA Link */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-900 text-xs font-medium tracking-wide hover:text-gray-600 transition-colors uppercase"
              >
                GET IN TOUCH
              </a>
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right Images - Horizontal Layout */}
          <div className="flex-1 flex gap-6 items-end justify-end h-full min-h-64">
            {/* First Image - Rotated/Tilted Rectangle */}
            <div 
              className="w-40 h-48 bg-gray-300 rounded-sm overflow-hidden shadow-md flex-shrink-0"
              style={{transform: "rotate(-8deg)"}}
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8e7b9b47?w=400&h=500&fit=crop"
                alt="Brand showcase - plant and furniture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Second Image - Regular rounded corners */}
            <div className="w-44 h-56 bg-gray-300 rounded-sm overflow-hidden shadow-md flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=550&fit=crop"
                alt="Brand showcase - person portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
