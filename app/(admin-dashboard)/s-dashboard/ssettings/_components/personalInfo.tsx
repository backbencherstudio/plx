"use client"
import { PencilIcon, ChevronDownIcon, X as XIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSettingsContext } from "../_components/SettingsContext"

type PersonalInfoFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  timezone: string
  dateFormat: string
}

export default function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [snapshot, setSnapshot] = useState<PersonalInfoFormValues | null>(null)
  const { setDirty, registerSubmit } = useSettingsContext()

  const { register, handleSubmit, reset, watch } = useForm<PersonalInfoFormValues>({
    defaultValues: {
      firstName: "Jenny",
      lastName: "Wilson",
      email: "jwnnywilson@gmail.com",
      phone: "(704) 555-0127",
      company: "Binford Ltd.",
      jobTitle: "Logistics Manager",
      timezone: "UTC + 7",
      dateFormat: "MM/DD/YYYY",
    },
  })

  useEffect(() => {
    // If needed, hydrate from an API here and then reset(formData)
  }, [])

  const onSubmit = (data: PersonalInfoFormValues) => {
    // Replace with API call
    // console.log("Submitted Settings:", data)
  }

  const startEdit = () => {
    setSnapshot(watch())
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (snapshot) {
      reset(snapshot)
    }
    setIsEditing(false)
    setDirty(false)
  }

  // mark dirty on any change
  useEffect(() => {
    const subscription = watch(() => {
      if (isEditing) setDirty(true)
    })
    return () => subscription.unsubscribe()
  }, [watch, isEditing, setDirty])

  // allow layout global save to submit this form
  useEffect(() => {
    registerSubmit(() =>
      handleSubmit(async (formValues) => {
        await onSubmit(formValues)
        setIsEditing(false)
        setDirty(false)
      })()
    )
  }, [registerSubmit, handleSubmit, onSubmit, watch])

  return (
    <div className=" bg-gray-50">
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Personal Information Sections */}
          <div className="px-6 pt-6 pb-10 bg-white rounded-xl flex flex-col gap-7">
            <div className="flex justify-between items-center">
              <h2 className="text-neutral-800 text-lg font-semibold font-sans leading-loose">Personal Information</h2>
              {/* {!isEditing ? (
                <button type="button" className="flex items-center gap-2 cursor-pointer text-blue-600 hover:opacity-90 active:opacity-80" onClick={startEdit}>
                  <PencilIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium font-sans underline leading-relaxed">Edit</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleCancel} aria-label="Cancel" title="Cancel" className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:opacity-80">
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              )} */}
            </div>

            <div className="w-full flex flex-col gap-7">
              {/* First Row: First Name & Last Namee */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">First Name</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <input
                      className="w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed"
                      disabled={!isEditing}
                      {...register("firstName")}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Last Name</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <input
                      className="w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed"
                      disabled={!isEditing}
                      {...register("lastName")}
                    />
                  </div>
                </div>
              </div>

              {/* Second Row: Email & Phone */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Email Address</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <input
                      className="w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed"
                      type="email"
                      disabled={!isEditing}
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Phone No</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <input
                      className="w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed"
                      disabled={!isEditing}
                      {...register("phone")}
                    />
                  </div>
                </div>
              </div>

              {/* Third Row: Company & Job Title */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Company Name</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <input
                      className="w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed"
                      disabled={!isEditing}
                      {...register("company")}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Job Title</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <input
                      className="w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed"
                      disabled={!isEditing}
                      {...register("jobTitle")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="px-6 pt-6 pb-10 bg-white rounded-xl flex flex-col gap-7">
            <h2 className="text-neutral-800 text-lg font-semibold font-sans leading-loose">Preferences</h2>

            <div className="flex flex-col gap-7">
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Prefered Timezone</label>
                  <div className="relative h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between">
                    <select
                      className="appearance-none pr-6 w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed cursor-pointer"
                      disabled={!isEditing}
                      {...register("timezone")}
                    >
                      <option value="UTC + 7">UTC + 7</option>
                      <option value="UTC + 6">UTC + 6</option>
                      <option value="UTC + 5">UTC + 5</option>
                      <option value="UTC + 1">UTC + 1</option>
                      <option value="UTC">UTC</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-5 w-4 h-4 text-neutral-600" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Date Format</label>
                  <div className="relative h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between">
                    <select
                      className="appearance-none pr-6 w-full bg-transparent outline-none text-neutral-600 text-sm font-medium font-sans leading-tight disabled:cursor-not-allowed cursor-pointer"
                      disabled={!isEditing}
                      {...register("dateFormat")}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-5 w-4 h-4 text-neutral-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
