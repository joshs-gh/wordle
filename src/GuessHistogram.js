import React from "react";
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
import "./App.css";

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

const labels = [
  "Guess 1",
  "Guess 2",
  "Guess 3",
  "Guess 4",
  "Guess 5",
  "Guess 6",
];

const data = {
  labels,
  datasets: [
    {
      data: [0, 0, 3, 5, 7, 12],
      borderColor: "rgb(99, 255, 132)",
      backgroundColor: "rgba(99, 255, 132, 0.5)",
    },
  ],
};

export default function GuessHistogram({ g1, g2, g3, g4, g5, g6 }) {
  const data = {
    labels,
    datasets: [
      {
        data: [g1, g2, g3, g4, g5, g6],
        borderColor: "rgb(99, 255, 132)",
        backgroundColor: "rgba(99, 255, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />; // appears you can't change these variable names?????
}
