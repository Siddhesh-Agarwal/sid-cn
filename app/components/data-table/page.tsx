"use client";

import InstallButton from "@/components/install-button";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/registry/new-york/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

type Userinfo = {
  name: string;
  email: string;
  age: number;
};

const tableData: Userinfo[] = [
  {
    name: "Avram",
    email: "aliquam@aol.ca",
    age: 24,
  },
  {
    name: "Shea",
    email: "ac.mi.eleifend@outlook.net",
    age: 38,
  },
  {
    name: "Freya",
    email: "amet.risus@icloud.org",
    age: 35,
  },
  {
    name: "Thane",
    email: "integer.in@aol.edu",
    age: 24,
  },
  {
    name: "Doris",
    email: "pellentesque.habitant@google.couk",
    age: 50,
  },
  {
    name: "Yardley",
    email: "facilisis@yahoo.couk",
    age: 31,
  },
  {
    name: "Inga",
    email: "at.arcu.vestibulum@google.net",
    age: 18,
  },
  {
    name: "Craig",
    email: "elit.aliquam.auctor@hotmail.couk",
    age: 50,
  },
  {
    name: "Odette",
    email: "ac.sem.ut@google.edu",
    age: 36,
  },
  {
    name: "Thane",
    email: "tristique.senectus.et@outlook.org",
    age: 29,
  },
  {
    name: "James",
    email: "convallis.est@yahoo.couk",
    age: 23,
  },
  {
    name: "Amela",
    email: "purus.gravida.sagittis@yahoo.couk",
    age: 47,
  },
  {
    name: "Kristen",
    email: "gravida@aol.couk",
    age: 25,
  },
  {
    name: "Zachery",
    email: "fames.ac@yahoo.ca",
    age: 19,
  },
  {
    name: "Delilah",
    email: "pede.suspendisse@google.net",
    age: 39,
  },
  {
    name: "Allen",
    email: "mauris.nulla@aol.com",
    age: 27,
  },
  {
    name: "Hedy",
    email: "nulla@outlook.net",
    age: 37,
  },
  {
    name: "Halla",
    email: "mauris.erat.eget@google.net",
    age: 43,
  },
  {
    name: "Zenia",
    email: "donec.elementum.lorem@yahoo.edu",
    age: 28,
  },
  {
    name: "Jason",
    email: "iaculis.quis@hotmail.net",
    age: 28,
  },
  {
    name: "Darryl",
    email: "mattis@hotmail.edu",
    age: 38,
  },
  {
    name: "Maile",
    email: "in.faucibus.morbi@yahoo.net",
    age: 20,
  },
  {
    name: "Adria",
    email: "at.egestas.a@icloud.edu",
    age: 25,
  },
  {
    name: "Regan",
    email: "eu.odio@yahoo.net",
    age: 32,
  },
  {
    name: "Hermione",
    email: "augue.malesuada@google.couk",
    age: 34,
  },
  {
    name: "Jaden",
    email: "lacinia.sed.congue@icloud.com",
    age: 30,
  },
  {
    name: "Elton",
    email: "ullamcorper@yahoo.net",
    age: 26,
  },
  {
    name: "Raven",
    email: "ac.turpis@protonmail.ca",
    age: 38,
  },
  {
    name: "Rosalyn",
    email: "bibendum.ullamcorper@icloud.couk",
    age: 36,
  },
  {
    name: "Cairo",
    email: "urna.justo@icloud.couk",
    age: 24,
  },
];

const columns: ColumnDef<Userinfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Data Table</h3>
        <h4 className="text-sm text-muted-foreground">
          A highly customizable data table component
        </h4>
      </div>
      <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
        <DataTable columns={columns} data={tableData} />
      </div>
      <h2 className="text-xl font-semibold">Install</h2>
      <InstallButton componentCode="data-table" />
    </div>
  );
}
