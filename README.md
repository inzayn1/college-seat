## Exam Classroom Seat Planner

A small web application that allocates classrooms for exams using the **minimum number of rooms** while **preferring lower-floor classrooms**.  
Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

### Features

- **Add Classroom**
  - Capture `roomId` (unique), `capacity`, `floorNo`, and `nearWashroom` (true/false).
  - Client-side validation for:
    - Required room ID
    - Unique room ID
    - Positive capacity
    - Non-negative integer floor number

- **View All Classrooms**
  - Classroom listing table with:
    - Room ID
    - Floor number
    - Capacity
    - Near washroom (Yes/No)
  - Sorted by:
    - **Floor ascending** (lower floors first)
    - Then **capacity descending** within the same floor

- **Allocate Exam Seats**
  - Input: `totalStudents`
  - Greedy allocation algorithm that:
    - Sorts classrooms by lower floor first, then by larger capacity.
    - Picks rooms in that order until total capacity ≥ total students.
    - Minimizes the number of classrooms while respecting the floor preference.
  - Output display panel shows:
    - Requested number of students
    - Total capacity used
    - List of allocated classrooms with floor, capacity, and washroom proximity
    - If capacity is insufficient, displays **“Not enough seats available”** with details.

### Project Structure (key files)

- `app/page.tsx`  
  Entry point that renders the main `ExamSeatPlanner` component.

- `app/components/ExamSeatPlanner.tsx`  
  Container component that:
  - Holds classroom and allocation state.
  - Computes sorted classrooms and total available capacity.
  - Composes the three main UI sections:
    - `AddClassroomForm`
    - `ClassroomList`
    - `AllocateExamPanel`

- `app/components/AddClassroomForm.tsx`  
  - Form to add new classrooms.
  - Handles input state and validation.
  - Emits a `Classroom` object to the parent via `onAddClassroom`.

- `app/components/ClassroomList.tsx`  
  - Read-only view of all classrooms.
  - Receives an already-sorted `classrooms` array from the parent.

- `app/components/AllocateExamPanel.tsx`  
  - Input for `totalStudents`.
  - Calls the greedy allocation function and displays the results.

- `app/lib/allocation.ts`  
  - `sortClassrooms(classrooms)` – sort helper implementing the floor/size preference.
  - `allocateGreedy(totalStudents, classrooms)` – pure function returning an `AllocationResult`.

- `app/types.ts`  
  - `Classroom` and `AllocationResult` shared TypeScript types.

### Running the App

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

You can then:

- Add classrooms via the **Add Classroom** panel.
- Review them in the **Classroom listing** panel.
- Allocate seats using the **Allocate exam** panel and inspect the results in the **Output** section.

