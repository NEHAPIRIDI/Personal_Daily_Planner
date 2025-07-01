const planner = document.getElementById('planner');
const startHour = 7;
const endHour = 22;

function getTimeIcon(hour) {
  if (hour < 12) return "☀️";
  else if (hour < 17) return "🌤️";
  else return "🌙";
}

for (let hour = startHour; hour <= endHour; hour++) {
  const timeBlock = document.createElement('div');
  timeBlock.classList.add('time-block');

  const timeLabel = document.createElement('div');
  timeLabel.className = 'time';
  timeLabel.innerHTML = `${getTimeIcon(hour)} ${formatHour(hour)}`;

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.placeholder = '📝 Write your task';
  taskInput.className = 'task-input-field';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    taskInput.classList.toggle('completed');
  });

  const saveBtn = document.createElement('button');
  saveBtn.innerText = '💾 Save';
  saveBtn.onclick = () => {
    localStorage.setItem(`task-${hour}`, taskInput.value);
    alert('Task saved!');
  };

  taskInput.value = localStorage.getItem(`task-${hour}`) || '';

  const priority = document.createElement('select');
  const levels = ["None", "Low", "Medium", "High"];
  levels.forEach(level => {
    const opt = document.createElement('option');
    opt.value = level.toLowerCase();
    opt.innerText = `⭐ ${level}`;
    priority.appendChild(opt);
  });

  priority.onchange = () => {
    timeBlock.classList.remove('priority-low', 'priority-medium', 'priority-high');
    if (priority.value !== "none") {
      timeBlock.classList.add(`priority-${priority.value}`);
    }
  };

  timeBlock.appendChild(timeLabel);
  timeBlock.appendChild(taskInput);
  timeBlock.appendChild(priority);
  timeBlock.appendChild(checkbox);
  timeBlock.appendChild(saveBtn);

  planner.appendChild(timeBlock);
}

function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${ampm}`;
}
