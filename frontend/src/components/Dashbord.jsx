import  { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [activities] = useState({
    edited: 15,
    exported: 8,
    saved: 10,
  });

  const [editedProjects] = useState([
    { id: 1, name: "Project A", date: "2025-01-15" },
    { id: 2, name: "Project B", date: "2025-01-10" },
    { id: 3, name: "Project C", date: "2025-01-08" },
  ]);

  const pieChartData = {
    labels: ["Edited", "Exported", "Saved"],
    datasets: [
      {
        label: "Activity Distribution",
        data: [activities.edited, activities.exported, activities.saved],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
        hoverOffset: 4,
      },
    ],
  };

  // Bar chart data for Theme Utilization
  const barChartDataTheme = {
    labels: ["Theme 1", "Theme 2", "Theme 3", "Theme 4"],
    datasets: [
      {
        label: "Theme Utilization",
        data: [70, 40, 60, 80],
        backgroundColor: "#36a2eb",
        borderRadius: 10,
      },
    ],
  };

  // New Bar chart data for Time Saved on Editing & Handling
  const barChartDataTimeSaved = {
    labels: ["Project A", "Project B", "Project C", "Project D"],
    datasets: [
      {
        label: "Time Saved (minutes)",
        data: [120, 90, 150, 110], // Example time saved in minutes
        backgroundColor: "#ffcd56",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="dashboard-container mt-22 p-6 min-h-screen bg-gray-100 flex flex-col">
      {/* Top Section (Projects + Pie Chart) */}
      <div className="top-section flex flex-col md:flex-row">
        {/* Left: Projects */}
        <div className="projects-section w-full md:w-2/3 bg-white shadow-md rounded-lg p-4 mr-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Previous Edited Projects</h2>
          <ul className="project-list space-y-4">
            {editedProjects.map((project) => (
              <li key={project.id} className="p-3 bg-gray-50 rounded-md shadow hover:shadow-lg transition-all">
                <h3 className="font-medium text-gray-700">{project.name}</h3>
                <p className="text-gray-500">Last edited: {project.date}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Pie Chart */}
        <div className="pie-chart-section w-full md:w-1/3 bg-white shadow-md rounded-lg p-4 mt-6 md:mt-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Previous Activity</h2>
          <div className="flex justify-center">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} height={220} width={220} />
          </div>
        </div>
      </div>

      {/* Bottom Section (Graphs) */}
      <div className="bottom-section mt-20 w-200 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Theme Utilization Graph */}
        <div className="bar-chart-section bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Theme Utilization</h2>
          <div className="flex justify-center">
            <Bar
              data={barChartDataTheme}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: "#4B5563" } },
                  y: { ticks: { color: "#4B5563" } },
                },
              }}
              height={180}
              width={600}
            />
          </div>
        </div>

        {/* Time Saved Graph */}
        <div className="bar-chart-section bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Time Saved on Editing & Handling</h2>
          <div className="flex justify-center">
            <Bar
              data={barChartDataTimeSaved}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: "#4B5563" } },
                  y: { ticks: { color: "#4B5563" } },
                },
              }}
              height={180}
              width={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
