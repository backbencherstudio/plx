import EyeIcon from "@/public/nominations/icons/EyeIcon";
import DeleteIcon from "@/public/schedule/icons/DeleteIcon";
import DownloadIcon from "@/public/schedule/icons/DownloadIcon";

export const scheduleColumn = [
  {
    label: "Assigned User",
    accessor: "user",
    width: "20%",
    formatter: (item: any, row: any) => (
      <div className="flex items-center gap-2">
        <img
          src={item?.avatar}
          alt={item?.fullName}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm text-graytext font-medium">
            {item?.fullName} {item?.companyName ? `- ${item.companyName}` : ""}
          </h3>
          <p className="text-xs text-[#777980]">{item?.email}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Asset Group",
    accessor: "assetGroup",
    width: "10%",
    formatter: (item: string) => (
      <p className="text-[#4A4C56] text-sm font-medium">{item}</p>
    ),
  },
  {
    label: "Commodity Type",
    accessor: "commodityType",
    width: "10%",
    formatter: (item: string) => (
      <p className="text-[#4A4C56] text-sm font-medium">{item}</p>
    ),
  },
  {
    label: "Schedule Month",
    accessor: "seduleMonth",
    width: "10%",
    formatter: (item: string) => (
      <p className="text-[#4A4C56] text-sm font-medium">{item}</p>
    ),
  },
  {
    label: "Transportation Mode",
    accessor: "transportMode",
    width: "11%",
    formatter: (item: string) => (
      <p
        className={`text-sm font-medium py-1.5 inline-block px-3.5 rounded-full text-center ${
          item === "Pipeline"
            ? "text-[#123F93] bg-[#E7ECF4]"
            : item === "Trucking"
            ? "text-[#116557] bg-[#E9FAF7]"
            : item === "Railcar"
            ? "text-[#6E00FF] bg-[#F1E6FF]"
            : ""
        }`}
      >
        {item}
      </p>
    ),
  },
  {
  label: "File",
  accessor: "scheduleFile",
  width: "13%",
  formatter: (item: string) => (
    <div className="flex items-center gap-2">
      <a
        href={item}
        download // <- ekhane file download hoye jabe
        className="text-sm text-graytext font-medium underline"
      >
        Download
      </a>
      <button className="cursor-pointer" onClick={() => window.open(item, "_blank")}>
        <DownloadIcon />
      </button>
    </div>
  ),
},
  {
    label: "Date Uploaded",
    accessor: "createdAt",
    width: "14%",
    formatter: (item: string) => (
      <p className="text-sm text-graytext font-medium">
        {new Date(item).toLocaleDateString()}{" "}
        {new Date(item).toLocaleTimeString()}
      </p>
    ),
  },
  {
    label: "Actions",
    accessor: "id",
    width: "11%",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-4">
        <button className="cursor-pointer">
          <EyeIcon />
        </button>
        <button className="cursor-pointer">
          <DeleteIcon />
        </button>
      </div>
    ),
  },
];
