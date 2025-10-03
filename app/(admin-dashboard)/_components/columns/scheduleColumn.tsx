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
       <div >
        <h3 className=" text-sm text-graytext  font-medium">{row.assignedUser} - {row.companyName}</h3>
        <p className=" text-xs text-[#777980]">{row.email}</p>
       </div>
      </div>
    ),  
  },
  {
     label:"Asset Group",
     accessor:"assetGrouup",
     width:"10%",
      formatter: (item: string ) => (
       <p className=" text-[#4A4C56] text-sm font-medium">{item}</p>
    ),  

  },
  {
     label:"Commodity Type",
     accessor:"commodityType",
     width:"10%",
      formatter: (item: string ) => (
       <p className=" text-[#4A4C56] text-sm font-medium">{item}</p>
    ),  

  },
  {
    label: "Schedule Month",
    accessor: "month",
    width: "10%",
    formatter: (item: string) => (
    
      <p className=" text-[#4A4C56] text-sm font-medium">
        {item}
      </p>
    
 
    ),
  },
  {
    label: "Transportation Mode",
    accessor: "transportationMode",
    width: "11%",
    formatter: (item: string) => (
    
      <p className={`text-sm font-medium py-1.5 inline-block px-3.5 rounded-full text-center ${item==='Pipeline'?'text-[#123F93] bg-[#E7ECF4]': item==='Trucking'?" text-[#116557] bg-[#E9FAF7]": item==='Railcar'?'text-[#6E00FF] bg-[#F1E6FF]':''}`}>
        {item}
      </p>
    
 
    ),
  },
  {
    label: "File",
    accessor: "fileName",
    width: "13%",
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
    width: "14%",
    formatter: (item: string, row: any) => (
      <div className=" flex items-center">
        <p>{row.dateUploaded} - {row.timeUploaded}</p>
        
      </div>
    ),  
  },
  {
    label: "Actions",
    accessor: "timeZone",
    width: "11%",
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