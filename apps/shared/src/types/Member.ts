export const member = [
  "email",
  "id",
  "name",
  "nameKana",
  "department",
  "position",
] as const;

export type Member = {
  [key in (typeof member)[number]]: string;
};

export type Members = {
  [key: string]: Member;
};
