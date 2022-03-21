import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import GuessHistogram from "./GuessHistogram";
import "./App.css";
import closeIcon from "./closeIcon.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = [["Wins", " ", " ", "Losses"]]; // Hack to compress the graph vertically

export default function Score() {
  const [wins, setWins] = useState();
  const [losses, setLosses] = useState();
  const [g1, setG1] = useState();
  const [g2, setG2] = useState();
  const [g3, setG3] = useState();
  const [g4, setG4] = useState();
  const [g5, setG5] = useState();
  const [g6, setG6] = useState();
  const scorebox = useRef();

  useEffect(() => {
    setWins(window.localStorage.getItem("jwwins") || 0);
    setLosses(window.localStorage.getItem("jwlosses") || 0);
    setG1(window.localStorage.getItem("jwg1") || 0);
    setG2(window.localStorage.getItem("jwg2") || 0);
    setG3(window.localStorage.getItem("jwg3") || 0);
    setG4(window.localStorage.getItem("jwg4") || 0);
    setG5(window.localStorage.getItem("jwg5") || 0);
    setG6(window.localStorage.getItem("jwg6") || 0);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        data: [wins],
        borderColor: "rgb(99, 255, 132)",
        backgroundColor: "rgba(99, 255, 132, 0.5)",
      },
      {
        data: [losses],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="scorebox" ref={scorebox}>
      <img
        src={closeIcon}
        className="closeIcon"
        onClick={(e) => (scorebox.current.style.visibility = "hidden")}
      />
      <h2>
        Win Rate{" "}
        {parseInt((parseInt(wins) / (parseInt(wins) + parseInt(losses))) * 100)}
        %
      </h2>
      <Bar options={options} data={data} />
      <GuessHistogram
        g1={g1}
        g2={g2}
        g3={g3}
        g4={g4}
        g5={g5}
        g6={g6}
      ></GuessHistogram>
    </div>
  );
}
