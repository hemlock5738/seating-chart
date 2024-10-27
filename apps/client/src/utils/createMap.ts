type Relation = { [key: string]: string };

export type Mapping = { [key: string]: string[] };

export const createMap = (
  relations: Relation[],
  key: string,
  value: string,
) => {
  const map: Mapping = {};
  for (const relation of relations) {
    if (!map[relation[key]]) {
      map[relation[key]] = [];
    }
    map[relation[key]].push(relation[value]);
  }
  return map;
};
