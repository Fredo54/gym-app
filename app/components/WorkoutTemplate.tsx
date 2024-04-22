const dummyData = [
  {
    WorkoutName: "Workout A",
    Exercises: ["Bench", "Squat", "Deadlift"],
  },
  {
    WorkoutName: "Workout B",
    Exercises: ["Incline Press", "Pull Ups", "Rows"],
  },
];

export default function WorkoutTemplate() {
  return (
    <>
      <div className="m-auto bg-purple-400 flex justify-center p-2 flex-wrap">
        {dummyData.map((item, index) => {
          return (
            <div
              key={`${item.WorkoutName}-${index}`}
              className="w-1/2 p-6 bg-green-600 border border-rose-500 content-between rounded-md overflow-hidden text-ellipsis hover:bg-green-800 cursor-pointer"
            >
              <ul>
                <li>{item.WorkoutName}</li>
                {item.Exercises.map((exercise, index) => {
                  return (
                    <li key={`${exercise}-${index}`} className="text-ellipsis">
                      {exercise}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
