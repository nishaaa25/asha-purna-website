import Link from "next/link";

export default function Button({ text, onClick, link }) {
  const buttonClass =
    "border border-[#cccccc] bg-black-400 text-white font-medium text-xs md:text-sm lg:text-base py-[10px] lg:py-[15px] min-w-38 lg:min-w-40 px-5 lg:px-6 rounded-md mt-2 capitalize cursor-pointer text-center";

  if (link) {
    return (
      <Link href={link} className={buttonClass}>
        {text}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
}
