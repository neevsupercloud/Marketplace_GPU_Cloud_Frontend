import create from "zustand";
import { Model, Secrets, SshKey, VM_T, Volume } from "../types";
import { KEY, OsOptions } from "../data.ts";
import { ReactNode } from "react";

export type TBasicAuth = {
  username: string;
  password: string;
};

export type ProjectType = {
  displayName: string;
  slug: string;
};

export type CustomCardProps = {
  planName: string;
  os: string;
  vCpuCount: number;
  ramInGb: number;
  storageInGb: number;
  monthlyPriceINR: number;
  hourlyPriceINR: number;
  enabled: boolean;
  gpuEnabled: boolean;
  gpu: string;
  gpuCount: number;
};

type State = {
  selectedGpu: CustomCardProps | null;
  gpuName: string;
  auth: string | null;
  loading: boolean;
  error: ReactNode;
  secrets: Secrets | null;
  allVms: VM_T[] | null;
  allModels: Model[] | null;
  volumes: Volume[] | null;
  currVm: VM_T | null;
  currModel: Model | null;
  currProject: ProjectType | null;
  currOrg: string | null;
  projectList: ProjectType[];
  sshKeys: SshKey[] | null;
  vmCount: number;
  totalCpu: number;
  totalStorage: number;
  totalRam: number;
  newVm: {
    name: string;
    distro: string;
    exposedPorts: number[];
    storage: number;
    numCpu: number;
    ram: number;
    volumes?: string[];
  };
  image: string;
  ssh_pub_key: string | null;
  InstanceName: string | null;
  operation_id: string | null; // Add operation_id state
};

type Actions = {
  setSelectedGpu: (gpu: CustomCardProps) => void;
  setGpuName: (name: string) => void;
  setAuth: (auth: string | null) => void;
  setCurrVm: (vm: VM_T | null) => void;
  setCurrModel: (m: Model | null) => void;
  setLoading: (s: boolean) => void;
  setError: (e: ReactNode) => void;
  setAllVms: (vms: VM_T[]) => void;
  setAllModels: (models: Model[]) => void;
  setVolumes: (v: Volume[]) => void;
  setSecrets: (s: Secrets) => void;
  setCurrProject: (p: ProjectType | null) => void;
  setCurrOrg: (o: string | null) => void;
  setProjectList: (p: ProjectType[]) => void;
  updateNewVm: (r: Record<string, string | string[] | number | number[]>) => void;
  // replaceVm: (vm: VM_T) => void;
  setSshKeys: (keys: SshKey[]) => void;
  setVmCount: (count: number) => void;
  setTotalCpu: (cpu: number) => void;
  setTotalStorage: (storage: number) => void;
  setTotalRam: (ram: number) => void;
  setImage: (img: string) => void;
  setSshPubKey: (key: string | null) => void;
  setInstanceName: (name: string | null) => void;
  setOperationId: (operation_id: string | null) => void; // Add setOperationId action
};

export const useStore = create<State & Actions>((set) => ({
  selectedGpu: null,
  gpuName: "",
  auth: null,
  volumes: null,
  allVms: null,
  allModels: null,
  currVm: null,
  currModel: null,
  sshKeys: null,
  secrets: null,
  newVm: {
    name: "",
    distro: OsOptions[0],
    exposedPorts: [],
    storage: 20,
    numCpu: 40,
    ram: 10,
  },
  loading: false,
  error: null,
  currProject: null,
  currOrg: null,
  projectList: [],
  vmCount: 0,
  totalCpu: 0,
  totalStorage: 0,
  totalRam: 0,
  image: "",
  ssh_pub_key: null,
  InstanceName: null,
  operation_id: null, // Initialize operation_id state
  setLoading: (s) => set(() => ({ loading: s })),
  setCurrOrg: (o) => set(() => ({ currOrg: o })),
  setCurrVm: (vm) => set(() => ({ currVm: vm })),
  setCurrModel: (m) => set(() => ({ currModel: m })),
  setProjectList: (p) => set(() => ({ projectList: p })),
  setCurrProject: (p) => set(() => ({ currProject: p })),
  setError: (e) => set(() => ({ error: e })),
  setAllVms: (vms) => set(() => ({ allVms: vms, vmCount: vms.length })),
  setAllModels: (models) => set(() => ({ allModels: models })),
  setVolumes: (v) => set(() => ({ volumes: v })),
  setSelectedGpu: (gpu) => set(() => ({ selectedGpu: gpu })),
  setGpuName: (name) => set(() => ({ gpuName: name })),
  setAuth: (a) => set(() => ({ auth: a })),
  // replaceVm: (vm) =>
  //   set((state) => {
  //     const { allVms } = state;
  //     if (!allVms) return { allVms: [] };
  //     const updated = allVms.map((v) => (v.slug === vm.slug ? vm : v));
  //     return { allVms: updated, vmCount: updated.length };
  //   }),
  updateNewVm: (r) => set((state) => ({ newVm: { ...state.newVm, ...r } })),
  setSshKeys: (ks) => set(() => ({ sshKeys: ks })),
  setSecrets: (s) => set(() => ({ secrets: s })),
  setVmCount: (count) => set(() => ({ vmCount: count })),
  setTotalCpu: (cpu) => set(() => ({ totalCpu: cpu })),
  setTotalStorage: (storage) => set(() => ({ totalStorage: storage })),
  setTotalRam: (ram) => set(() => ({ totalRam: ram })),
  setImage: (img) => set(() => ({ image: img })),
  setSshPubKey: (key) => set(() => ({ ssh_pub_key: key })),
  setInstanceName: (name) => set(() => ({ InstanceName: name })),
  setOperationId: (operation_id) => set(() => ({ operation_id })), // Implement setOperationId action
}));

export function getAuthFromLocalStorage(): (TBasicAuth & { org: string }) | null {
  const nc = localStorage.getItem(KEY);
  if (!nc) return null;
  const { username, password, org } = JSON.parse(nc);
  if (!username || !password || !org) return null;
  return { username, password, org };
}
