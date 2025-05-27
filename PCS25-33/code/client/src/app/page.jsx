import SignupForm from "@/components/Auth/SignupForm";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-100 text-gray-700 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="text-center">
            <h2 className="text-[1.6rem] font-bold mb-4">Centralised Grievance Portal</h2>
            
          </div>
          <SignupForm />
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div >
    </div >
  );
}
