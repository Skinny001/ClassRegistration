"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import abi from "./abi.json"

declare global {
  interface Window {
    ethereum: any
  }
}

const contractAddress = "0xb33A94Bf2c58AA7cAdA03c219860ecDf7DaeD299"

export default function App() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  // const [ setSigner] = useState<ethers.Signer | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [getRollNumber, setGetRollNumber] = useState("")
  const [removeRollNumber, setRemoveRollNumber] = useState("")
  const [studentInfo, setStudentInfo] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const _provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(_provider)
    } else {
      setError("Please install MetaMask to use this application.")
    }
  }, [])

  const connectWallet = async () => {
    if (!provider) {
      setError("Provider is not set. Make sure MetaMask is installed.")
      return
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const _signer = await provider.getSigner()
      // setSigner(_signer)
      setAccount(accounts[0])

      const _contract = new ethers.Contract(contractAddress, abi.abi, _signer)
      setContract(_contract)

      setIsConnected(true)
      setError(null)
      alert("Wallet connected successfully!")
    } catch (err) {
      setError("Failed to connect wallet.")
      console.error("Error connecting wallet:", err)
    }
  }

  const registerStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract || !account) return

    try {
      const tx = await contract.registerStudent(name, rollNumber)
      await tx.wait()
      alert("Student registered successfully!")
    } catch (error: any) {
      alert("Error: " + error.message)
    }
  }

  const getStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract) return

    try {
      const student = await contract.getStudentById(getRollNumber)
      const studentRollDate = Number(student.rollDate) * 1000
      setStudentInfo(
        `Name: ${student.name}, Roll Number: ${student.rollNumber}, Roll Date: ${new Date(
          studentRollDate,
        ).toLocaleDateString()}`,
      )
    } catch (error: any) {
      alert("Error: " + error.message)
    }
  }

  const removeStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract || !account) return

    try {
      const tx = await contract.removeStudent(removeRollNumber)
      await tx.wait()
      alert("Student removed successfully!")
    } catch (error: any) {
      alert("Error: " + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">School Manager</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={connectWallet}
        className={`p-3 rounded-md mb-6 ${isConnected ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        disabled={isConnected}
      >
        {isConnected ? `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}` : "Connect Wallet"}
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mb-6">
        <h2 className="text-xl font-semibold mb-4">Register Student</h2>
        <form onSubmit={registerStudent} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Roll Number"
            className="border p-2 rounded"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
          <button
            className={`bg-blue-500 text-white p-2 rounded ${
              isConnected ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isConnected}
          >
            Register
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mb-6">
        <h2 className="text-xl font-semibold mb-4">Get Student</h2>
        <form onSubmit={getStudent} className="flex flex-col space-y-3">
          <input
            type="number"
            placeholder="Roll Number"
            className="border p-2 rounded"
            value={getRollNumber}
            onChange={(e) => setGetRollNumber(e.target.value)}
            required
          />
          <button
            className={`bg-green-500 text-white p-2 rounded ${
              isConnected ? "hover:bg-green-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isConnected}
          >
            Get Student
          </button>
        </form>
        {studentInfo && <p className="mt-4 text-gray-700">{studentInfo}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Remove Student</h2>
        <form onSubmit={removeStudent} className="flex flex-col space-y-3">
          <input
            type="number"
            placeholder="Roll Number"
            className="border p-2 rounded"
            value={removeRollNumber}
            onChange={(e) => setRemoveRollNumber(e.target.value)}
            required
          />
          <button
            className={`bg-red-500 text-white p-2 rounded ${
              isConnected ? "hover:bg-red-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isConnected}
          >
            Remove Student
          </button>
        </form>
      </div>
    </div>
  )
}

