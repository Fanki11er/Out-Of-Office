import { ErrorMessage, useField } from "formik";
import { StyledDefaultFormInputErrorIndicator } from "../../atoms/StyledDefaultFormInputErrorIndicator/StyledDefaultFormInputErrorIndicator.styles";
import {
  StyledFormSelectInput,
  StyledRegisterFormInputLabel,
} from "./FormSelectInput.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getOptionsFromApi } from "../../../api/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import { CombinedValue } from "../../../types/outOffOffice";
type Props = {
  name: string;
  labelText: string;
  optionsType: string;
};
const FormInputSelect = ({ labelText, name, optionsType }: Props) => {
  const [field] = useField(name);
  const axiosPrivate = useAxiosPrivate();

  const getOptions = async () => {
    const response = await axiosPrivate.get(getOptionsFromApi(optionsType));
    return response.data;
  };

  const { data } = useQuery<CombinedValue[]>({
    queryKey: [optionsType],
    queryFn: getOptions,
  });

  const renderOptions = (options: CombinedValue[]) => {
    return options.map((option) => {
      return (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      );
    });
  };

  return (
    <StyledRegisterFormInputLabel>
      {labelText}
      <StyledFormSelectInput {...field}>
        <option hidden value={""}>
          {field.value}
        </option>
        {data && renderOptions(data)}
      </StyledFormSelectInput>

      <ErrorMessage
        name={name}
        render={(msg) => (
          <StyledDefaultFormInputErrorIndicator>
            {msg}
          </StyledDefaultFormInputErrorIndicator>
        )}
      />
    </StyledRegisterFormInputLabel>
  );
};

export default FormInputSelect;
