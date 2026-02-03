import { useState } from "react";
import { AllocationResult, Classroom } from "../types";
import { allocateGreedy } from "../lib/allocation";

type AllocateExamPanelProps = {
  classrooms: Classroom[];
  allocationResult: AllocationResult | null;
  onAllocationResult: (result: AllocationResult) => void;
};

export function AllocateExamPanel({
  classrooms,
  allocationResult,
  onAllocationResult,
}: AllocateExamPanelProps) {
  const [totalStudentsInput, setTotalStudentsInput] = useState("");
  const [allocationError, setAllocationError] = useState<string | null>(null);

  function handleAllocate() {
    setAllocationError(null);

    const totalStudents = Number(totalStudentsInput);
    if (!Number.isFinite(totalStudents) || totalStudents <= 0) {
      setAllocationError("Total students must be a positive number.");
      return;
    }
    if (classrooms.length === 0) {
      setAllocationError("Please add at least one classroom first.");
      return;
    }

    const result = allocateGreedy(totalStudents, classrooms);
    onAllocationResult(result);
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm backdrop-blur">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">Allocate exam</h2>
        <p className="mt-1 text-xs text-slate-300">
          Enter the total number of students to allocate seats across classrooms.
        </p>

        <div className="mt-4 space-y-2">
          <label className="block text-xs font-medium text-slate-200">
            Total students
          </label>
          <input
            type="number"
            min={1}
            value={totalStudentsInput}
            onChange={(e) => setTotalStudentsInput(e.target.value)}
            placeholder="e.g. 120"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          />
          {allocationError && (
            <p className="text-xs font-medium text-rose-400">{allocationError}</p>
          )}
          <button
            type="button"
            onClick={handleAllocate}
            className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Allocate seats
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600/70 to-transparent" />

      <div>
        <h3 className="text-sm font-semibold text-slate-100">Output</h3>
        <p className="mt-1 text-[11px] text-slate-300">
          Allocation uses a greedy strategy to minimize classroom count while preferring lower floors.
        </p>

        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs">
          {!allocationResult ? (
            <p className="text-slate-400">
              Run an allocation to see the selected classrooms and capacity details here.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    Request
                  </div>
                  <div className="text-sm font-semibold text-slate-50">
                    {allocationResult.totalStudents} students
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    Capacity used
                  </div>
                  <div className="text-sm font-semibold text-slate-50">
                    {allocationResult.totalCapacity} seats
                  </div>
                </div>
              </div>

              {allocationResult.notEnough && (
                <div className="rounded-lg border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-[11px] font-medium text-rose-100">
                  Not enough seats available. Only{" "}
                  {allocationResult.totalCapacity} seats for{" "}
                  {allocationResult.totalStudents} students.
                </div>
              )}

              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Allocated classrooms
                </div>
                {allocationResult.allocatedRooms.length === 0 ? (
                  <p className="text-slate-400">
                    No classrooms selected. Try increasing the number of classrooms
                    available.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {allocationResult.allocatedRooms.map((room) => (
                      <div
                        key={room.roomId}
                        className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-1.5"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-50">
                            {room.roomId}
                          </div>
                          <div className="text-[11px] text-slate-300">
                            Floor {room.floorNo} • {room.capacity} seats
                          </div>
                        </div>
                        <div className="text-right text-[11px]">
                          <span
                            className={
                              room.nearWashroom
                                ? "inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-300 ring-1 ring-emerald-500/40"
                                : "inline-flex rounded-full bg-slate-700/40 px-2 py-0.5 font-medium text-slate-200 ring-1 ring-slate-600/60"
                            }
                          >
                            Washroom: {room.nearWashroom ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

