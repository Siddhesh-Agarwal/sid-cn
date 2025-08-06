"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DateInput } from "@/registry/new-york/components/date-input";
import { DateTimeInput } from "@/registry/new-york/components/date-time-input";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/registry/new-york/components/data-table";
import { ThemeToggle } from "@/registry/new-york/components/theme-toggle";
import { SpinningWheel } from "@/registry/new-york/blocks/spinning-wheel/spinning-wheel";
import { Button } from "@/registry/new-york/components/button";
import InstallButton from "@/components/install-button";
import { Label } from "@/components/ui/label";

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

export default function Home() {
  const [date, setDate] = useState<Date | null>(null);
  const [reward, setReward] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      toast.info("Date Selected", { description: date.toUTCString() });
    }
  }, [date]);

  useEffect(() => {
    if (reward) {
      toast.success("Reward", { description: reward });
    }
  }, [reward]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Sidcn</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>

      <main className="flex flex-col flex-1 gap-8">
        <section id="components" className="flex flex-col flex-1 gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Components</h2>
          </div>

          <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Button</h3>
                <h4 className="text-sm text-muted-foreground">
                  A beautiful button component
                </h4>
              </div>
              <InstallButton componentCode="button" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 items-center min-h-[200px] gap-4">
              <Button variant={"success"} shape={"default"}>
                Success + default
              </Button>
              <Button variant={"warning"} shape={"default"}>
                Warning + default
              </Button>
              <Button variant={"subtle"} shape={"default"}>
                Subtle + default
              </Button>
              <Button variant={"glass"} shape={"default"}>
                Glass + default
              </Button>

              <Button variant={"success"} shape={"pill"}>
                Success + pill
              </Button>
              <Button variant={"warning"} shape={"pill"}>
                Warning + pill
              </Button>
              <Button variant={"subtle"} shape={"pill"}>
                Subtle + pill
              </Button>
              <Button variant={"glass"} shape={"pill"}>
                Glass + pill
              </Button>

              <Button variant={"success"} shape={"square"}>
                Success + square
              </Button>
              <Button variant={"warning"} shape={"square"}>
                Warning + square
              </Button>
              <Button variant={"subtle"} shape={"square"}>
                Subtle + square
              </Button>
              <Button variant={"glass"} shape={"square"}>
                Glass + square
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Date Input</h3>
                <h4 className="text-sm text-muted-foreground">
                  A beautiful date input component
                </h4>
              </div>
              <InstallButton componentCode="date-input" />
            </div>
            <div className="flex items-center justify-center min-h-[400px] relative">
              <div className="flex flex-col">
                <Label>Enter a date</Label>
                <DateInput onChange={setDate} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Date Time Input</h3>
                <h4 className="text-sm text-muted-foreground">
                  A beautiful date time input component
                </h4>
              </div>
              <InstallButton componentCode="date-time-input" />
            </div>
            <div className="flex items-center justify-center min-h-[400px] relative">
              <div className="flex flex-col">
                <Label>Enter a date and time</Label>
                <DateTimeInput onChange={(date) => setDate(date)} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Data Table</h3>
                <h4 className="text-sm text-muted-foreground">
                  A highly customizable data table component
                </h4>
              </div>
              <InstallButton componentCode="data-table" />
            </div>
            <div className="flex items-center justify-center min-h-[400px] relative">
              <DataTable columns={columns} data={tableData} />
            </div>
          </div>

          <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Theme Toggle</h3>
                <h4 className="text-sm text-muted-foreground">
                  A beautiful theme toggle component
                </h4>
              </div>
              <InstallButton componentCode="theme-toggle" />
            </div>
            <div className="flex items-center justify-center min-h-[400px] relative">
              <ThemeToggle />
            </div>
          </div>
        </section>

        <section id="blocks" className="flex flex-col flex-1 gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Blocks</h2>
          </div>
          <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Spinning Wheel</h3>
                <h4 className="text-sm text-muted-foreground">
                  A lottery-like spinning wheel component
                </h4>
              </div>
              <InstallButton componentCode="spinning-wheel" />
            </div>
            <div className="flex items-center justify-center min-h-[400px] relative">
              <SpinningWheel
                rewardDetails={[{ reward: "Yes!" }, { reward: "No!" }]}
                setReward={setReward}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
