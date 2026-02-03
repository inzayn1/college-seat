import { Classroom } from "../types";

type ClassroomListProps = {
  classrooms: Classroom[];
};

export function ClassroomList({ classrooms }: ClassroomListProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm backdrop-blur">
      <h2 className="text-lg font-semibold text-slate-50">Classroom listing</h2>
      <p className="mt-1 text-xs text-slate-300">
        All classrooms sorted by floor (lowest first), then by capacity (largest first).
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
        <div className="grid grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr] gap-2 border-b border-slate-800 bg-slate-900/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300">
          <div>Room</div>
          <div className="text-center">Floor</div>
          <div className="text-center">Capacity</div>
          <div className="text-center">Near washroom</div>
        </div>
        <div className="max-h-64 divide-y divide-slate-800 overflow-y-auto text-xs">
          {classrooms.length === 0 ? (
            <div className="px-3 py-4 text-center text-slate-400">
              No classrooms added yet. Use the form to add one.
            </div>
          ) : (
            classrooms.map((room) => (
              <div
                key={room.roomId}
                className="grid grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr] items-center gap-2 px-3 py-2 text-slate-100"
              >
                <div className="font-medium">{room.roomId}</div>
                <div className="text-center">{room.floorNo}</div>
                <div className="text-center">{room.capacity}</div>
                <div className="text-center">
                  <span
                    className={
                      room.nearWashroom
                        ? "inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/40"
                        : "inline-flex rounded-full bg-slate-700/40 px-2 py-0.5 text-[11px] font-medium text-slate-200 ring-1 ring-slate-600/60"
                    }
                  >
                    {room.nearWashroom ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

