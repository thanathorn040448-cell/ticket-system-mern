import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(email, password);

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] p-10 rounded-3xl w-96 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          เข้าสู่ระบบ
        </h1>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 py-3 bg-white/5 rounded-xl outline-none"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />

          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white/5 rounded-xl outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 rounded-xl"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-400">
          ยังไม่มีบัญชี?
          <Link to="/signup" className="text-blue-400 ml-2">
            สมัครสมาชิก
          </Link>
        </p>
      </form>

    </div>
  );
};

export const Signup: React.FC = () => {

  const navigate = useNavigate();

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        email,
        password
      })
    })

    const data = await res.json()

    console.log(data)

    navigate("/login")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] p-10 rounded-3xl w-96 space-y-6"
      >

        <h1 className="text-2xl font-bold text-center">
          สมัครสมาชิก
        </h1>

        <input
          type="text"
          placeholder="ชื่อ"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 rounded-xl"
        >
          สมัครสมาชิก
        </button>

        <p className="text-sm text-center text-gray-400">
          มีบัญชีอยู่แล้ว?
          <Link to="/login" className="text-blue-400 ml-2">
            เข้าสู่ระบบ
          </Link>
        </p>

      </form>

    </div>
  );
};