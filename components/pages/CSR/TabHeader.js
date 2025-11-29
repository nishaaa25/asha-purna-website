export default function TabHeader({ activeTab, setActiveTab, tabs }) {
  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="flex lg:gap-6 md:gap-4 gap-2 relative mb-10">
      {tabs.map((tab, index) => (
        <button
          type="button"
          onClick={(e) => handleTabClick(e, tab)}
          key={index}
          className={`${
            activeTab === tab
              ? "border-b-[0.8px] bg-black-400 text-white"
              : "border-b-[0.4px] lg:border-b-1  text-black-400"
          } font-medium lg:font-bold text-base md:text-2xl lg:text-lg py-[6px] md:py-[10px] lg:py-2 flex-1 w-full rounded-t-sm capitalize transition-all duration-300 cursor-pointer`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
