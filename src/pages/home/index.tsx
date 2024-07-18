import {
  Button, IconButton,
} from "@chakra-ui/react";
import Spinner from "../../components/Spinner-loader.tsx";
import {useQuery} from "../../store/api.tsx";
import {useEffect, useState} from "react";
import {useStore} from "../../store";
import VmDetailsBottomSheet from "./VmDetailsBottomSheet.tsx";
import {BiPlus} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import useApi from "../../store/useApi.ts";
// import {DataGrid, GridColDef} from "@mui/x-data-grid";
// import {ThemeProvider} from "@mui/material";
// import {muiTheme} from "../../theme.ts";
import {AiOutlineReload} from "react-icons/ai";
import DeleteVmModal from "../../components/modals/delete-vm-modal.tsx";
// import DisplayVmStatus from "./display-vm-status.tsx";
// import DisplayServices from "./display-services.tsx";
// import ActionsMenu from "./actions-menu.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";

export default function ListVms() {
  const {project_slug} = useQuery();
  const {allVms, setAllVms, currOrg, currVm} = useStore();
  const navigate = useNavigate();
  const {getVms} = useApi();
  const [deleteVmSlug, setDeleteVmSlug] = useState<null | string>(null);

  // const tableColumns: GridColDef[] = [
  //   {field: "displayName", headerName: "Name", width: 200, flex: 1},
  //   {field: "cpu", headerName: "CPU", width: 120, flex: 1},
  //   {field: "ram", headerName: "RAM", width: 120, flex: 1},
  //   {field: "storage", headerName: "Storage", width: 120, flex: 1},
  //   {field: "distro", headerName: "Distribution", width: 120, flex: 1},
  //   {
  //     field: "state",
  //     flex: 1,
  //     headerName: "State",
  //     renderCell: params => <DisplayVmStatus status={params.row.state}/>
  //   },
  //   {
  //     field: "services",
  //     // flex: 1,
  //     headerName: "Services",
  //     width: 300,
  //     renderCell: params => <DisplayServices vm={params.row}/>
  //   },
  //   {
  //     field: "actions",
  //     flex: 1,
  //     headerName: "Actions",
  //     renderCell: params => <ActionsMenu deleteVm={() => setDeleteVmSlug(params.row.slug)} vm={params.row}/>
  //   }
  // ];

  useEffect(() => {
    getVms().then(vms => setAllVms(vms));
  }, [project_slug, currOrg]);

  function refreshVmList() {
    getVms().then(vms => setAllVms(vms));
  }

  if (!allVms) return <Spinner/>;

  return (
    <PanelGroup direction="vertical">
      <Panel maxSize={100}>
        <div className="px-4 relative">
          <div className="flex items-center justify-end gap-x-4 mb-4 w-full">
            <Button leftIcon={<BiPlus/>} onClick={() => navigate("/create-vm")} colorScheme="brand"
                    variant="outline">Create VM</Button>
            <IconButton variant="outline" colorScheme="brand" onClick={refreshVmList} aria-label="reload">
              <AiOutlineReload/>
            </IconButton>
          </div>
          {/* <ThemeProvider theme={muiTheme}>
            <DataGrid
              className="bg-white"
              getRowId={row => row.uid}
              rows={allVms}
              columns={tableColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
                sorting: {
                  sortModel: [{field: "displayName", sort: "asc"}]
                }
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(ids) => {
                const lastSelectedRowId = ids[ids.length - 1];
                const lastSelectedRow = allVms?.filter(v => v.uid === lastSelectedRowId);
                console.log(lastSelectedRow[0]);
                setCurrVm(lastSelectedRow[0] ?? null);
              }}
            />
          </ThemeProvider> */}
        </div>
      </Panel>
      {currVm && (
        <>
          <PanelResizeHandle className="bg-slate-300 pt-1 border-b border-slate-400"/>
          <Panel maxSize={75}>
            <VmDetailsBottomSheet/>
          </Panel>
        </>
      )}
      {deleteVmSlug && <DeleteVmModal onClose={() => setDeleteVmSlug(null)} vm_slug={deleteVmSlug} />}
    </PanelGroup>
  );
}