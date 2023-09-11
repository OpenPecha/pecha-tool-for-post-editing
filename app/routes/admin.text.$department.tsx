import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DepartmentType } from "~/model/data/actions";
import { getData } from "~/model/text";
import { useState } from "react";
import _ from "lodash";
export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getData(department);
  const groupedData = _.groupBy(text, "name");
  return { groupedData };
};

function department() {
  const { groupedData } = useLoaderData();

  return (
    <>
      {Object.keys(groupedData).map((key) => {
        return <Dropdown key={key} groupName={key} items={groupedData[key]} />;
      })}
    </>
  );
}

function Dropdown({ groupName, items }) {
  return (
    <div className="collapse bg-base-200 mt-2">
      <input type="radio" name="my-accordion-1" />
      <div className="collapse-title text-xl font-medium">{groupName}</div>
      <div className="collapse-content flex gap-2 flex-wrap">
        {items.map((item) => (
          <span key={item.id}>{item.id}</span>
        ))}
      </div>
    </div>
  );
}

export default department;
