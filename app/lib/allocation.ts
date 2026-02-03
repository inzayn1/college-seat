import { AllocationResult, Classroom } from "../types";

export function sortClassrooms(classrooms: Classroom[]): Classroom[] {
  return [...classrooms].sort((a, b) => {
    if (a.floorNo !== b.floorNo) return a.floorNo - b.floorNo; // lower floor first
    return b.capacity - a.capacity; // larger rooms first on the same floor
  });
}

export function allocateGreedy(totalStudents: number, classrooms: Classroom[]): AllocationResult {
  const sorted = sortClassrooms(classrooms);

  let remaining = totalStudents;
  const selected: Classroom[] = [];

  for (const room of sorted) {
    if (remaining <= 0) break;
    selected.push(room);
    remaining -= room.capacity;
  }

  const totalCapacity = selected.reduce((sum, r) => sum + r.capacity, 0);
  const notEnough = totalCapacity < totalStudents;

  return {
    allocatedRooms: selected,
    totalCapacity,
    totalStudents,
    notEnough,
  };
}

