import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-col space-y-4 w-40">
        <div className="rounded-md hover:shadow-md transition border-2 h-20">
          <Link
            to={"/login"}
            className=" h-full flex items-center justify-center"
          >
            ログイン
          </Link>
        </div>
        <div className="rounded-md hover:shadow-md transition border-2 h-20">
          <Link
            to={"/register"}
            className=" h-full flex items-center justify-center"
          >
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
};
