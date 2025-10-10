"use client"
import React, { useMemo, useState, useEffect } from "react"
import axiosClient from "@/lib/axiosclient"
import axios from "axios"

type User = {
  id: string
  name: string
  company: string
  jobTitle: string
  email: string
  phone: string
  status: "active" | "pending"
}

// Simple user type used by UI

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all")
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  // Debug states
  const [debugData, setDebugData] = useState<any>(null)
  const [debugSteps, setDebugSteps] = useState<string[]>([])
  const [showDebugBox, setShowDebugBox] = useState(false)

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setDebugSteps(prev => [...prev, "1. Fetching users..."])
      const params: Record<string, any> = { page, limit }
      if (filter !== "all") params.active = filter === "active"
      setDebugSteps(prev => [...prev, `2. Query params: ${JSON.stringify(params)}`])
      const res = await axiosClient.get(`/api/v1/users/all`,
        {
            headers: {
                "Authorization": localStorage.getItem("token"),
            },
        },
       
        
         
        

      )
      setDebugSteps(prev => [...prev, `3. API status: ${res.status}`])
      setDebugData(res.data)
      const apiUsers = (res.data?.data || []).map((u: any) => ({
        id: u.id,
        name: u.fullName || `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
        company: u.companyName ?? "",
        jobTitle: u.jobTitle ?? "",
        email: u.email ?? "",
        phone: u.phone ?? "",
        status: u.active ? "active" : "pending",
      })) as User[]
      setUsers(apiUsers)
      setTotalItems(res.data?.pagination?.totalItems ?? apiUsers.length)
      setDebugSteps(prev => [...prev, `4. Users loaded: ${apiUsers.length}`])
    } catch (e: any) {
      const msg = e?.response?.data?.message || "Failed to load users"
      setError(msg)
      setDebugSteps(prev => [...prev, `Error: ${msg}`])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page])

  const filteredUsers = useMemo(() => {
    let list = users
    if (filter !== "all") list = list.filter(u => u.status === filter)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.company.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      )
    }
    return list
  }, [users, filter, query])

  const handleActivate = async (id: string) => {
    try {
      setDebugSteps(prev => [...prev, `5. Activating user: ${id}`])
      const res = await axiosClient.post(`/api/v1/users/toactive/${id}`)
      setDebugSteps(prev => [...prev, `6. Activate status: ${res.status}`])
      setUsers(prev => prev.map(u => (u.id === id ? { ...u, status: "active" } : u)))
    } catch (e: any) {
      const msg = e?.response?.data?.message || "Failed to activate user"
      setError(msg)
      setDebugSteps(prev => [...prev, `Error activating: ${msg}`])
    }
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="w-full bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200">
          <h2 className="text-neutral-900 text-base whitespace-nowrap font-semibold font-['Manrope']">All User</h2>

          {/* Filters */}
          <div className="flex gap-2">
            {(["all", "active", "pending"] as const).map(key => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-[10px] text-sm font-medium font-['Roboto'] border ${
                  filter === key ? "bg-stone-100 border-zinc-300 shadow-sm" : "bg-white border-zinc-200 hover:bg-gray-50"
                }`}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="w-full sm:w-64">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search name, company, email..."
              className="w-full h-9 px-3 rounded-[10px] border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 backdrop-blur-sm border-b border-zinc-200">
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Name</th>
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Company</th>
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Job Title</th>
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Email</th>
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Contact</th>
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Status</th>
                  <th className="px-4 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope']">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-600 text-sm font-medium font-['Manrope']">No users found</td>
                  </tr>
                ) : (
                  filteredUsers.map((u, idx) => (
                    <tr key={u.id} className={`border-b border-slate-200 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3 text-neutral-700 text-sm font-medium font-['Manrope']">{u.name}</td>
                      <td className="px-4 py-3 text-neutral-700 text-sm font-medium font-['Manrope']">{u.company}</td>
                      <td className="px-4 py-3 text-neutral-700 text-sm font-medium font-['Manrope']">{u.jobTitle}</td>
                      <td className="px-4 py-3 text-neutral-700 text-sm font-medium font-['Manrope']">{u.email}</td>
                      <td className="px-4 py-3 text-neutral-700 text-sm font-medium font-['Manrope']">{u.phone}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium font-['Roboto'] ${
                          u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {u.status[0].toUpperCase() + u.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleActivate(u.id)}
                          className={`px-3 py-1 rounded-[10px] text-white text-xs font-medium shadow-sm ${
                            u.status === 'active' ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'
                          }`}
                        >
                          {u.status === 'active' ? 'Active' : 'Make Active'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
       </div>
        </div>
        {/* Simple pagination info */}
        <div className="px-4 sm:px-6 py-3 border-t border-zinc-200 flex items-center justify-between text-xs text-neutral-600">
          <div>
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems} users
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1.5 rounded-[8px] border ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => (p * limit < totalItems ? p + 1 : p))}
              disabled={page * limit >= totalItems}
              className={`px-3 py-1.5 rounded-[8px] border ${page * limit >= totalItems ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
        {/* Debug Box */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Debug Console</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDebugBox(!showDebugBox)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                {showDebugBox ? 'Hide' : 'Show'} Debug
              </button>
              <button
                onClick={() => { setDebugSteps([]); setDebugData(null); fetchUsers() }}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Refresh
              </button>
            </div>
          </div>
          {showDebugBox && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Steps</h4>
                <div className="bg-black text-green-400 p-3 rounded font-mono text-sm max-h-40 overflow-y-auto">
                  {debugSteps.length === 0 ? (
                    <div className="text-gray-500">No debug steps yet...</div>
                  ) : (
                    debugSteps.map((s, i) => (<div key={i} className="mb-1">{s}</div>))
                  )}
                </div>
              </div>
              {debugData && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">API Response</h4>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs min-h-60 overflow-y-auto">
                    <pre>{JSON.stringify(debugData, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


