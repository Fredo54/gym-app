"use client";
import "dotenv/config";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { UserAuth } from "./context/AuthContext";
import SignIn from "../components/auth/SignIn";
import { serverUrl } from "./server";

type workoutData = {
  date: string;
  id: number;
  notes: string;
  reps: number;
  sets: number;
  weight: number;
  workout: string;
};

const getData = async () => {
  try {
    const data = await fetch(serverUrl, {
      method: "GET",
      cache: "no-cache",
    });

    const exercises = await data.json();
    // console.log(exercises);
    return exercises;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default function Home() {
  const [show, setShow] = useState(false);
  const [dataList, setDataList] = useState<workoutData[]>([]);
  const { user, googleSignIn, signOutUser } = UserAuth();

  useEffect(() => {
    if (show && user) {
      getData().then((workouts) => {
        setDataList(workouts);
      });
    }
  }, [show]);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <main>
      {!user && <SignIn />}
      {user && (
        <>
          <div>
            <button onClick={() => setShow(true)}> Click Me</button>
            <p>
              Get started by editing&nbsp;
              <code>app/page.tsx</code>
            </p>
            <p>Home Page!</p>
          </div>
          <div>
            {dataList
              ? dataList.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li>{item.date}</li>
                      <li>{item.id}</li>
                      <li>{item.notes}</li>
                      <li>{item.reps}</li>
                      <li>{item.sets}</li>
                      <li>{item.weight}</li>
                      <li>{item.workout}</li>
                    </ul>
                  );
                })
              : null}
          </div>
        </>
      )}
    </main>
  );
}
