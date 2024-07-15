import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectsSelected from "./components/NoProjectsSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState, // we dont want to lose the old state which is the all projects
        selectedProjectId: null,
      };
    });
  }
  /*
  selectedProjectId === null ==> adding a new Project 
  && selectedProjectId === undefined ==> NoProjectSelected
*/

  function handleAddProject(ProjectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...ProjectData,
        id: Math.random(),
      };
      return {
        ...prevState, // we dont want to lose selectedProjectId
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectsSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
