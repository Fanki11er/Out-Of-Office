import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { CombinedValue, LeaveRequestDTO } from "../../../types/outOffOffice";
import {
  employeeLeaveRequestsListEndpoint,
  getOptionsFromApi,
} from "../../../api/apiEndpoints";
import { Formik, FormikHelpers } from "formik";
import { LEAVE_REQUESTS_EMPLOYEE_KEY } from "../../../api/QueryKeys";
import { StyledLeaveRequestForm } from "./LeaveRequestForm.styles";
import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
import { StyledSuccessStatus } from "../RegisterEmployeeForm/RegisterEmployeeForm.styles";
import { getErrorMessages } from "../../../Utilities/utilities";
import RequestStatusSelectInput from "../../molecules/RequestStatusSelectInput/RequestStatusSelectInput";
import TextareaField from "../../molecules/TextAreaField/TextAreaField";
import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import DateFormField from "../../molecules/DateFormField/DateFormField";
import * as Yup from "yup";

const ABSENCE_REASONS_OPTIONS = "absenceReasons";
type NewLeaveRequestDTO = {
  AbsenceReason: number;
  StartDate: string;
  EndDate: string;
  Comment?: string;
};
type EditLeaveRequestDTO = NewLeaveRequestDTO & {
  LeaveREquestId: number;
};

const ABSENCE_REASON_FIELD_NAME = "absenceReason";
const START_DATE_FIELD_NAME = "startDate";
const END_DATE_FIELD_NAME = "endDate";
const COMMENT_FIELD_NAME = "comment";

type LeaveRequestFormValues = {
  [ABSENCE_REASON_FIELD_NAME]: number;
  [START_DATE_FIELD_NAME]: string;
  [END_DATE_FIELD_NAME]: string;
  [COMMENT_FIELD_NAME]: string;
};

type Props = {
  formType: "Edit" | "New";
  leaveRequest?: LeaveRequestDTO;
};

export const leaveRequestSchema = Yup.object().shape({
  [ABSENCE_REASON_FIELD_NAME]: Yup.number().min(0, "Field is required"),
  [START_DATE_FIELD_NAME]: Yup.date().min(new Date()),
  [END_DATE_FIELD_NAME]: Yup.date().when(
    [START_DATE_FIELD_NAME],
    (startDate, schema) => startDate && schema.min(startDate)
  ),
});

const LeaveRequestForm = ({ formType, leaveRequest }: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const getOptions = async () => {
    const response = await axiosPrivate.get(
      getOptionsFromApi(ABSENCE_REASONS_OPTIONS)
    );
    return response.data;
  };

  const { data } = useQuery<CombinedValue[]>({
    queryKey: [ABSENCE_REASONS_OPTIONS],
    queryFn: getOptions,
    staleTime: 60000,
  });

  const createNewLeaveRequestMutationFunction = (
    values: NewLeaveRequestDTO
  ) => {
    return axiosPrivate.post(employeeLeaveRequestsListEndpoint, values, {
      withCredentials: true,
    });
  };

  const editLeaveRequestMutationFunction = (values: EditLeaveRequestDTO) => {
    return axiosPrivate.put(employeeLeaveRequestsListEndpoint, values, {
      withCredentials: true,
    });
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (values: LeaveRequestFormValues) => {
      if (formType === "New") {
        const newRequestDTO: NewLeaveRequestDTO = {
          AbsenceReason: values[ABSENCE_REASON_FIELD_NAME],
          StartDate: values[START_DATE_FIELD_NAME],
          EndDate: values[END_DATE_FIELD_NAME],
          Comment: values[COMMENT_FIELD_NAME],
        };

        return createNewLeaveRequestMutationFunction(newRequestDTO);
      } else {
        const editedRequestDTO: EditLeaveRequestDTO = {
          LeaveREquestId: leaveRequest!.id,
          AbsenceReason: values[ABSENCE_REASON_FIELD_NAME],
          StartDate: values[START_DATE_FIELD_NAME],
          EndDate: values[END_DATE_FIELD_NAME],
          Comment: values[COMMENT_FIELD_NAME],
        };

        return editLeaveRequestMutationFunction(editedRequestDTO);
      }
    },
  });

  const initialValues: LeaveRequestFormValues = {
    [ABSENCE_REASON_FIELD_NAME]: leaveRequest
      ? leaveRequest.absenceReason.id
      : -1,
    [START_DATE_FIELD_NAME]: leaveRequest ? leaveRequest.startDate : "",
    [END_DATE_FIELD_NAME]: leaveRequest ? leaveRequest.endDate : "",
    [COMMENT_FIELD_NAME]: leaveRequest ? leaveRequest.comment : "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={leaveRequestSchema}
      onSubmit={(
        values: LeaveRequestFormValues,
        { setSubmitting }: FormikHelpers<LeaveRequestFormValues>
      ) => {
        mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              refetchType: "all",
              predicate: (query) =>
                query.queryKey[0] === LEAVE_REQUESTS_EMPLOYEE_KEY,
            });
          },
        });
        setSubmitting(false);
      }}
    >
      {({ errors }) => (
        <StyledLeaveRequestForm>
          {isError && !isPending && (
            <StyledFormError>{getErrorMessages(error)}</StyledFormError>
          )}
          {isSuccess && (
            <StyledSuccessStatus>Status changed</StyledSuccessStatus>
          )}
          <h2>Leave request</h2>
          {leaveRequest && <h3>{`Id: ${leaveRequest.id}`}</h3>}

          <RequestStatusSelectInput
            name={ABSENCE_REASON_FIELD_NAME}
            label={"Select absence reason"}
          >
            <option
              hidden
              defaultChecked
              value={leaveRequest ? leaveRequest.absenceReason.id : ""}
            >
              {leaveRequest ? leaveRequest.absenceReason.value : ""}
            </option>
            {data &&
              data
                .filter((option) => {
                  return option.id !== leaveRequest?.absenceReason.id;
                })
                .map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  );
                })}
          </RequestStatusSelectInput>
          <DateFormField
            label="Start date"
            name={START_DATE_FIELD_NAME}
            isError={errors[START_DATE_FIELD_NAME]}
          />
          <DateFormField
            label="End date"
            name={END_DATE_FIELD_NAME}
            isError={errors[END_DATE_FIELD_NAME]}
          />

          <TextareaField
            label={"Comment"}
            name={COMMENT_FIELD_NAME}
            placeholder={"Your comment"}
          />

          {isPending && !isError ? (
            <StyledFormLoadingIndicator>Submitting</StyledFormLoadingIndicator>
          ) : (
            <StyledDefaultButton type="submit">Submit</StyledDefaultButton>
          )}
        </StyledLeaveRequestForm>
      )}
    </Formik>
  );
};
export default LeaveRequestForm;
