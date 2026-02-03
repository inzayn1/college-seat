import { FormEvent, useState } from "react";
import { Classroom } from "../types";

type AddClassroomFormProps = {
  existingRoomIds: string[];
  onAddClassroom: (classroom: Classroom) => void;
};

export function AddClassroomForm({
  existingRoomIds,
  onAddClassroom,
}: AddClassroomFormProps) {
  const [roomId, setRoomId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [nearWashroom, setNearWashroom] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const trimmedRoomId = roomId.trim();
    const parsedCapacity = Number(capacity);
    const parsedFloorNo = Number(floorNo);

    if (!trimmedRoomId) {
      setFormError("Room ID is required.");
      return;
    }
    if (existingRoomIds.includes(trimmedRoomId)) {
      setFormError("Room ID must be unique.");
      return;
    }
    if (!Number.isFinite(parsedCapacity) || parsedCapacity <= 0) {
      setFormError("Capacity must be a positive number.");
      return;
    }
    if (!Number.isInteger(parsedFloorNo) || parsedFloorNo < 0) {
      setFormError("Floor number must be a non-negative integer.");
      return;
    }

    const newClassroom: Classroom = {
      roomId: trimmedRoomId,
      capacity: parsedCapacity,
      floorNo: parsedFloorNo,
      nearWashroom,
    };

    onAddClassroom(newClassroom);

    setRoomId("");
    setCapacity("");
    setFloorNo("");
    setNearWashroom(false);
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm backdrop-blur">
      <h2 className="text-lg font-semibold text-slate-50">Add Classroom</h2>
      <p className="mt-1 text-xs text-slate-300">
        Define classroom details including capacity, floor number, and washroom proximity.
      </p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-200">
            Room ID
          </label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="e.g. A101"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            required
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-200">
              Capacity
            </label>
            <input
              type="number"
              min={1}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="e.g. 40"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-200">
              Floor number
            </label>
            <input
              type="number"
              min={0}
              value={floorNo}
              onChange={(e) => setFloorNo(e.target.value)}
              placeholder="0 for ground, 1, 2, ..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              required
            />
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2">
          <input
            id="nearWashroom"
            type="checkbox"
            checked={nearWashroom}
            onChange={(e) => setNearWashroom(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-500"
          />
          <label
            htmlFor="nearWashroom"
            className="cursor-pointer text-xs font-medium text-slate-200"
          >
            Near washroom
          </label>
        </div>

        {formError && (
          <p className="text-xs font-medium text-rose-400">{formError}</p>
        )}

        <button
          type="submit"
          className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Add classroom
        </button>
      </form>
    </section>
  );
}

