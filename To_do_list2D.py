import streamlit as st

st.set_page_config(page_title="My To-Do List", page_icon="✨")

# ---------- UI ----------
st.markdown("""
<style>
.stApp {
    background: linear-gradient(120deg, #f3dfe2 0%, #f4e9e3 50%, #dfece5 100%);
    color: #34423a;
}

.block-container {
    max-width: 800px;
}

h1 {
    text-align: center;
    color: #42594d;
}

.subtitle {
    text-align: center;
    color: #78857d;
    margin-bottom: 25px;
}

.card {
    background: rgba(255,255,255,.72);
    padding: 20px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.8);
}

.stat {
    background: rgba(255,255,255,.65);
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    border: 1px solid rgba(255,255,255,.8);
}

</style>
""", unsafe_allow_html=True)

# ---------- DATA ----------
if "tasks" not in st.session_state:
    st.session_state.tasks = []

# ---------- HEADER ----------
st.markdown("<h1>✨ My To-Do List</h1>", unsafe_allow_html=True)
st.markdown(
    "<div class='subtitle'>Plan it. Do it. Feel accomplished. 🌿</div>",
    unsafe_allow_html=True
)

# ---------- ADD TASK ----------
st.markdown("<div class='card'>", unsafe_allow_html=True)
st.subheader("➕ Add a New Task")

with st.form("add_task", clear_on_submit=True):
    task = st.text_input(
        "Task",
        placeholder="What do you need to do?",
        label_visibility="collapsed"
    )

    if st.form_submit_button("✨ Add Task", use_container_width=True):
        if task.strip():
            st.session_state.tasks.append(
                {"task": task.strip(), "done": False}
            )
        else:
            st.warning("Please enter a task.")

st.markdown("</div>", unsafe_allow_html=True)

# ---------- STATS ----------
total = len(st.session_state.tasks)
done = sum(t["done"] for t in st.session_state.tasks)
remaining = total - done

c1, c2, c3 = st.columns(3)

for col, number, label in [
    (c1, total, "📋 Total"),
    (c2, done, "✅ Completed"),
    (c3, remaining, "⏳ Remaining")
]:
    with col:
        st.markdown(
            f"<div class='stat'><h2>{number}</h2>{label}</div>",
            unsafe_allow_html=True
        )

# ---------- PROGRESS ----------
progress = done / total if total else 0

st.write("")
st.write(f"🚀 **Progress — {int(progress * 100)}%**")
st.progress(progress)

# ---------- TASKS ----------
st.subheader("📋 Your Tasks")

if not st.session_state.tasks:
    st.info("🌸 No tasks yet. Add one above!")
else:
    for i, item in enumerate(st.session_state.tasks):
        c1, c2 = st.columns([5, 1])

        with c1:
            checked = st.checkbox(
                item["task"],
                value=item["done"],
                key=f"task_{i}"
            )

            if checked != item["done"]:
                st.session_state.tasks[i]["done"] = checked
                st.rerun()

        with c2:
            if st.button("🗑️", key=f"delete_{i}"):
                st.session_state.tasks.pop(i)
                st.rerun()

# ---------- CLEAR COMPLETED ----------
if done:
    if st.button("🧹 Clear Completed Tasks", use_container_width=True):
        st.session_state.tasks = [
            t for t in st.session_state.tasks if not t["done"]
        ]
        st.rerun()

# ---------- FOOTER ----------
st.markdown(
    "<p style='text-align:center;color:#78857d;margin-top:30px;'>"
    "✨ Stay organized • Stay productive 🌿</p>",
    unsafe_allow_html=True
)