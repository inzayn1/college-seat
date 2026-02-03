export type Classroom = {
  roomId: string;
  capacity: number;
  floorNo: number;
  nearWashroom: boolean;
};

export type AllocationResult = {
  allocatedRooms: Classroom[];
  totalCapacity: number;
  totalStudents: number;
  notEnough: boolean;
};

