
import { useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Check,
  Trash2,
  Sparkles,
  Circle,
  CalendarDays,
} from "lucide-react";
import DreamScene from "./DreamScene";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Plan the week ahead", category: "PERSONAL", done: false },
  { id: 2, title: "Finish creative project", category: "WORK", done: false },
  { id: 3, title: "Read for 30 minutes", category: "GROWTH", done: true },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        category: "NEW TASK",
        done: false,
      },
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#">
          <span className="brand-symbol">✳</span>
          taskspace<span className="brand-dot">.</span>
        </a>
        <div className="nav-center">A LITTLE SPACE FOR BIG IDEAS</div>
        <div className="nav-status">
          <span className="status-dot" /> YOUR SPACE IS READY
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={14} /> MAKE ROOM FOR WHAT MATTERS
          </p>

          <h1>
            A softer way
            <br />
            to get things
            <br />
            <span>done.</span>
          </h1>

          <p className="hero-description">
            Your thoughts, plans and little everyday victories.
            All in one beautifully organised space.
          </p>

          <a href="#workspace" className="hero-link">
            ENTER YOUR SPACE <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="hero-art">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <DreamScene />
          <div className="art-label label-top">01 — FIND YOUR FLOW</div>
          <div className="art-label label-bottom">A WORLD OF YOUR OWN ✳</div>
        </div>

        <div className="hero-index">CREATIVE SPACE / 001</div>
      </section>

      <section className="workspace" id="workspace">
        <div className="workspace-heading">
          <div>
            <p className="eyebrow">YOUR PERSONAL UNIVERSE</p>
            <h2>Make today <em>count.</em></h2>
          </div>
          <div className="date-label">
            <CalendarDays size={16} />
            YOUR DAILY SPACE
          </div>
        </div>

        <div className="workspace-grid">
          <div className="task-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">THE LITTLE THINGS</span>
                <h3>Your tasks<span>.</span></h3>
              </div>
              <span className="task-count">
                {String(tasks.length).padStart(2, "0")} ITEMS
              </span>
            </div>

            <form className="add-task" onSubmit={addTask}>
              <Plus size={19} />
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add something to your day..."
                aria-label="New task"
              />
              <button type="submit">ADD</button>
            </form>

            <div className="task-list">
              {tasks.map((task) => (
                <article
                  className={`task-item ${task.done ? "is-done" : ""}`}
                  key={task.id}
                >
                  <button
                    className="task-check"
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.done ? "Mark incomplete" : "Complete task"}
                  >
                    {task.done ? <Check size={15} /> : <Circle size={15} />}
                  </button>

                  <div className="task-details">
                    <span className="task-category">{task.category}</span>
                    <p>{task.title}</p>
                  </div>

                  <button
                    className="delete-task"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </article>
              ))}

              {tasks.length === 0 && (
                <p className="empty-state">
                  A blank page. A fresh beginning. Add your first task.
                </p>
              )}
            </div>
          </div>

          <aside className="progress-panel">
            <span className="panel-kicker">A MOMENT TO REFLECT</span>
            <div className="progress-number">{progress}<span>%</span></div>
            <p className="progress-title">Look at you, making progress.</p>

            <div className="progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>

            <div className="progress-stats">
              <span>{completed} completed</span>
              <span>{tasks.length - completed} left</span>
            </div>

            <div className="progress-note">
              <span>✳</span>
              Every little step counts. Keep going at your own pace.
            </div>
          </aside>
        </div>
      </section>

      <footer className="footer">
        <span>MADE FOR YOUR EVERYDAY MAGIC.</span>
        <span>TASKSPACE © 2026</span>
      </footer>
    </main>
  );
}
