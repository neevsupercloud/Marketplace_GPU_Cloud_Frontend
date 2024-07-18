import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {Button} from "@chakra-ui/react";
import {BiPlus} from "react-icons/bi";
import {ThemeProvider} from "@mui/material";
import {muiTheme} from "../../../theme.ts";
import {useNavigate} from "react-router-dom";
import {useStore} from "../../../store";
import {useEffect} from "react";
import useApi from "../../../store/useApi.ts";
import {useQuery} from "../../../store/api.tsx";
import ModelsBottomSheet from "./models-bottom-sheet.tsx";

export default function ViewDeployments() {
  const {allModels, setAllModels, currOrg, currModel, setCurrModel} = useStore();
  const navigate = useNavigate();
  const {getModels} = useApi();
  const {project_slug} = useQuery();

  const tableColumns: GridColDef[] = [
    {field: "modelID", headerName: "Model", flex: 1},
    {field: "cpu", headerName: "CPU", flex: 1},
    {field: "memory", headerName: "Memory", flex: 1},
    {field: "gpu", headerName: "GPU", flex: 1},
    {field: "storage", headerName: "Storage", flex: 1},
  ];

  useEffect(() => {
    getModels().then(m => setAllModels(m));
  }, [project_slug, currOrg]);

  if (!allModels) return <p>loading...</p>

  return (
    <PanelGroup direction="vertical">
      <Panel maxSize={100}>
        <div className="px-4 relative">
          <div className="flex items-center justify-end gap-x-4 mb-4 w-full">
            <Button leftIcon={<BiPlus/>} onClick={() => navigate("/ai-platform/deploy")} colorScheme="brand"
                    variant="outline">Deploy Model</Button>
          </div>
          <ThemeProvider theme={muiTheme}>
            <DataGrid
              className="bg-white"
              getRowId={row => row.url}
              rows={allModels}
              columns={tableColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
                sorting: {
                  sortModel: [{field: "name", sort: "asc"}]
                }
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(ids) => {
                const lastSelectedRowId = ids[ids.length - 1];
                const lastSelectedRow = allModels?.filter(m => m.url === lastSelectedRowId);
                console.log(lastSelectedRow[0]);
                setCurrModel(lastSelectedRow[0] ?? null);
              }}
            />
          </ThemeProvider>
        </div>
      </Panel>
      {currModel && (
        <>
          <PanelResizeHandle className="bg-slate-300 pt-1 border-b border-slate-400"/>
          <Panel maxSize={75}>
            <ModelsBottomSheet/>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}