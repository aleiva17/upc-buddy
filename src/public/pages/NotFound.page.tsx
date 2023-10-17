import {BaseLayout} from "../../shared/components/BaseLayout.tsx";
import {Link, useLocation} from "react-router-dom";

export const NotFoundPage = () => {
  const location = useLocation();

  return (
    <BaseLayout>
      <div className="flex justify-center p-8">
        <div className="flex flex-col items-center w-[370px] md:w-[720px] bg-white shadow-2xl rounded-xl p-4 md:py-4 md:px-8 gap-4">
          <img
            src="/404.png"
            className="h-auto w-56 md:w-64 lg:w-72"
            alt="Girl holding a sign with a 404 error message"
          />
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-3">
              Oops!
            </p>
            <p className="mt-2 mb-1"> You didn't break the internet, but we can't find what you are looking for.</p>
            <p className="text-sm">{ location.pathname } doesn't exist</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 w-fit text-white px-4 py-2 duration-300"
          >
            <span className="pi pi-home"/>
            Go back to home
          </Link>
        </div>
      </div>
    </BaseLayout>
  )
}