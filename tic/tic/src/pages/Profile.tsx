import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Profile = () => {

  const { user, logout } = useAuth();

  if(!user){
    return <div className="p-10 text-white">Not logged in</div>
  }

  return (

    <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center">

      <div className="bg-[#121212] p-10 rounded-3xl w-96 space-y-6">

        <h1 className="text-2xl font-bold text-center">
          โปรไฟล์
        </h1>

        <div>
          <p className="text-gray-400">ชื่อ</p>
          <p>{user.username}</p>
        </div>

        <div>
          <p className="text-gray-400">Email</p>
          <p>{user.email}</p>
        </div>

        <Link
          to="/tickets"
          className="block text-center w-full py-3 bg-blue-600 rounded-xl"
        >
          ประวัติการซื้อตั๋ว
        </Link>

        <button
          onClick={logout}
          className="w-full py-3 bg-red-500 rounded-xl"
        >
          Logout
        </button>

      </div>

    </div>

  )

}