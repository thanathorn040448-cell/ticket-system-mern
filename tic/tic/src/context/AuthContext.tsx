import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<any>(null)

  // โหลด user จาก localStorage ตอน refresh
  useEffect(() => {

    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

  }, [])

  const login = async (email: string, password: string) => {

    try {

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      // ❌ login ไม่สำเร็จ
      if (!data.user) {
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        return
      }

      // ✅ login สำเร็จ
      setUser(data.user)

      localStorage.setItem("user", JSON.stringify(data.user))

    } catch (error) {

      console.error(error)
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้")

    }

  }

  const logout = () => {

    setUser(null)

    localStorage.removeItem("user")

  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}