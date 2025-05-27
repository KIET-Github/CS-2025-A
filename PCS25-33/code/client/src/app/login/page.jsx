import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-100 text-gray-700 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:px-12 sm:pt-12">

                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="flex flex-col justify-center items-center ">
                            <h2 className="text-[1.6rem] font-bold">Centralised Grievance Portal</h2>
                            <h3 className="text-[1.6rem] font-bold">
                                Log In
                            </h3>
                        </div>
                        <LoginForm />
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
