function submitTask() {
  //TODO submit new task
  let text = document.getElementById("text").value;
  let progress = document.getElementById("progress").value;
  let deadline = document.getElementById("deadline").value;

  let task = {
    text: text,
    progress: progress,
    deadline: deadline
  }

  fetch("http://localhost:3000/tasks/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  window.location.href='index.html';
}