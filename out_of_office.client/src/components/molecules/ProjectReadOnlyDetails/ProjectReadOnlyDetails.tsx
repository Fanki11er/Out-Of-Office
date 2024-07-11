import { ProjectDTO } from "../../../types/outOffOffice";
import {
  StyledRequestDetails,
  StyledRequestDetailsComment,
} from "../../atoms/StyledRequestDetails/StyledRequestDetails.styles";

type Props = {
  project: ProjectDTO | null;
};

const ProjectReadOnlyDetails = ({ project }: Props) => {
  return project ? (
    <StyledRequestDetails>
      <h2>Project</h2>
      <h3>
        {`Id: 
            ${project.id}`}
      </h3>
      <span>
        <b>Project type: </b>
        {project.projectType}
      </span>
      <span>
        <b>Project manager: </b>
        {project.projectManager}
      </span>
      <span>
        <b>Start date: </b>
        {project.startDate}
      </span>
      <span>
        <b>End date: </b>
        {project.endDate}
      </span>
      <span>
        <b>Status: </b>
        {project.status}
      </span>
      {project.comment && (
        <StyledRequestDetailsComment>
          {project.comment}
        </StyledRequestDetailsComment>
      )}
    </StyledRequestDetails>
  ) : (
    <span>No data</span>
  );
};

export default ProjectReadOnlyDetails;
