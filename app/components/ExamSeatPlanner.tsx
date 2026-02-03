"use client";

import { useMemo, useState } from "react";
import { Classroom, AllocationResult } from "../types";
import { sortClassrooms } from "../lib/allocation";
import { AddClassroomForm } from "./AddClassroomForm";
import { ClassroomList } from "./ClassroomList";
import { AllocateExamPanel } from "./AllocateExamPanel";

export function ExamSeatPlanner() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [allocationResult, setAllocationResult] = useState<AllocationResult | null>(null);

  const sortedClassrooms = useMemo(
    () => sortClassrooms(classrooms),
    [classrooms],
  );

  const totalAvailableCapacity = useMemo(
    () => classrooms.reduce((sum, c) => sum + c.capacity, 0),
    [classrooms],
  );

  function handleAddClassroom(newClassroom: Classroom) {
    setClassrooms((prev) => [...prev, newClassroom]);
  }

  function handleAllocationResult(result: AllocationResult) {
    setAllocationResult(result);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Exam Classroom Seat Planner
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Allocate exam rooms using the minimum number of classrooms while preferring lower floors.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300 shadow-sm">
            <div>
              <span className="font-medium text-slate-100">Total classrooms:</span>{" "}
              {classrooms.length}
            </div>
            <div>
              <span className="font-medium text-slate-100">Total available seats:</span>{" "}
              {totalAvailableCapacity}
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.2fr)]">
          <AddClassroomForm
            existingRoomIds={classrooms.map((c) => c.roomId)}
            onAddClassroom={handleAddClassroom}
          />

          <ClassroomList classrooms={sortedClassrooms} />

          <AllocateExamPanel
            classrooms={sortedClassrooms}
            allocationResult={allocationResult}
            onAllocationResult={handleAllocationResult}
          />
        </div>
      </div>
    </div>
  );
}

export default ExamSeatPlanner;

