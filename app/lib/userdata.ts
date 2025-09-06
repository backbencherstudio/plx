// User data structure based on the PLX Energy Transportation Logistics dashboard


  // Page-level types
  export interface Breadcrumb {
    label: string;
    path: string;
    isActive: boolean;
  }

  export interface PageInfo {
    title: string;
    description: string;
    breadcrumbs: Breadcrumb[];
  }

  // Main user data object
  export const userData = {
    user: {
      name: "Jenny Wilson",
      company: "Binford Ltd.",
      avatar: "/user-avatar.png"
    },
    
    // company: {
    //   name: "PLX",
    //   logo: "/plx-logo.svg",
    //   tagline: "Energy Transportation Expertise"
    // },
    
    // navigation: [
    //   {
    //     id: "dashboard",
    //     name: "Dashboard",
    //     icon: "DashboardIcon",
    //     isActive: true,
    //     path: "/admin-dashboard"
    //   },
    //   {
    //     id: "nomination",
    //     name: "Nomination",
    //     icon: "NominationIcon",
    //     isActive: false,
    //     path: "/admin-dashboard/nomination"
    //   },
    //   {
    //     id: "schedule",
    //     name: "Schedule",
    //     icon: "SchedualIcon",
    //     isActive: false,
    //     path: "/admin-dashboard/schedule"
    //   },
    //   {
    //     id: "message",
    //     name: "Message",
    //     icon: "MessageIcon",
    //     isActive: false,
    //     path: "/admin-dashboard/message"
    //   },
    //   {
    //     id: "settings",
    //     name: "Settings",
    //     icon: "SettingsIcon",
    //     isActive: false,
    //     path: "/admin-dashboard/settings"
    //   },
    //   {
    //     id: "logout",
    //     name: "Log Out",
    //     icon: "LogOutIcon",
    //     isActive: false,
    //     path: "/logout"
    //   }
    // ],
    
    // quickActions: [
    //   {
    //     id: "live-schematic",
    //     title: "Live Schematic",
    //     description: "View real-time operations across Pipeline, Trucking, Rail, and Marine logistics.",
    //     icon: "LiveSchematicIcon",
    //     color: "blue",
    //     action: "/live-schematic"
    //   },
    //   {
    //     id: "request-nomination",
    //     title: "Request Nomination",
    //     description: "Submit a new nomination request with commodity details and transport preferences.",
    //     icon: "RequestNominationIcon",
    //     color: "green",
    //     action: "/request-nomination"
    //   },
    //   {
    //     id: "book-meeting",
    //     title: "Book A Meeting",
    //     description: "Schedule a consultation with our logistics team for your specific needs.",
    //     icon: "BookMeetingIcon",
    //     color: "purple",
    //     action: "/book-meeting"
    //   },
    //   {
    //     id: "direct-message",
    //     title: "Direct Message",
    //     description: "Send a message to your dedicated admin team for immediate assistance.",
    //     icon: "DirectMessageIcon",
    //     color: "orange",
    //     action: "/direct-message"
    //   }
    // ],
    
    previousNominations: [
      {
        id: "#487598",
        file: {
          name: "Schedule_Jan",
          downloadUrl: "/downloads/schedule-jan.pdf"
        },
        requestedDate: "2025-08-25",
        commodity: "Natural Gas",
        volume: "15,000 BBLs",
        route: {
          from: "Houston, TX",
          to: "Dallas, TX"
        },
        transport: {
          type: "Pipeline",
          color: "blue"
        },
        beginningDate: "2025-08-25",
        endDate: "2025-08-25",
        action: "view"
      },
      {
        id: "#487596",
        file: {
          name: "Schedule_Jan",
          downloadUrl: "/downloads/schedule-jan.pdf"
        },
        requestedDate: "2025-08-25",
        commodity: "Crude Oil",
        volume: "25,000 MWh",
        route: {
          from: "San Antonio, TX",
          to: "Dallas, TX"
        },
        transport: {
          type: "Trucking",
          color: "green"
        },
        beginningDate: "2025-08-25",
        endDate: "2025-08-25",
        action: "view"
      }
    ],
    
    notifications: {
      hasUnread: true,
      count: 3,
      data: [
        {
          id: "1",
          type: "message",
          title: "New message from Admin",
          description: "You have received a new message regarding your recent nomination request.",
          timestamp: "12:58 PM",
          isRecent: true,
        },
        {
          id: "2",
          type: "update",
          title: "Schedule has been updated successfully.",
          description: "Your transportation schedule for the upcoming week has been updated.",
          timestamp: "2 hours ago",
          isRecent: true,
        },
        {
          id: "3",
          type: "meeting",
          title: "Your meeting with Admin at 5:00 PM on 12/02/2025 via Calendly, has been approved.",
          description: "Your scheduled meeting has been confirmed. Please prepare your questions in advance.",
          timestamp: "8 hours ago",
          isRecent: false,
        },
        {
          id: "4",
          type: "nomination",
          title: "Nomination #487598 has been approved",
          description: "Your nomination request for Natural Gas transportation has been approved and is ready for scheduling.",
          timestamp: "1 day ago",
          isRecent: false,
        },
        {
          id: "5",
          type: "schedule",
          title: "Schedule maintenance scheduled for tomorrow",
          description: "Pipeline maintenance is scheduled for tomorrow from 2:00 AM to 6:00 AM. Please plan accordingly.",
          timestamp: "2 days ago",
          isRecent: false,
        }
      ]
    },
  
    // Nominations Page Data - API Ready Structure
    nominationsPage: {
      pageInfo: {
        title: "Nominations",
        description: "Create your commodity transport requests",
        breadcrumbs: [
          { label: "Dashboard", path: "/admin-dashboard", isActive: false },
          { label: "Nominations", path: "/admin-dashboard/nomination", isActive: true }
        ]
      },
  
      newNominationForm: {
        isExpanded: true,
        formData: {
          commodityType: {
            value: "",
            options: [
              { id: "1", name: "Natural Gas", code: "NATURAL_GAS", category: "gas", unit: "MMBtu", isAvailable: true },
              { id: "2", name: "Crude Oil - WTI", code: "CRUDE_OIL_WTI", category: "oil", unit: "bbls", isAvailable: true },
              { id: "3", name: "Electricity", code: "ELECTRICITY", category: "power", unit: "MWh", isAvailable: true },
              { id: "4", name: "LNG", code: "LNG", category: "gas", unit: "MMBtu", isAvailable: true },
              { id: "5", name: "Petrochemicals", code: "PETROCHEMICALS", category: "chemical", unit: "tons", isAvailable: true }
            ],
            validation: { required: true, message: "Commodity type is required" }
          },
          volume: {
            value: "",
            validation: { required: true, min: 1, max: 1000000, message: "Volume must be between 1 and 1,000,000" }
          },
          unit: {
            value: "bbls",
            options: [
              { id: "1", name: "Barrels", code: "BBLS", symbol: "bbls", isDefault: true },
              { id: "2", name: "Gallons", code: "GALLONS", symbol: "gallons", isDefault: false },
              { id: "3", name: "MCF", code: "MCF", symbol: "MCF", isDefault: false },
              { id: "4", name: "Tons", code: "TONS", symbol: "tons", isDefault: false }
            ],
            validation: { required: true, message: "Unit is required" }
          },
          origin: {
            value: "",
            placeholder: "Enter origin location",
            validation: { required: true, message: "Origin is required" }
          },
          destination: {
            value: "",
            placeholder: "Enter destination location",
            validation: { required: true, message: "Destination is required" }
          },
          transportMode: {
            value: "",
            options: [
              { id: "1", name: "Pipeline", code: "PIPELINE", color: "blue", capacity: "high", cost: "low", isAvailable: true },
              { id: "2", name: "Trucking", code: "TRUCKING", color: "green", capacity: "medium", cost: "medium", isAvailable: true },
              { id: "3", name: "Railcar", code: "RAILCAR", color: "purple", capacity: "high", cost: "medium", isAvailable: true },
              { id: "4", name: "Marine", code: "MARINE", color: "yellow", capacity: "very_high", cost: "low", isAvailable: true }
            ],
            validation: { required: true, message: "Transport mode is required" }
          },
          requestedDate: {
            value: "",
            placeholder: "mm/dd/yyyy",
            minDate: new Date().toISOString().split('T')[0],
            maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            validation: { required: true, message: "Requested date is required" }
          },
          notes: {
            value: "",
            placeholder: "Additional information, special requirements, or comments...",
            maxLength: 500,
            validation: { required: false, message: "" }
          }
        },
        formActions: {
          submit: {
            label: "Submit Nomination",
            action: "submit_nomination",
            endpoint: "/api/nominations",
            method: "POST"
          },
          cancel: {
            label: "Cancel",
            action: "cancel_form"
          },
          reset: {
            label: "Reset",
            action: "reset_form"
          }
        },
        formValidation: {
          isValid: false,
          errors: []
        }
      },
  
      previousNominationsTable: {
        tableInfo: {
          title: "Your Previous Nominations",
          description: "View and manage your submitted nominations",
          totalRecords: 100,
          recordsPerPage: 5,
          currentPage: 1,
          totalPages: 20
        },
  
        filters: {
          dateRange: {
            from: { value: "", placeholder: "mm/dd/yyyy", format: "MM/DD/YYYY" },
            to: { value: "", placeholder: "mm/dd/yyyy", format: "MM/DD/YYYY" }
          },
          status: {
            value: "",
            options: [
              { id: "1", name: "Submitted", code: "SUBMITTED", color: "blue" },
              { id: "2", name: "Confirmed", code: "CONFIRMED", color: "green" },
              { id: "3", name: "Pending", code: "PENDING", color: "yellow" },
              { id: "4", name: "Rejected", code: "REJECTED", color: "red" }
            ]
          },
          commodity: {
            value: "",
            options: [
              { id: "1", name: "Natural Gas", code: "NATURAL_GAS" },
              { id: "2", name: "Crude Oil - WTI", code: "CRUDE_OIL_WTI" },
              { id: "3", name: "Electricity", code: "ELECTRICITY" }
            ]
          },
          transport: {
            value: "",
            options: [
              { id: "1", name: "Pipeline", code: "PIPELINE", color: "blue" },
              { id: "2", name: "Trucking", code: "TRUCKING", color: "green" },
              { id: "3", name: "Railcar", code: "RAILCAR", color: "purple" }
            ]
          }
        },
  
        columns: [
          { id: "id", key: "id", label: "ID", sortable: true, filterable: false, width: "100px", align: "left", renderType: "text" },
          { id: "file", key: "file", label: "File", sortable: false, filterable: false, width: "150px", align: "left", renderType: "file" },
          { id: "requestedDate", key: "requestedDate", label: "Requested Date", sortable: true, filterable: true, width: "130px", align: "center", renderType: "date" },
          { id: "commodity", key: "commodity", label: "Commodity", sortable: true, filterable: true, width: "120px", align: "left", renderType: "text" },
          { id: "volume", key: "volume", label: "Volume", sortable: true, filterable: false, width: "120px", align: "right", renderType: "volume" },
          { id: "route", key: "route", label: "Route", sortable: false, filterable: false, width: "200px", align: "left", renderType: "route" },
          { id: "transport", key: "transport", label: "Transport", sortable: true, filterable: true, width: "120px", align: "center", renderType: "badge" },
          { id: "beginningDate", key: "beginningDate", label: "Beginning Date", sortable: true, filterable: true, width: "130px", align: "center", renderType: "date" },
          { id: "endDate", key: "endDate", label: "End Date", sortable: true, filterable: true, width: "130px", align: "center", renderType: "date" },
          { id: "action", key: "action", label: "Action", sortable: false, filterable: false, width: "100px", align: "center", renderType: "actions" }
        ],
  
        data: [
          {
            id: "#487598",
            file: {
              name: "Schedule_Jan",
              downloadUrl: "/downloads/schedule-jan.pdf",
              fileType: "pdf",
              fileSize: "2.4 MB"
            },
            requestedDate: "2025-08-25",
            commodity: { name: "Natural Gas", code: "NATURAL_GAS", category: "gas" },
            volume: { value: "15,000", unit: "BBLs" },
            route: { from: "Houston, TX", to: "Dallas, TX", distance: "240 miles" },
            transport: { type: "Pipeline", code: "PIPELINE", color: "blue", capacity: "high" },
            beginningDate: "2025-08-25",
            endDate: "2025-08-25",
            status: { name: "Confirmed", code: "CONFIRMED", color: "green", description: "Nomination has been confirmed and approved" },
            priority: { level: "Medium", code: "MEDIUM", color: "yellow" },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_nomination", endpoint: "/api/nominations/487598", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_file", endpoint: "/api/nominations/487598/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              createdBy: "Jenny Wilson",
              lastModifiedBy: "Admin"
            }
          },
          {
            id: "#487596",
            file: {
              name: "Schedule_Jan",
              downloadUrl: "/downloads/schedule-jan.pdf",
              fileType: "pdf",
              fileSize: "2.1 MB"
            },
            requestedDate: "2025-08-25",
            commodity: { name: "Crude Oil", code: "CRUDE_OIL_WTI", category: "oil" },
            volume: { value: "25,000", unit: "MWh" },
            route: { from: "San Antonio, TX", to: "Dallas, TX", distance: "280 miles" },
            transport: { type: "Trucking", code: "TRUCKING", color: "green", capacity: "medium" },
            beginningDate: "2025-08-25",
            endDate: "2025-08-25",
            status: { name: "Submitted", code: "SUBMITTED", color: "blue", description: "Nomination has been submitted and is under review" },
            priority: { level: "Low", code: "LOW", color: "gray" },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_nomination", endpoint: "/api/nominations/487596", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_file", endpoint: "/api/nominations/487596/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              createdBy: "Jenny Wilson",
              lastModifiedBy: "Jenny Wilson"
            }
          }
        ],
  
        pagination: {
          currentPage: 1,
          totalPages: 20,
          totalRecords: 100,
          recordsPerPage: 5,
          showingFrom: 1,
          showingTo: 5,
          pageSizeOptions: [5, 10, 25, 50, 100],
          hasNextPage: true,
          hasPreviousPage: false
        },
  
        sorting: {
          field: "requestedDate",
          direction: "desc",
          options: [
            { field: "requestedDate", label: "Requested Date", defaultDirection: "desc" },
            { field: "commodity", label: "Commodity", defaultDirection: "asc" },
            { field: "volume", label: "Volume", defaultDirection: "desc" },
            { field: "beginningDate", label: "Beginning Date", defaultDirection: "desc" }
          ]
        },
  
        search: {
          query: "",
          placeholder: "Search nominations...",
          fields: ["id", "commodity", "origin", "destination", "notes"],
          isEnabled: true
        }
      },
  
      apiEndpoints: {
        create: {
          url: "/api/nominations",
          method: "POST",
          headers: { "Content-Type": "application/json" }
        },
        read: {
          url: "/api/nominations",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: [
            { name: "page", type: "number", required: false, defaultValue: 1 },
            { name: "limit", type: "number", required: false, defaultValue: 5 },
            { name: "sort", type: "string", required: false, defaultValue: "requestedDate" },
            { name: "order", type: "string", required: false, defaultValue: "desc" },
            { name: "search", type: "string", required: false },
            { name: "fromDate", type: "string", required: false },
            { name: "toDate", type: "string", required: false },
            { name: "status", type: "string", required: false },
            { name: "commodity", type: "string", required: false },
            { name: "transport", type: "string", required: false }
          ]
        },
        update: {
          url: "/api/nominations/:id",
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        },
        delete: {
          url: "/api/nominations/:id",
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        },
        download: {
          url: "/api/nominations/:id/download",
          method: "GET",
          headers: { "Content-Type": "application/octet-stream" }
        },
        export: {
          url: "/api/nominations/export",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          formats: ["csv", "xlsx", "pdf"]
        },
        bulkActions: {
          url: "/api/nominations/bulk",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          actions: [
            { name: "delete", label: "Delete Selected", endpoint: "/api/nominations/bulk/delete" },
            { name: "export", label: "Export Selected", endpoint: "/api/nominations/bulk/export" },
            { name: "status", label: "Update Status", endpoint: "/api/nominations/bulk/status" }
          ]
        }
      },
  
      validationRules: {
        commodityType: { required: true, message: "Please select a commodity type" },
        volume: { required: true, min: 1, max: 1000000, message: "Volume must be between 1 and 1,000,000" },
        unit: { required: true, message: "Please select a unit" },
        origin: { required: true, message: "Please enter origin location" },
        destination: { required: true, message: "Please enter destination location" },
        transportMode: { required: true, message: "Please select a transport mode" },
        requestedDate: { required: true, message: "Please select a requested date" }
      },
  
      errorHandling: {
        apiErrors: [
          { code: "VALIDATION_ERROR", message: "Please check your input and try again", field: "", action: "show_validation_errors" },
          { code: "DUPLICATE_NOMINATION", message: "A similar nomination already exists", field: "", action: "show_duplicate_warning" },
          { code: "INSUFFICIENT_CAPACITY", message: "Selected transport mode has insufficient capacity", field: "transportMode", action: "show_capacity_warning" }
        ],
        validationErrors: [],
        networkErrors: [
          { code: "NETWORK_ERROR", message: "Network error. Please check your connection and try again", retryAction: "retry_request" },
          { code: "TIMEOUT_ERROR", message: "Request timeout. Please try again", retryAction: "retry_request" }
        ]
      },
  
      loadingStates: {
        isFormSubmitting: false,
        isTableLoading: false,
        isFiltering: false,
        isExporting: false,
        isDownloading: false
      },
  
      successMessages: {
        nominationCreated: "Nomination created successfully!",
        nominationUpdated: "Nomination updated successfully!",
        nominationDeleted: "Nomination deleted successfully!",
        fileDownloaded: "File downloaded successfully!",
        dataExported: "Data exported successfully!"
      }
    },
  
    // Schedule Page Data Structure - API Ready
    schedulePage: {
      pageInfo: {
        title: "Schedule",
        description: "View your operational schedules",
        breadcrumbs: [
          { label: "Dashboard", path: "/admin-dashboard", isActive: false },
          { label: "Schedule", path: "/admin-dashboard/schedule", isActive: true }
        ]
      },
  
      filters: {
        commodity: {
          value: "",
          options: [
            { id: "1", name: "All Commodities", code: "ALL", category: "all", isDefault: true },
            { id: "2", name: "Crude Oil", code: "CRUDE_OIL", category: "oil", isDefault: false },
            { id: "3", name: "Natural Gas", code: "NATURAL_GAS", category: "gas", isDefault: false },
            { id: "4", name: "NGLs", code: "NGL", category: "gas", isDefault: false },
            { id: "5", name: "Refined Products", code: "REFINED_PRODUCTS", category: "oil", isDefault: false },
            { id: "6", name: "Petrochemicals", code: "PETROCHEMICALS", category: "chemical", isDefault: false }
          ]
        },
        transportationMode: {
          value: "",
          options: [
            { id: "1", name: "All Modes", code: "ALL", color: "gray" },
            { id: "2", name: "Pipeline", code: "PIPELINE", color: "blue" },
            { id: "3", name: "Trucking", code: "TRUCKING", color: "green" },
            { id: "4", name: "Railcar", code: "RAILCAR", color: "purple" },
            { id: "5", name: "Marine", code: "MARINE", color: "yellow" }
          ]
        }
      },
  
      schedulesTable: {
        tableInfo: {
          title: "Schedules",
          description: "Operational schedules for transportation and maintenance",
          totalRecords: 25,
          recordsPerPage: 10,
          currentPage: 1,
          totalPages: 3
        },
  
        columns: [
          { id: "file", key: "file", label: "File", sortable: false, filterable: false, width: "300px", align: "left", renderType: "file" },
          { id: "commodity", key: "commodity", label: "Commodity", sortable: true, filterable: true, width: "150px", align: "left", renderType: "text" },
          { id: "uploadDate", key: "uploadDate", label: "Upload Date", sortable: true, filterable: true, width: "130px", align: "center", renderType: "date" },
          { id: "transportationMode", key: "transportationMode", label: "Transportation Mode", sortable: true, filterable: true, width: "180px", align: "center", renderType: "badge" },
          { id: "actions", key: "actions", label: "Actions", sortable: false, filterable: false, width: "120px", align: "center", renderType: "actions" }
        ],
  
        data: [
          {
            id: "1",
            file: {
              name: "Pipeline Maintenance Schedule",
              description: "Scheduled maintenance activities for all pipeline segments",
              downloadUrl: "/downloads/pipeline-maintenance-schedule.pdf",
              fileType: "pdf",
              fileSize: "2.4 MB",
              fileSizeBytes: 2516582,
              icon: "document-pdf"
            },
            commodity: {
              name: "Crude Oil",
              code: "CRUDE_OIL",
              category: "oil"
            },
            uploadDate: "2025-08-25",
            transportationMode: {
              name: "Pipeline",
              code: "PIPELINE",
              color: "blue",
              description: "Underground pipeline transportation"
            },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_schedule", endpoint: "/api/schedules/1", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_schedule", endpoint: "/api/schedules/1/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin"
            }
          },
          {
            id: "2",
            file: {
              name: "Trucking Route Optimization Report",
              description: "Scheduled maintenance activities for all trucking segments",
              downloadUrl: "/downloads/trucking-route-optimization.pdf",
              fileType: "pdf",
              fileSize: "1.8 MB",
              fileSizeBytes: 1887436,
              icon: "document-pdf"
            },
            commodity: {
              name: "Natural Gas",
              code: "NATURAL_GAS",
              category: "gas"
            },
            uploadDate: "2025-08-25",
            transportationMode: {
              name: "Trucking",
              code: "TRUCKING",
              color: "green",
              description: "Road transport via trucks"
            },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_schedule", endpoint: "/api/schedules/2", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_schedule", endpoint: "/api/schedules/2/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin"
            }
          },
          {
            id: "3",
            file: {
              name: "Rail Transport Capacity Schedule",
              description: "Scheduled maintenance activities for all railcar segments",
              downloadUrl: "/downloads/rail-transport-capacity.pdf",
              fileType: "pdf",
              fileSize: "2.1 MB",
              fileSizeBytes: 2202009,
              icon: "document-pdf"
            },
            commodity: {
              name: "NGLs",
              code: "NGL",
              category: "gas"
            },
            uploadDate: "2025-08-25",
            transportationMode: {
              name: "Railcar",
              code: "RAILCAR",
              color: "purple",
              description: "Rail transportation"
            },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_schedule", endpoint: "/api/schedules/3", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_schedule", endpoint: "/api/schedules/3/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin"
            }
          },
          {
            id: "4",
            file: {
              name: "Pipeline Maintenance Schedule Q1 2025",
              description: "Scheduled maintenance activities for all pipeline segments",
              downloadUrl: "/downloads/pipeline-maintenance-q1-2025.pdf",
              fileType: "pdf",
              fileSize: "3.2 MB",
              fileSizeBytes: 3355443,
              icon: "document-pdf"
            },
            commodity: {
              name: "Refined Products",
              code: "REFINED_PRODUCTS",
              category: "oil"
            },
            uploadDate: "2025-08-25",
            transportationMode: {
              name: "Marine",
              code: "MARINE",
              color: "yellow",
              description: "Water transport via ships"
            },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_schedule", endpoint: "/api/schedules/4", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_schedule", endpoint: "/api/schedules/4/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin"
            }
          },
          {
            id: "5",
            file: {
              name: "Pipeline Maintenance Schedule Q1",
              description: "Scheduled maintenance activities for all pipeline segments",
              downloadUrl: "/downloads/pipeline-maintenance-q1.pdf",
              fileType: "pdf",
              fileSize: "2.8 MB",
              fileSizeBytes: 2936012,
              icon: "document-pdf"
            },
            commodity: {
              name: "Petrochemicals",
              code: "PETROCHEMICALS",
              category: "chemical"
            },
            uploadDate: "2025-08-25",
            transportationMode: {
              name: "Pipeline",
              code: "PIPELINE",
              color: "blue",
              description: "Underground pipeline transportation"
            },
            actions: [
              { id: "view", label: "View", icon: "eye", action: "view_schedule", endpoint: "/api/schedules/5", method: "GET", isDisabled: false },
              { id: "download", label: "Download", icon: "download", action: "download_schedule", endpoint: "/api/schedules/5/download", method: "GET", isDisabled: false }
            ],
            metadata: {
              createdAt: "2025-08-25T10:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin"
            }
          }
        ],
  
        pagination: {
          currentPage: 1,
          totalPages: 3,
          totalRecords: 25,
          recordsPerPage: 10,
          showingFrom: 1,
          showingTo: 10,
          pageSizeOptions: [10, 25, 50, 100],
          hasNextPage: true,
          hasPreviousPage: false
        },
  
        sorting: {
          field: "uploadDate",
          direction: "desc",
          options: [
            { field: "uploadDate", label: "Upload Date", defaultDirection: "desc" },
            { field: "commodity", label: "Commodity", defaultDirection: "asc" },
            { field: "transportationMode", label: "Transportation Mode", defaultDirection: "asc" }
          ]
        },

        // Detail view data for each schedule
        scheduleDetails: {
          "1": {
            id: "1",
            file: {
              name: "Pipeline Maintenance Schedule",
              description: "Scheduled maintenance activities for all pipeline segments",
              downloadUrl: "/downloads/pipeline-maintenance-schedule.pdf",
              fileType: "pdf",
              fileSize: "2.4 MB",
              fileSizeBytes: 2516582,
              icon: "document-pdf"
            },
            category: "Pipeline",
            uploadDate: "1/15/2025",
            fileType: "PDF",
            previewUrl: "/api/schedules/1/preview",
            metadata: {
              createdAt: "2025-01-15T00:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin",
              version: "1.0",
              tags: ["maintenance", "pipeline", "schedule"]
            }
          },
          "2": {
            id: "2",
            file: {
              name: "Trucking Route Optimization Report",
              description: "Scheduled maintenance activities for all trucking segments",
              downloadUrl: "/downloads/trucking-route-optimization.pdf",
              fileType: "pdf",
              fileSize: "1.8 MB",
              fileSizeBytes: 1887436,
              icon: "document-pdf"
            },
            category: "Trucking",
            uploadDate: "1/15/2025",
            fileType: "PDF",
            previewUrl: "/api/schedules/2/preview",
            metadata: {
              createdAt: "2025-01-15T00:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin",
              version: "1.0",
              tags: ["maintenance", "trucking", "schedule"]
            }
          },
          "3": {
            id: "3",
            file: {
              name: "Rail Transport Capacity Schedule",
              description: "Scheduled maintenance activities for all railcar segments",
              downloadUrl: "/downloads/rail-transport-capacity.pdf",
              fileType: "pdf",
              fileSize: "2.1 MB",
              fileSizeBytes: 2202009,
              icon: "document-pdf"
            },
            category: "Railcar",
            uploadDate: "1/15/2025",
            fileType: "PDF",
            previewUrl: "/api/schedules/3/preview",
            metadata: {
              createdAt: "2025-01-15T00:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin",
              version: "1.0",
              tags: ["maintenance", "railcar", "schedule"]
            }
          },
          "4": {
            id: "4",
            file: {
              name: "Pipeline Maintenance Schedule Q1 2025",
              description: "Scheduled maintenance activities for all pipeline segments",
              downloadUrl: "/downloads/pipeline-maintenance-q1-2025.pdf",
              fileType: "pdf",
              fileSize: "3.2 MB",
              fileSizeBytes: 3355443,
              icon: "document-pdf"
            },
            category: "Marine",
            uploadDate: "1/15/2025",
            fileType: "PDF",
            previewUrl: "/api/schedules/4/preview",
            metadata: {
              createdAt: "2025-01-15T00:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin",
              version: "1.0",
              tags: ["maintenance", "marine", "schedule"]
            }
          },
          "5": {
            id: "5",
            file: {
              name: "Pipeline Maintenance Schedule Q1",
              description: "Scheduled maintenance activities for all pipeline segments",
              downloadUrl: "/downloads/pipeline-maintenance-q1.pdf",
              fileType: "pdf",
              fileSize: "2.8 MB",
              fileSizeBytes: 2936012,
              icon: "document-pdf"
            },
            category: "Pipeline",
            uploadDate: "1/15/2025",
            fileType: "PDF",
            previewUrl: "/api/schedules/5/preview",
            metadata: {
              createdAt: "2025-01-15T00:00:00Z",
              updatedAt: "2025-08-25T10:00:00Z",
              uploadedBy: "Admin",
              lastModifiedBy: "Admin",
              version: "1.0",
              tags: ["maintenance", "pipeline", "schedule"]
            }
          }
        }
      },
  
      apiEndpoints: {
        list: {
          url: "/api/schedules",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: [
            { name: "page", type: "number", required: false, defaultValue: 1 },
            { name: "limit", type: "number", required: false, defaultValue: 10 },
            { name: "commodity", type: "string", required: false },
            { name: "transportationMode", type: "string", required: false },
            { name: "sort", type: "string", required: false, defaultValue: "uploadDate" },
            { name: "order", type: "string", required: false, defaultValue: "desc" }
          ]
        },
        detail: {
          url: "/api/schedules/:id",
          method: "GET",
          headers: { "Content-Type": "application/json" }
        },
        download: {
          url: "/api/schedules/:id/download",
          method: "GET",
          headers: { "Content-Type": "application/octet-stream" }
        },
        preview: {
          url: "/api/schedules/:id/preview",
          method: "GET",
          headers: { "Content-Type": "application/json" }
        },
        upload: {
          url: "/api/schedules",
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" }
        },
        update: {
          url: "/api/schedules/:id",
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        },
        delete: {
          url: "/api/schedules/:id",
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      }
    },

    // Message/Chat Page Data Structure - API Ready
    messagePage: {
      pageInfo: {
        title: "Message",
        description: "Chat with your team and contacts",
        breadcrumbs: [
          { label: "Dashboard", path: "/admin-dashboard", isActive: false },
          { label: "Message", path: "/admin-dashboard/message", isActive: true }
        ]
      },
      chatInterface: {
        header: {
          title: "PLX Chat Support",
          description: "Get information you need from admin",
          status: {
            isOnline: true,
            label: "Active Now",
            color: "green",
            lastSeen: null
          },
          logo: "/plx-logo.svg"
        },
        conversations: [
          {
            id: "1",
            contact: {
              id: "1",
              name: "PLX Support Team",
              avatar: "/support-avatar.png",
              status: "online",
              lastSeen: null,
              isVerified: true
            },
            lastMessage: {
              id: "1",
              content: "Okey 👍",
              timestamp: "2025-08-25T10:00:00Z",
              senderId: "1",
              type: "text",
              status: "read"
            },
            unreadCount: 0,
            isActive: true,
            lastActivity: "2025-08-25T10:00:00Z"
          },
          
        ],
        currentChat: {
          conversationId: "1",
          contact: {
            id: "1",
            name: "PLX Support Team",
            avatar: "/support-avatar.png",
            status: "online",
            lastSeen: null,
            isVerified: true
          },
          messages: [
            {
              id: "1",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              timestamp: "2025-08-22T10:00:00Z",
              senderId: "1",
              senderName: "PLX",
              type: "text",
              status: "read",
              isFromUser: false,
              timeAgo: "1 day ago"
            },
            {
              id: "2",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              timestamp: "2025-08-22T10:01:00Z",
              senderId: "1",
              senderName: "PLX",
              type: "text",
              status: "read",
              isFromUser: false,
              timeAgo: "1 day ago"
            },
            {
              id: "3",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 👍",
              timestamp: "2025-08-22T10:02:00Z",
              senderId: "user",
              senderName: "You",
              type: "text",
              status: "read",
              isFromUser: true,
              timeAgo: "1 day ago"
            },
            {
              id: "4",
              content: "Okey 👍",
              timestamp: "2025-08-25T10:00:00Z",
              senderId: "1",
              senderName: "PLX",
              type: "text",
              status: "read",
              isFromUser: false,
              timeAgo: "1 min ago"
            },
            {
              id: "5",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              timestamp: "2025-08-25T10:01:00Z",
              senderId: "1",
              senderName: "PLX",
              type: "text",
              status: "read",
              isFromUser: false,
              timeAgo: "1 min ago"
            },
            {
              id: "6",
              content: "Lorem ipsum dolor sit 👍",
              timestamp: "2025-08-25T10:02:00Z",
              senderId: "user",
              senderName: "You",
              type: "text",
              status: "read",
              isFromUser: true,
              timeAgo: "1 min ago"
            }
          ],
          dateSeparators: [
            {
              id: "1",
              date: "2025-08-22",
              label: "1 day ago"
            },
            {
              id: "2",
              date: "2025-08-25",
              label: "Today, 22 August"
            }
          ]
        },
        messageInput: {
          placeholder: "Type a message...",
          attachments: {
            isEnabled: true,
            maxSize: "10MB",
            allowedTypes: ["pdf", "doc", "docx", "jpg", "png"],
            icon: "paperclip"
          },
          sendButton: {
            icon: "send",
            color: "blue",
            isDisabled: false
          }
        }
      },
      apiEndpoints: {
        conversations: {
          url: "/api/conversations",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: [
            { name: "page", type: "number", required: false, defaultValue: 1 },
            { name: "limit", type: "number", required: false, defaultValue: 20 }
          ]
        },
        messages: {
          url: "/api/conversations/:id/messages",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: [
            { name: "page", type: "number", required: false, defaultValue: 1 },
            { name: "limit", type: "number", required: false, defaultValue: 50 }
          ]
        },
        sendMessage: {
          url: "/api/conversations/:id/messages",
          method: "POST",
          headers: { "Content-Type": "application/json" }
        },
        markAsRead: {
          url: "/api/conversations/:id/messages/read",
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        },
        uploadAttachment: {
          url: "/api/conversations/:id/attachments",
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" }
        }
      },
      chatSettings: {
        notifications: {
          sound: true,
          desktop: true,
          email: false
        },
        autoSave: true,
        typingIndicator: true,
        readReceipts: true,
        messageRetention: "30 days"
      },
      errorHandling: {
        connectionErrors: [
          { code: "CONNECTION_FAILED", message: "Connection failed. Please try again.", retryAction: "retry_connection" }
        ],
        messageErrors: [
          { code: "MESSAGE_TOO_LONG", message: "Message is too long", field: "content", action: "truncate_message" }
        ]
      },
      loadingStates: {
        isConnecting: false,
        isSendingMessage: false,
        isUploadingAttachment: false,
        isLoadingMessages: false,
                 isTyping: false
       }
     },

     // Settings Page Data - API Ready
     settingsPage: {
       pageInfo: {
         title: "Settings",
         description: "Manage your account preferences and security",
         breadcrumbs: [
           { label: "Dashboard", path: "/admin-dashboard", isActive: false },
           { label: "Settings", path: "/admin-dashboard/settings", isActive: true }
         ]
       },
       settingsNavigation: [
         {
           id: "personal-info",
           name: "Personal Information",
           icon: "person",
           isActive: true,
           path: "/admin-dashboard/settings/personal-info"
         },
         {
           id: "notification",
           name: "Notification",
           icon: "bell",
           isActive: false,
           path: "/admin-dashboard/settings/notification"
         },
         {
           id: "security",
           name: "Security",
           icon: "shield",
           isActive: false,
           path: "/admin-dashboard/settings/security"
         }
       ],
       personalInformation: {
         isEditing: false,
         formData: {
           firstName: {
             value: "Jenny",
             placeholder: "Enter first name",
             validation: { required: true, message: "First name is required" }
           },
           lastName: {
             value: "Wilson",
             placeholder: "Enter last name",
             validation: { required: true, message: "Last name is required" }
           },
           emailAddress: {
             value: "jwnnywilson@gmail.com",
             placeholder: "Enter email address",
             validation: { required: true, type: "email", message: "Valid email address is required" }
           },
           phoneNumber: {
             value: "(704) 555-0127",
             placeholder: "Enter phone number",
             validation: { required: true, message: "Phone number is required" }
           },
           companyName: {
             value: "Binford Ltd.",
             placeholder: "Enter company name",
             validation: { required: true, message: "Company name is required" }
           },
           jobTitle: {
             value: "Logistics Manager",
             placeholder: "Enter job title",
             validation: { required: false, message: "" }
           },
           department: {
             value: "Operations",
             placeholder: "Enter department",
             validation: { required: false, message: "" }
           },
           employeeId: {
             value: "EMP-2025-001",
             placeholder: "Enter employee ID",
             validation: { required: false, message: "" }
           },
           dateOfBirth: {
             value: "1985-03-15",
             placeholder: "Select date of birth",
             validation: { required: false, message: "" }
           },
           address: {
             street: {
               value: "123 Business Ave",
               placeholder: "Enter street address",
               validation: { required: false, message: "" }
             },
             city: {
               value: "Charlotte",
               placeholder: "Enter city",
               validation: { required: false, message: "" }
             },
             state: {
               value: "NC",
               placeholder: "Enter state",
               validation: { required: false, message: "" }
             },
             zipCode: {
               value: "28202",
               placeholder: "Enter ZIP code",
               validation: { required: false, message: "" }
             },
             country: {
               value: "United States",
               placeholder: "Enter country",
               validation: { required: false, message: "" }
             }
           },
           emergencyContact: {
             name: {
               value: "John Wilson",
               placeholder: "Enter emergency contact name",
               validation: { required: false, message: "" }
             },
             relationship: {
               value: "Spouse",
               placeholder: "Enter relationship",
               validation: { required: false, message: "" }
             },
             phone: {
               value: "(704) 555-0128",
               placeholder: "Enter emergency contact phone",
               validation: { required: false, message: "" }
             }
           }
         },
         formActions: {
           edit: {
             label: "Edit",
             action: "edit_personal_info",
             icon: "edit"
           },
           save: {
             label: "Save Changes",
             action: "save_personal_info",
             endpoint: "/api/settings/personal-info",
             method: "PUT",
             icon: "save"
           },
           cancel: {
             label: "Cancel",
             action: "cancel_edit",
             icon: "cancel"
           }
         },
         formValidation: {
           isValid: true,
           errors: []
         }
       },
       preferences: {
         timezone: {
           value: "UTC + 7",
           options: [
             { id: "1", name: "UTC -12", code: "UTC-12", offset: -12 },
             { id: "2", name: "UTC -11", code: "UTC-11", offset: -11 },
             { id: "3", name: "UTC -10", code: "UTC-10", offset: -10 },
             { id: "4", name: "UTC -9", code: "UTC-9", offset: -9 },
             { id: "5", name: "UTC -8", code: "UTC-8", offset: -8 },
             { id: "6", name: "UTC -7", code: "UTC-7", offset: -7 },
             { id: "7", name: "UTC -6", code: "UTC-6", offset: -6 },
             { id: "8", name: "UTC -5", code: "UTC-5", offset: -5 },
             { id: "9", name: "UTC -4", code: "UTC-4", offset: -4 },
             { id: "10", name: "UTC -3", code: "UTC-3", offset: -3 },
             { id: "11", name: "UTC -2", code: "UTC-2", offset: -2 },
             { id: "12", name: "UTC -1", code: "UTC-1", offset: -1 },
             { id: "13", name: "UTC +0", code: "UTC+0", offset: 0, isDefault: true },
             { id: "14", name: "UTC +1", code: "UTC+1", offset: 1 },
             { id: "15", name: "UTC +2", code: "UTC+2", offset: 2 },
             { id: "16", name: "UTC +3", code: "UTC+3", offset: 3 },
             { id: "17", name: "UTC +4", code: "UTC+4", offset: 4 },
             { id: "18", name: "UTC +5", code: "UTC+5", offset: 5 },
             { id: "19", name: "UTC +6", code: "UTC+6", offset: 6 },
             { id: "20", name: "UTC +7", code: "UTC+7", offset: 7 },
             { id: "21", name: "UTC +8", code: "UTC+8", offset: 8 },
             { id: "22", name: "UTC +9", code: "UTC+9", offset: 9 },
             { id: "23", name: "UTC +10", code: "UTC+10", offset: 10 },
             { id: "24", name: "UTC +11", code: "UTC+11", offset: 11 },
             { id: "25", name: "UTC +12", code: "UTC+12", offset: 12 }
           ],
           validation: { required: true, message: "Timezone is required" }
         },
         dateFormat: {
           value: "MM/DD/YYYY",
           options: [
             { id: "1", name: "MM/DD/YYYY", code: "MM_DD_YYYY", format: "MM/DD/YYYY", isDefault: true },
             { id: "2", name: "DD/MM/YYYY", code: "DD_MM_YYYY", format: "DD/MM/YYYY" },
             { id: "3", name: "YYYY-MM-DD", code: "YYYY_MM_DD", format: "YYYY-MM-DD" },
             { id: "4", name: "DD.MM.YYYY", code: "DD_MM_YYYY_DOTS", format: "DD.MM.YYYY" },
             { id: "5", name: "DD-MM-YYYY", code: "DD_MM_YYYY_DASHES", format: "DD-MM-YYYY" }
           ],
           validation: { required: true, message: "Date format is required" }
         },
         timeFormat: {
           value: "12-hour",
           options: [
             { id: "1", name: "12-hour (AM/PM)", code: "12_HOUR", format: "12-hour", isDefault: true },
             { id: "2", name: "24-hour", code: "24_HOUR", format: "24-hour" }
           ],
           validation: { required: true, message: "Time format is required" }
         },
         language: {
           value: "English",
           options: [
             { id: "1", name: "English", code: "EN", locale: "en-US", isDefault: true },
             { id: "2", name: "Spanish", code: "ES", locale: "es-ES" },
             { id: "3", name: "French", code: "FR", locale: "fr-FR" },
             { id: "4", name: "German", code: "DE", locale: "de-DE" },
             { id: "5", name: "Chinese", code: "ZH", locale: "zh-CN" },
             { id: "6", name: "Japanese", code: "JA", locale: "ja-JP" },
             { id: "7", name: "Arabic", code: "AR", locale: "ar-SA" },
             { id: "8", name: "Russian", code: "RU", locale: "ru-RU" }
           ],
           validation: { required: true, message: "Language is required" }
         },
         currency: {
           value: "USD",
           options: [
             { id: "1", name: "US Dollar (USD)", code: "USD", symbol: "$", isDefault: true },
             { id: "2", name: "Euro (EUR)", code: "EUR", symbol: "€" },
             { id: "3", name: "British Pound (GBP)", code: "GBP", symbol: "£" },
             { id: "4", name: "Japanese Yen (JPY)", code: "JPY", symbol: "¥" },
             { id: "5", name: "Canadian Dollar (CAD)", code: "CAD", symbol: "C$" },
             { id: "6", name: "Australian Dollar (AUD)", code: "AUD", symbol: "A$" },
             { id: "7", name: "Swiss Franc (CHF)", code: "CHF", symbol: "CHF" },
             { id: "8", name: "Chinese Yuan (CNY)", code: "CNY", symbol: "¥" }
           ],
           validation: { required: true, message: "Currency is required" }
         }
       },
       notificationSettings: {
         notificationChannels: [
           {
             id: "email",
             name: "Email Notifications",
             description: "Receive notifications via email",
             isEnabled: true,
             settings: {
               frequency: {
                 value: "immediate",
                 options: [
                   { id: "1", name: "Immediate", code: "IMMEDIATE", isDefault: true },
                   { id: "2", name: "Hourly", code: "HOURLY" },
                   { id: "3", name: "Daily", code: "DAILY" },
                   { id: "4", name: "Weekly", code: "WEEKLY" }
                 ]
               },
               types: [
                 { id: "1", name: "System Updates", isEnabled: true },
                 { id: "2", name: "Security Alerts", isEnabled: true },
                 { id: "3", name: "Nomination Updates", isEnabled: true },
                 { id: "4", name: "Schedule Changes", isEnabled: true },
                 { id: "5", name: "Message Notifications", isEnabled: false },
                 { id: "6", name: "Marketing Updates", isEnabled: false }
               ]
             }
           },
           {
             id: "sms",
             name: "SMS Notifications",
             description: "Receive notifications via SMS",
             isEnabled: false,
             settings: {
               frequency: {
                 value: "immediate",
                 options: [
                   { id: "1", name: "Immediate", code: "IMMEDIATE", isDefault: true },
                   { id: "2", name: "Hourly", code: "HOURLY" },
                   { id: "3", name: "Daily", code: "DAILY" }
                 ]
               },
               types: [
                 { id: "1", name: "Critical Alerts", isEnabled: false },
                 { id: "2", name: "Security Alerts", isEnabled: false },
                 { id: "3", name: "Emergency Updates", isEnabled: false }
               ]
             }
           },
           {
             id: "push",
             name: "Push Notifications",
             description: "Receive notifications in the browser",
             isEnabled: true,
             settings: {
               frequency: {
                 value: "immediate",
                 options: [
                   { id: "1", name: "Immediate", code: "IMMEDIATE", isDefault: true },
                   { id: "2", name: "Delayed", code: "DELAYED" }
                 ]
               },
               types: [
                 { id: "1", name: "System Updates", isEnabled: true },
                 { id: "2", name: "Security Alerts", isEnabled: true },
                 { id: "3", name: "Nomination Updates", isEnabled: true },
                 { id: "4", name: "Schedule Changes", isEnabled: true },
                 { id: "5", name: "Message Notifications", isEnabled: true }
               ]
             }
           }
         ],
         notificationPreferences: {
           quietHours: {
             isEnabled: false,
             startTime: "22:00",
             endTime: "08:00",
             timezone: "UTC + 7"
           },
           doNotDisturb: {
             isEnabled: false,
             startDate: "",
             endDate: "",
             reason: ""
           }
         }
       },
       securitySettings: {
         changePassword: {
           currentPassword: {
             value: "",
             placeholder: "Enter current password",
             validation: { required: true, message: "Current password is required" }
           },
           newPassword: {
             value: "",
             placeholder: "Enter new password",
             validation: { 
               required: true, 
               minLength: 8,
               pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
               message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
             }
           },
           confirmPassword: {
             value: "",
             placeholder: "Re-type new password",
             validation: { required: true, message: "Please confirm your new password" }
           }
         },
         twoFactorAuthentication: {
           isEnabled: false,
           method: "authenticator",
           methods: [
             { id: "1", name: "Authenticator App", code: "AUTHENTICATOR", isDefault: true },
             { id: "2", name: "SMS", code: "SMS" },
             { id: "3", name: "Email", code: "EMAIL" }
           ],
           backupCodes: [
             { code: "12345678", isUsed: false },
             { code: "87654321", isUsed: false },
             { code: "11223344", isUsed: false },
             { code: "44332211", isUsed: false },
             { code: "55667788", isUsed: false }
           ],
           qrCode: "/api/2fa/qr-code",
           setupInstructions: "Scan the QR code with your authenticator app"
         },
         sessionManagement: {
           activeSessions: [
             {
               id: "1",
               device: "Chrome on Windows 10",
               location: "Charlotte, NC, US",
               ipAddress: "192.168.1.100",
               lastActivity: "2025-08-25T10:00:00Z",
               isCurrent: true
             },
             {
               id: "2",
               device: "Safari on iPhone",
               location: "Charlotte, NC, US",
               ipAddress: "192.168.1.101",
               lastActivity: "2025-08-24T15:30:00Z",
               isCurrent: false
             }
           ],
           sessionTimeout: {
             value: "30",
             options: [
               { id: "1", name: "15 minutes", code: "15", minutes: 15 },
               { id: "2", name: "30 minutes", code: "30", minutes: 30, isDefault: true },
               { id: "3", name: "1 hour", code: "60", minutes: 60 },
               { id: "4", name: "4 hours", code: "240", minutes: 240 },
               { id: "5", name: "8 hours", code: "480", minutes: 480 },
               { id: "6", name: "Never", code: "0", minutes: 0 }
             ]
           }
         },
         privacySettings: {
           dataSharing: {
             analytics: { isEnabled: true, description: "Help improve the platform by sharing anonymous usage data" },
             marketing: { isEnabled: false, description: "Receive marketing communications and updates" },
             thirdParty: { isEnabled: false, description: "Allow third-party services to access your data" }
           },
           visibility: {
             profile: { value: "public", options: ["public", "private", "contacts"] },
             activity: { value: "private", options: ["public", "private", "contacts"] },
             contactInfo: { value: "contacts", options: ["public", "private", "contacts"] }
           }
         }
       },
       apiEndpoints: {
         getPersonalInfo: {
           url: "/api/settings/personal-info",
           method: "GET",
           headers: { "Content-Type": "application/json" }
         },
         updatePersonalInfo: {
           url: "/api/settings/personal-info",
           method: "PUT",
           headers: { "Content-Type": "application/json" }
         },
         getPreferences: {
           url: "/api/settings/preferences",
           method: "GET",
           headers: { "Content-Type": "application/json" }
         },
         updatePreferences: {
           url: "/api/settings/preferences",
           method: "PUT",
           headers: { "Content-Type": "application/json" }
         },
         getNotificationSettings: {
           url: "/api/settings/notifications",
           method: "GET",
           headers: { "Content-Type": "application/json" }
         },
         updateNotificationSettings: {
           url: "/api/settings/notifications",
           method: "PUT",
           headers: { "Content-Type": "application/json" }
         },
         changePassword: {
           url: "/api/settings/change-password",
           method: "POST",
           headers: { "Content-Type": "application/json" }
         },
         enable2FA: {
           url: "/api/settings/2fa/enable",
           method: "POST",
           headers: { "Content-Type": "application/json" }
         },
         disable2FA: {
           url: "/api/settings/2fa/disable",
           method: "POST",
           headers: { "Content-Type": "application/json" }
         },
         getActiveSessions: {
           url: "/api/settings/sessions",
           method: "GET",
           headers: { "Content-Type": "application/json" }
         },
         terminateSession: {
           url: "/api/settings/sessions/:id",
           method: "DELETE",
           headers: { "Content-Type": "application/json" }
         },
         getPrivacySettings: {
           url: "/api/settings/privacy",
           method: "GET",
           headers: { "Content-Type": "application/json" }
         },
         updatePrivacySettings: {
           url: "/api/settings/privacy",
           method: "PUT",
           headers: { "Content-Type": "application/json" }
         }
       },
       validationRules: {
         firstName: { required: true, minLength: 2, maxLength: 50, message: "First name must be between 2 and 50 characters" },
         lastName: { required: true, minLength: 2, maxLength: 50, message: "Last name must be between 2 and 50 characters" },
         emailAddress: { required: true, type: "email", message: "Please enter a valid email address" },
         phoneNumber: { required: true, pattern: "^[+]?[1-9]\\d{1,14}$", message: "Please enter a valid phone number" },
         companyName: { required: true, minLength: 2, maxLength: 100, message: "Company name must be between 2 and 100 characters" },
         newPassword: { 
           required: true, 
           minLength: 8, 
           pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
           message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
         },
         confirmPassword: { required: true, message: "Please confirm your new password" }
       },
       errorHandling: {
         apiErrors: [
           { code: "VALIDATION_ERROR", message: "Please check your input and try again", field: "", action: "show_validation_errors" },
           { code: "INVALID_CURRENT_PASSWORD", message: "Current password is incorrect", field: "currentPassword", action: "highlight_field" },
           { code: "PASSWORD_MISMATCH", message: "New passwords do not match", field: "confirmPassword", action: "highlight_field" },
           { code: "WEAK_PASSWORD", message: "Password does not meet security requirements", field: "newPassword", action: "show_password_requirements" },
           { code: "2FA_ALREADY_ENABLED", message: "Two-factor authentication is already enabled", field: "", action: "show_info_message" },
           { code: "2FA_NOT_ENABLED", message: "Two-factor authentication is not enabled", field: "", action: "show_info_message" }
         ],
         validationErrors: [],
         networkErrors: [
           { code: "NETWORK_ERROR", message: "Network error. Please check your connection and try again", retryAction: "retry_request" },
           { code: "TIMEOUT_ERROR", message: "Request timeout. Please try again", retryAction: "retry_request" }
         ]
       },
       loadingStates: {
         isPersonalInfoLoading: false,
         isPersonalInfoSaving: false,
         isPreferencesLoading: false,
         isPreferencesSaving: false,
         isNotificationSettingsLoading: false,
         isNotificationSettingsSaving: false,
         isPasswordChanging: false,
         is2FALoading: false,
         is2FAEnabling: false,
         is2FADisabling: false,
         isSessionsLoading: false,
         isPrivacySettingsLoading: false,
         isPrivacySettingsSaving: false
       },
       successMessages: {
         personalInfoUpdated: "Personal information updated successfully!",
         preferencesUpdated: "Preferences updated successfully!",
         notificationSettingsUpdated: "Notification settings updated successfully!",
         passwordChanged: "Password changed successfully!",
         twoFactorEnabled: "Two-factor authentication enabled successfully!",
         twoFactorDisabled: "Two-factor authentication disabled successfully!",
         sessionTerminated: "Session terminated successfully!",
         privacySettingsUpdated: "Privacy settings updated successfully!"
       }
     }
  };
 
  // Export default for backward compatibility
  export default userData;