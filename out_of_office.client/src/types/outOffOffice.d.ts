export type CombinedValue = {
  id: number;
  value: string;
};

export type EmployeeDTO = {
  fullName: string;
  subdivision: CombinedValue;
  position: CombinedValue;
  status: CombinedValue;
  outOfOfficeBalance: number;
  peoplePartner: CombinedValue;
};
