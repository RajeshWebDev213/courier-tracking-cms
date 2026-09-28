

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </svg>
);

const PickupIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const steps = [
  {
    number: "01",
    title: "Create Shipment",
    description: "Enter your package and delivery details.",
    Icon: BoxIcon,
  },
  {
    number: "02",
    title: "Package Pickup",
    description: "Our courier team collects your package.",
    Icon: PickupIcon,
  },
  {
    number: "03",
    title: "In Transit",
    description: "Your package travels safely to its destination.",
    Icon: TruckIcon,
  },
  {
    number: "04",
    title: "Delivered",
    description: "Your package reaches the receiver safely.",
    Icon: CheckIcon,
  },
];


const DESKTOP_PATH =
  "M 125 100 C 200 10, 300 10, 375 100 C 450 190, 550 190, 625 100 C 700 10, 800 10, 875 100";


const MOBILE_PATH =
  "M 50 50 C 105 85, 105 115, 50 150 C -5 185, -5 215, 50 250 C 105 285, 105 315, 50 350";

  
const Node = ({ Icon, className = "", style }) => (
  <div
    style={style}
    className={`absolute z-10 flex items-center justify-center rounded-full bg-black text-white ring-[5px] ring-white shadow-lg ${className}`}
  >
    <div className="h-1/2 w-1/2">
      <Icon />
    </div>
  </div>
);

/* Route line: solid black base + light dashed overlay */
const RouteLine = ({ viewBox, d, className }) => (
  <svg
    viewBox={viewBox}
    preserveAspectRatio="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d={d}
      fill="none"
      stroke="#000"
      strokeWidth="6"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d={d}
      fill="none"
      stroke="#d1d5db"
      strokeWidth="2"
      strokeDasharray="8 10"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

const HowItWorks = () => {
  return (
    <section className="w-full bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Follow your package journey.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            From pickup to delivery, follow every step of your package journey.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP (lg and up): horizontal wave                         */}
        {/* ============================================================ */}
        <div className="mt-16 hidden lg:block">
          {/* Route area — same 4 columns as the text below */}
          <div className="relative h-52 w-full">
            <RouteLine
              viewBox="0 0 1000 200"
              d={DESKTOP_PATH}
              className="absolute inset-0 h-full w-full overflow-visible"
            />

            {steps.map(({ number, Icon }, i) => (
              <Node
                key={number}
                Icon={Icon}
                className="h-16 w-16 -translate-x-1/2 -translate-y-1/2 xl:h-[72px] xl:w-[72px]"
                style={{ left: `${12.5 + i * 25}%`, top: "50%" }}
              />
            ))}
          </div>

          {/* Text — 4 equal columns, centred under each node */}
          <ol className="mt-2 grid grid-cols-4">
            {steps.map(({ number, title, description }) => (
              <li key={number} className="px-4 text-center">
                <p className="text-xs font-semibold text-gray-400">{number}</p>
                <h3 className="mt-2 text-xl font-semibold text-black">{title}</h3>
                <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ============================================================ */}
        {/* MOBILE / TABLET (below lg): vertical wave                    */}
        {/* ============================================================ */}
        <div className="relative mx-auto mt-12 max-w-md lg:hidden">
          {/* 4 equal rows -> route + nodes share the same 25% steps */}
          <div className="relative h-[560px] sm:h-[600px]">
            <RouteLine
              viewBox="0 0 100 400"
              d={MOBILE_PATH}
              className="absolute left-0 top-0 h-full w-20 overflow-visible"
            />

            {steps.map(({ number, Icon }, i) => (
              <Node
                key={number}
                Icon={Icon}
                className="h-14 w-14 -translate-x-1/2 -translate-y-1/2"
                style={{ left: "2.5rem", top: `${12.5 + i * 25}%` }}
              />
            ))}

            <ol className="absolute inset-0 grid grid-rows-4 pl-24">
              {steps.map(({ number, title, description }) => (
                <li key={number} className="flex flex-col justify-center">
                  <p className="text-xs font-semibold text-gray-400">{number}</p>
                  <h3 className="mt-1 text-lg font-semibold text-black">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;