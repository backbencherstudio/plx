"use client"


export const UpcomingMeetingColumn = [
  {
    label: "User Name",
    accessor: "userName",
    width: "20%",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
          {row.user?.charAt(0)}
        </div>
       <div>
        <div>
        <h3 className=" text-sm text-graytext  font-medium">{row.user} - {row.companyName}</h3>

        </div>
        <p className=" text-xs text-[#777980]">{row.email}</p>
       </div>
      </div>
    ),  
  },
  {
    label: "Meeting Request",
    accessor: "requestDate",
    width: "12%",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium  ">
        {item}
      </p>
    ),
  },
  {
    label: "Meeting Date",
    accessor: "meetingDate",
    width: "12%",
    formatter: (item: string, row: any) => (
      <p className="text-sm  text-graytext font-medium  ">
        {item}  
      </p>
    ),
  },
  {
    label: "Time",
    accessor: "time",
    width: "12%",
    formatter: (item: string, row: any) => (
      <p className="text-sm  text-graytext font-medium">
        {item}  
      </p>
    ),
  },
  {
    label: "Time Zone",
    accessor: "timeZone",
    width: "12%",
    formatter: (item: string, row: any) => (
      <p className="text-sm  text-graytext font-medium">
        {item}  
      </p>
    ),
  },
  {
    label: "Duration",
    accessor: "duration",
    width: "12%",
    formatter: (item: string, row: any) => (
      <p className="text-sm  text-graytext font-medium">
        {item}  
      </p>
    ),
  },
  {
    label: "Subject",
    accessor: "subject",
    width: "20%",
    formatter: (item: string, row: any) => (
      <h4 className="text-sm  text-graytext font-medium ">
        {item}  
      </h4>
    ),
  },
  
];