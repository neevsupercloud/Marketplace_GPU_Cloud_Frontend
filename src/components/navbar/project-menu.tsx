import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { FaDiagramProject } from "react-icons/fa6";
import { ProjectType, useStore } from "../../store";
import { ENDPOINTS, useQuery } from "../../store/api.tsx";
import { useEffect } from "react";
// import { AxiosRequestConfig } from 'axios';

export default function ProjectMenu() {
  // const { _get, _delete } = useQuery();
  const { _get } = useQuery();
  const { auth, currProject, setCurrProject, setProjectList, projectList, currOrg } = useStore();

  useEffect(() => {
    if (!currOrg) return console.log("NO ORG FOUND");

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };
  
    _get<{ projects: ProjectType[] }>(ENDPOINTS.getProjects(currOrg), headers)
      .then(resp => {
        console.log(currOrg);
        if (!resp || !resp.projects) return console.log(resp);
        const { projects } = resp;
        setProjectList(projects);
        if (projects.length > 0) {
          setCurrProject(projects[projects.length - 1]);
        } else {
          setCurrProject({ slug: 'default-project', displayName: 'Default Project' });
        }
        console.log(projects);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, [auth, currOrg, setCurrProject, setProjectList]);
  

  // const handleDeleteProject = (projectId: string) => {
  //   if (!currOrg) {
  //     console.error("Current organization is not set");
  //     return;
  //   }

  //   const headers: AxiosRequestConfig['headers'] = {
  //     'Accept': 'application/json',
  //     'Authorization': `Bearer ${auth}`, // Pass the access token in the header
  //     'Content-Type': 'application/json',
  //   };

  //   _delete(ENDPOINTS.deleteProject(currOrg, projectId), { headers })
  //     .then(() => {
  //       // Remove the deleted project from the projectList
  //       const updatedProjectList = projectList.filter(project => project.slug !== projectId);
  //       setProjectList(updatedProjectList);
  //       if (updatedProjectList.length > 0) {
  //         setCurrProject(updatedProjectList[updatedProjectList.length - 1]);
  //       } else {
  //         setCurrProject({ slug: 'default-project', displayName: 'Default Project' });
  //       }
  //       console.log("Project deleted successfully");
  //     })
  //     .catch(err => {
  //       console.error("Error deleting project:", err);
  //     });
  // };

  // If no current project is set, show a loading spinner
  // if (!currProject) return <Spinner />;

  return (
    <Menu>
      <MenuButton
        as={Button}
        color="#673ab7"
        fontWeight={"600"}
        rightIcon={<BiChevronDown />}
      >
        <div className="flex items-center gap-x-2">
          <FaDiagramProject />
          <p className="project-menu">{currProject?.displayName || 'Loading...'}</p>
        </div>
      </MenuButton>
      <MenuList>
        {projectList.length > 0 ? (
          projectList.map(p => (
            <MenuItem key={p.slug} onClick={() => setCurrProject(p)}>
              <div className="flex items-center justify-between w-full gap-x-4">
                <div className="flex flex-col w-full">
                  <p>{p.displayName}</p>
                  <p className="text-gray-400 text-sm">{p.slug}</p>
                </div>
                {/* <Button onClick={(e) => {
                  e.stopPropagation(); // Prevent the menu item click event from triggering
                  handleDeleteProject(p.slug);
                }}>Delete</Button> */}
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <div className="flex items-center justify-between w-full gap-x-4">
              <div className="flex flex-col w-full">
                <p>Default Project</p>
                <p className="text-gray-400 text-sm">default-project</p>
              </div>
            </div>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}