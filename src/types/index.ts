export type TGpu = {
  planName: string;
  os: string;
  vCpuCount: number;
  ramInGb: number;
  storageInGb: number;
  monthlyPriceINR: number;
  hourlyPriceINR: number;
  gpu: string;
  gpuCount: number;
  gpuEnabled: boolean;
}

export type VmResponseType = {
  items: VM_T[];
}

export type LoginResponseType = {
  org: { slug: string };
  user: { username: string };
}

export type CreateVmPayload = {
  displayName: string;
  distro: string;
  storage: string;
  cpu: string;
  ram: string; 
  gpu: string;
 
}

export type Volume = {
  id: string;
  name: string;
  type: string;
  size: string;
  location: string;
  block_size: number;
  created_at: string;
  updated_at: string;
  serial_number: string;
  attached_to: string[];
  metadata: {
    name: string;
    uid: string;
  };
  status: {
    capacity: {
      storage: string;
    };
  };
};



export type VM_T = {
  id: string;
  project_id: string;
  type: string;
  state: "STATE_RUNNING" | "STATE_SHUTOFF" | "IN_PROGRESS";
  ssh_destination: string;
  created_at: string;
  updated_at: string;
  name: string;
  location: string;
  commitment_period: number;
  commitment_end: string;
  disks: {
    id: string;
    name: string;
    type: string;
    size: string;
    location: string;
    block_size: number;
    created_at: string;
    updated_at: string;
    serial_number: string;
    attachment_type: string;
    mode: string;
  }[];
  network_interfaces: {
    id: string;
    name: string;
    network: string;
    subnet: string;
    interface_type: string;
    mac_address: string;
    ips: {
      private_ipv4: {
        address: string;
      };
      public_ipv4: {
        address: string;
        id: string;
        type: string;
      };
    }[];
  }[];
  host_channel_adapters: any[];
  virtualization_features: {
    nested_virtualization: boolean;
  };
  instance_template_id: string;
  instance_group_id: string;
  reservation_id: string;
  services?: {
    jupyter?: string;
    ssh?: string;
  };
  actions?: {
    start?: boolean;
    stop?: boolean;
    terminate?: boolean;
  };
  GPU?: string[];
};



export type VM = {
  name: string,
  distro: string
  state: "stopped" | "started",
  ram: string
  cpu: string
  storage: string
  exposedPorts: number[]
  labels?: Record<string, string>[],
}

export type SshKey = {
  name: string;
  key: string;
  projectID: number;
  userID: number;
  keyID: number;
  createdAt: string;
}

export type Secrets = {
  [key: string]: string;
}

export type GetSshKeysResponse = {
  keys: SshKey[];
  status: string;
}
export type CreateVolumePayload = {
  name: string;
  size: string;
}


export type GetVolumesResponse = { status: string, volumes: null | Volume[] }
export type CreateVolumeResponse = { status: string, volume: null | Volume }
export type GetSecretsResponse = { secrets: Secrets, status: string };
export type CreateSecretsResponse = { message: string, status: string };
export type StringMap = { [key: string]: string };

export type Model = {
  url: string,
  deploymentFqdn: string,
  "ingressFqdn": string,
  "modelID": string,
  "cpu": string,
  "memory": string,
  "gpu": string,
  "storage": string,
  "secrets": string,
  "config": string
}