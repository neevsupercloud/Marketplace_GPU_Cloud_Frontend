import {BiSolidHome } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import faq from "../src/asset/icons8-faq-30.png"
// import { FaKey } from "react-icons/fa";
import key from "../src/asset/icons8-key-48.png"
import { SlDocs } from "react-icons/sl";
import { AiFillTag } from "react-icons/ai";
import { VM } from "./types";
// import {centos, fedora, pytorch, rhcos, ubuntu} from "./images.ts";
import { pytorch, ubuntu } from "./images.ts";
// import { BsFiletypeKey } from "react-icons/bs";
import FileSaver from 'file-saver';
import storage from  "../src/asset/storage_black.png"
import blackThemeServer from "../src/asset/black-theme-server.png";
// import blck_user from '../src/asset/black_user.png'
import billing from "../src/asset/black_dollar.png"
import './index.css'
// import feedback from "../src/asset/icons8-survey-48.png"
import infro_black from "../src/asset/icons8-info-24.png"
// import docs from  "../src/asset/icons8-docs-30.png"
import contact from "../src/asset/icons8-contact-us-24.png"

export interface StringMapType {
  [key: string]: string;
}

export const KEY = "__neevcloud";

export function downloadTextAsFile(text: string, filenameWithExt: string) {
  const blob = new Blob([text], { type: "text/text;charset=utf-8" });
  FileSaver.saveAs(blob, filenameWithExt);
}

export function copyTextToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(err => {
      alert(err);
      return false;
    });
}

const phaseColorMapping = {
  Bound: "primary",
  Pending: "warning"
}

export function getVolumePhaseColor(phase: string) {
  return (phaseColorMapping[phase as keyof typeof phaseColorMapping] ?? "default") as "error" | "default" | "primary" | "warning" | "secondary" | "info" | "success";
}

export const VM_STATES = {
  RUNNING: "Running",
  STOPPED: "Stopped",
  STOPPING: "Stopping",
  STARTING: "Starting",
  PROVISIONING: "Provisioning"
};

export const STATUS_COLOR = new Map();
STATUS_COLOR.set(VM_STATES.RUNNING, "text-green-500");
STATUS_COLOR.set(VM_STATES.STOPPED, "text-red-400");
STATUS_COLOR.set(VM_STATES.STOPPING, "text-yellow-400 dots");
STATUS_COLOR.set(VM_STATES.PROVISIONING, "text-blue-400 dots");
STATUS_COLOR.set(VM_STATES.STARTING, "text-blue-400 dots");

export const formatRoute: StringMapType = {
  // "/": "VM Instances",
  "/ai-platform": "AI Platform",
  "/ai-platform/deploy": "AI Platform",
  "/ai-platform/view-deployments": "AI Platform",
  "/create-vm": "Create VM",
  "/create-vm/configure": "Configuration",
  "/create-vm/summary": "Summary",
  "/manage/storage": "Manage Storage",
  // "/manage/storage/volumes": "Manage Volumes",
  "/manage/ssh-keys": "Manage SSH Keys",
  "/manage/secrets": "Manage Secrets",
  // "/gpu-compute": "Create GPU instance"
};

export const iconMap: StringMapType = {
  "ubuntu-jupyter": ubuntu,
  // "fedora:39": fedora,
  // "centos:7-2009": centos,
  // "rhcos:4.12": rhcos,
  "ubuntu-pytorch": pytorch
};

export function getIcon(distro: string) {
  // for (const key in iconMap) {
  //   if (key.includes(distro) || distro.includes(key)) return iconMap[key];
  // }
  // return generic;
  return iconMap[distro];
}

export function format(arr: number[]) {
  let s = "";
  for (const num of arr) {
    s = s + num + ", ";
  }
  const final = s.substring(0, s.length - 2);
  return final === "" ? "none" : final;
}

export const OsOptions = [
  "ubuntu-jupyter",
  // "fedora:39",
  // "centos:7-2009",
  // "rhcos:4.12",
  "ubuntu-pytorch"
];

export const randomName = () => Math.random().toString(36).substring(2);

// const LEN = 10

export const vms: VM[] = [
  {
    name: Math.random().toString(36).substring(2),
    cpu: "256GB",
    ram: "64GB",
    storage: "512GB",
    distro: "ubuntu",
    state: "started",
    exposedPorts: [8080, 3000]
  }, {
    name: Math.random().toString(36).substring(2),
    cpu: "256GB",
    ram: "64GB",
    storage: "512GB",
    distro: "pytorch",
    state: "started",
    exposedPorts: [8080, 3000]
  }, {
    name: Math.random().toString(36).substring(2),
    cpu: "256GB",
    ram: "64GB",
    storage: "512GB",
    distro: "ubuntu",
    state: "started",
    exposedPorts: [8080, 3000]
  }, {
    name: Math.random().toString(36).substring(2),
    cpu: "256GB",
    ram: "64GB",
    storage: "512GB",
    distro: "pytorch",
    state: "started",
    exposedPorts: [8080, 3000]
  }, {
    name: Math.random().toString(36).substring(2),
    cpu: "256GB",
    ram: "64GB",
    storage: "512GB",
    distro: "ubuntu",
    state: "started",
    exposedPorts: [8080, 3000]
  }, {
    name: Math.random().toString(36).substring(2),
    cpu: "256GB",
    ram: "64GB",
    storage: "512GB",
    distro: "ubuntu",
    state: "started",
    exposedPorts: [8080, 3000]
  },
];

