import EyeIcon from "@/public/nominations/icons/EyeIcon";
import DeleteIcon from "@/public/schedule/icons/DeleteIcon";
import DownloadIcon from "@/public/schedule/icons/DownloadIcon";

 


export const scheduleColumn = [
  {
    label: "Assigned User",
    accessor: "assignedUser",
    width: "20%",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
          {row.assignedUser?.charAt(0)}
        </div>
       <div>
        <h3 className=" text-sm text-graytext  font-medium">{row.assignedUser}</h3>
        {/* <p className=" text-xs text-[#777980]">{row.email}</p> */}
       </div>
      </div>
    ),  
  },
  {
    label: "Email",
    accessor: "email",
    width: "20%",
    formatter: (item: string) => (
    
      <p className="text-sm  text-graytext   ">
        {item}
      </p>
    
 
    ),
  },
  {
    label: "File",
    accessor: "fileName",
    width: "20%",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-2">
      <p className="text-sm  text-graytext font-medium  ">
        {item}  
      </p>
      <button className=" cursor-pointer">
      <DownloadIcon/>

      </button>

      </div>
    ),
  },
  {
    label: "Date Uploaded",
    accessor: "dateUploaded",
    width: "20%",
    formatter: (item: string, row: any) => (
      <p className="text-sm  text-graytext font-medium">
        {item}  
      </p>
    ),
  },
  {
    label: "Actions",
    accessor: "timeZone",
    width: "20%",
    formatter: (item: string, row: any) => (
      <div className=" flex items-center gap-14">
        <button className=" cursor-pointer">
        <EyeIcon/>

        </button>
        <button className=" cursor-pointer">

        <DeleteIcon/>
        </button>
      </div>
    ),
  }
  
];