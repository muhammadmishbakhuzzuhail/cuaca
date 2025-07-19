"use client";

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

type Item = {
   label: string;
   data: number[];
};

type Props = {
   data: { labels: string[]; datasets: [Item] };
};

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   ChartDataLabels
);

const LineChart = (props: Props) => {
   let getMin = props.data.datasets[0].data[0];
   let getMax = props.data.datasets[0].data[0];

   for (let i = 1; i < props.data.datasets[0].data.length; i++) {
      const val = props.data.datasets[0].data[i];

      if (val < getMin) {
         getMin = val;
      }
      if (val > getMax) {
         getMax = val;
      }
   }

   const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
         legend: {
            position: "top" as const,
            labels: {
               color: "#334155",
            },
         },
         title: {
            display: true,
            text: "Prediksi Suhu (°C)",
            color: "black",
         },
         datalabels: {
            anchor: "end" as const,
            align: "top" as const,
            color: "#334155",
            font: {
               weight: "bold" as const,
            },
            formatter: function (value: number) {
               return value + "°C";
            },
         },
         // label ketika titik di hover
         tooltip: {
            callbacks: {
               labelTextColor: () => "#334155",
            },
            backgroundColor: "white",
            titleColor: "black",
         },
      },
      scales: {
         x: {
            display: true,
            grid: {
               drawOnChartArea: true,
               color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
               stepSize: 20,
            },
         },
         y: {
            min: getMin - 1,
            max: getMax + 1,
            display: false,
            grid: {
               drawOnChartArea: true,
               color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
               stepSize: 20,
            },
         },
      },
   };

   const data = {
      labels: props.data.labels,
      datasets: [
         {
            label: props.data.datasets[0].label,
            data: props.data.datasets[0].data,
            borderColor: "#3B82F6",
            backgroundColor: "#3B82F6",
            tension: 0.35, // buat garis melengkung
            fill: true,
         },
      ],
   };

   return <Line options={options} data={data} />;
};

export default LineChart;
