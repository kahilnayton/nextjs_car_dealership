import { ParsedUrlQuery } from "querystring";
import { CarModel } from "../../api/Car";
import { getAsString } from "../getAsString";
import { openDB } from "../openDB";

export async function GetPaginatedCars(query: ParsedUrlQuery) {
  const db = await openDB();

  const dbParams = {
    "@make": getAsString(query.make),
    "@model": getAsString(query.model),
    "@minPrice": getAsString(query.minPrice),
    "@maxPrice": getAsString(query.maxPrice),
  };

  const cars = await db.all<CarModel[]>(`
  SELECT *
  FROM cars
  WHERE (@make is NULL OR @make = make)
  AND (@model is NULL OR @model = model)
  AND (@minPrice is NULL OR @minPrice <= price)
  AND (@maxPrice is NULL OR @maxPrice >= price)
  LIMIT @rowsPerPage OFFSET @offset
  `);

  return cars;
}

function getValueNumber(value: string | string[]) {
  const str = getValueStr(value);
  const number = parseInt(str);
  return isNaN(number) ? null : number;
}

function getValueStr(value: string | string[]) {
  const str = getAsString(value);
  return !str || str.toLowerCase() === "all" ? null : str;
}
