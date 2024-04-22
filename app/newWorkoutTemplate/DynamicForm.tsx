import { useState } from "react";
import { useRouter } from "next/navigation";
import { serverUrl } from "../server";

const parseDate = (rawDate: Date) => {
  const day = rawDate.getDate();
  const month = rawDate.getMonth() + 1;
  const year = rawDate.getFullYear();
  if (month < 10) {
    return `${year}-0${month}-${day}`;
  }
  return `${year}-${month}-${day}`;
};

const DynamicForm = () => {
  const router = useRouter();
  const today = new Date();
  const [lines, setLines] = useState([
    {
      id: 1,
      sets: "",
      exercise: "",
      reps: "",
      weight: "",
    },
  ]);
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState(parseDate(today));

  const addLine = () => {
    setLines([
      ...lines,
      {
        id: lines.length + 1,
        sets: "",
        exercise: "",
        reps: "",
        weight: "",
      },
    ]);
  };
  const removeLine = () => {
    if (lines.length > 1) {
      setLines(lines.slice(0, -1));
    }
  };

  const handleChangeName = (value: string) => {
    setWorkoutName(value);
  };
  const handleChangeDate = (value: string) => {
    console.log("value: ", value);
    setDate(value);
  };
  const handleChangeSets = (id: number, value: string) => {
    setLines(
      lines.map((line) => (line.id === id ? { ...line, sets: value } : line))
    );
  };
  const handleChangeExercise = (id: number, value: string) => {
    setLines(
      lines.map((line) =>
        line.id === id ? { ...line, exercise: value } : line
      )
    );
  };
  const handleChangeReps = (id: number, value: string) => {
    setLines(
      lines.map((line) => (line.id === id ? { ...line, reps: value } : line))
    );
  };
  const handleChangeWeight = (id: number, value: string) => {
    setLines(
      lines.map((line) => (line.id === id ? { ...line, weight: value } : line))
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = lines.map((line) => line);
    const newWorkoutTemplate = { exercises: formData, date, workoutName };
    console.log(newWorkoutTemplate);
    try {
      const response = await fetch(`${serverUrl}/api/submitForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkoutTemplate),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
    // Do something with formData (e.g., send it to an API)
  };

  return (
    <form className="max-w-md mx-auto mt-8 " onSubmit={handleSubmit}>
      <label htmlFor={`New Workout`} className="flex mb-2">
        New Workout
      </label>
      <input
        type="text"
        value={workoutName}
        onChange={(e) => handleChangeName(e.target.value)}
        className="border rounded px-4 py-2 text-black w-3/6 mb-4 "
        placeholder="Workout Name"
      />
      <input
        type="date"
        id={`date`}
        value={date}
        onChange={(e) => handleChangeDate(e.target.value)}
        className="border rounded px-4 py-2 w-3/5 mb-4 text-black"
      />
      {lines.map(({ id, sets, exercise, reps, weight }) => (
        <div key={id} className="mb-4">
          <div className="flex flex-row flex-nowrap">
            <input
              type="text"
              id={`line${id}`}
              value={sets}
              onChange={(e) => handleChangeSets(id, e.target.value)}
              className="border rounded px-4 py-2 text-black w-1/6"
              placeholder="Sets"
            />
            <input
              type="text"
              id={`line${id}`}
              value={exercise}
              onChange={(e) => handleChangeExercise(id, e.target.value)}
              className="border rounded px-4 py-2 text-black w-3/6"
              placeholder="Exercise"
            />
            <input
              type="text"
              id={`line${id}`}
              value={reps}
              onChange={(e) => handleChangeReps(id, e.target.value)}
              className="border rounded px-4 py-2 text-black w-1/6"
              placeholder="Reps"
            />
            <input
              type="text"
              id={`line${id}`}
              value={weight}
              onChange={(e) => handleChangeWeight(id, e.target.value)}
              className="border rounded px-4 py-2 text-black w-1/6"
              placeholder="Lbs"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addLine}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Line
        </button>
        <button
          type="button"
          onClick={removeLine}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove Line
        </button>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push("/routine")}
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => router.push("/routine")}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Go Back
      </button>
    </form>
  );
};

export default DynamicForm;