export const home = {
  topCards: [
    {
      title: "Docs",
      icon: SlDocs,
      desc: "General docs and API spec"
    },
    {
      title: "Pricing",
      icon: AiFillTag,
      desc: "Details about pricing / storage"
    },
    {
      title: "Earn credits",
      icon: CgDollar,
      desc: "Earn $500 per referral"
    },
  ]
};

export const sidenav = {
  main: [
    {
      label: "Dashboard",
      name: "home",
      icon: BiSolidHome,
      link: "/"
    },
    /* {
      label: "Virtual Machines",
      name: "create-vm",
      icon: BiShield,
      link: "/create-vm"
    }, */
    // {
    //   label: "Machine Images",
    //   name: "templates",
    //   icon: BiCopy,
    //   link: "/templates"
    // },
    /* {
      label: "AI Platform",
      name: "ai-platform",
      icon: GiBrain,
      link: "/ai-platform",
      subLinks: [
        {
          label: "Deploy",
          name: "ai-platform-deploy",
          icon: BsPlus,
          link: "/ai-platform/deploy",
        },
        {
          label: "View deployments",
          name: "ai-platform-view-deployments",
          icon: GiBrain,
          link: "/ai-platform/view-deployments",
        },
      ]
    }, */
    // {
    //   label: "Serverless Inferencing",
    //   name: "serverless-inferencing",
    //   icon: GiPlatform,
    //   link: "/serverless-inferencing"
    // },
  ],
  manage: [
    // {
    //   label: "VMs",
    //   name: "vms",
    //   icon: BiDesktop,
    //   link: "/vms"
    // },

    {
      label: "Compute",
      name: "gpu-compute",
      icon: blackThemeServer,
      link: "/gpu-compute/gpu-dashboard",
      /* subLinks: [
        {
          label: "GPU Dashboard",
          name: "gpu-dashboard",
          icon: BsHdd,
          link: "/gpu-compute/gpu-dashboard"
        },
        {
          label: "Create GPU",
          name: "create-gpu-instance",
          icon: BsHdd,
          link: "/gpu-compute/create-gpu-instance"
        },
      ] */
    },
    // {
    //   label: "AI Models",
    //   name: "serverless",
    //   icon: PiPlugsConnectedLight,
    //   link: "/serverless/serverless-dashboard",
      /* subLinks: [
        {
          label: "Deploy Model",
          name: "deploy-modal",
          icon: BsHdd,
          link: "/serverless/deploy-model"
        },
        {
          label: "Dashboard",
          name: "serverless-dashboard",
          icon: BsHdd,
          link: "/serverless/serverless-dashboard"
        },
      ] */
    // },
    {
      label: "Volumes",
      name: "storage",
      icon: storage,
      link: "/manage/volumes",
     
    },
    {
      label: "SSH Keys",
      name: "ssh-keys",
      icon: key,
      link: "/manage/ssh-keys",
    },
    // {
    //   label: "Secrets",
    //   name: "secrets",
    //   icon: BsFiletypeKey,
    //   link: "/manage/secrets",
    // },
    
    {
      label: "Billing ",
      name: "billing",
      icon: billing,
      link: "/billing"
    }
    /* {
      label: "Settings",
      name: "settings",
      icon: FcSettings,
      link: "/settings",
      subLinks: [
        {
          label: "SSH Keys",
          name: "ssh-keys",
          icon: FaKey,
          link: "/manage/ssh-keys",
        },
        {
          label: "Secrets",
          name: "secrets",
          icon: BsFiletypeKey,
          link: "/manage/secrets",
        },
        // {
        //   label: "Team",
        //   name: "team",
        //   icon: CgOrganisation,
        //   link: "/team"
        // },
      ]
    }, */
  ],
  help: [
    {
      label: "Contact Us",
      name: "Contact",
      icon: contact,
      link: "/contact"
    },
  
    {
      label: "Support",
      name: "Support",
      icon: infro_black,
      link: "/support"
    },
    // {
    //   label: "Docs",
    //   name: "Docs",
    //   icon: docs,
    //   link: "/docs"
    // },
  
    // {
    //   label: "Contact",
    //   name: "contact",
    //   icon: blck_user,
    //   link: "/contact"
    // },
    {
      label: "FAQ",
      name: "faq",
      icon: faq,
      link: "/faq"
    },
  ]
};
