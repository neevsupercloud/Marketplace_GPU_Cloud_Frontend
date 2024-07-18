export const VM_STATES = {
  RUNNING: "Running",
  STOPPED: "Stopped",
  STOPPING: "Stopping",
  STARTING: "Starting",
  PROVISIONING: "Provisioning",
  ERRORUNSCHEDULABLE: "ErrorUnschedulable" // Adjusted for consistency
} as const; // This makes the values readonly and keeps their literal types


export const STATUS_COLOR = new Map<string, string>();
STATUS_COLOR.set(VM_STATES.RUNNING, "text-green-500");
STATUS_COLOR.set(VM_STATES.STOPPED, "text-red-400");
STATUS_COLOR.set(VM_STATES.STOPPING, "text-yellow-400 dots");
STATUS_COLOR.set(VM_STATES.PROVISIONING, "text-blue-400 dots");
STATUS_COLOR.set(VM_STATES.STARTING, "text-blue-400 dots");
STATUS_COLOR.set(VM_STATES.ERRORUNSCHEDULABLE, "text-red-500"); // Adding color for ErrorUnschedulable state


// export const grafanaBaseUrl = import.meta.env.GRAFANA_BASE_URL
export const grafanaBaseUrl = "https://grafana.neev.work/d-solo/HV_1uZwWk/kubevirt-vm-info"
export const orgId = 1;
export const dataSource = 'prometheus';
export const theme = 'light';