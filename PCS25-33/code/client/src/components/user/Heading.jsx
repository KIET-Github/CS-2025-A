import Link from "next/link";
const Heading = () => {
  return (
    <div className=" relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center  pb-20 px-6 sm:px-12 lg:px-16 xl:max-w-[1440px] text-center">
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] font-extrabold tracking-tight uppercase text-blue-700 drop-shadow-lg animate__animated animate__fadeIn">
        Grievance Portal
      </h1>

      <div className="mt-10 w-full max-w-5xl rounded-[35px] bg-white px-8 py-10 sm:px-16 sm:py-14 md:px-20 md:py-16 shadow-xl border border-blue-100 animate__animated animate__fadeIn animate__delay-1s">
        <p className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-relaxed text-gray-700 font-medium tracking-wide">
          Empowering voices, resolving issues — a grievance redressal system
          ensures <span className="text-blue-600 font-semibold">fairness</span>,{" "}
          <span className="text-blue-600 font-semibold">transparency</span>, and{" "}
          <span className="text-blue-600 font-semibold">accountability</span>{" "}
          for a better and just society.
        </p>
      </div>

      <div className="mt-10">
        <Link href="/user/my-grievance">
          <button className="bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-all duration-300">
            Submit Your Grievance
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Heading;
