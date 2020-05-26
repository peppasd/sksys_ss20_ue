
Vue.component('task-item', {
  props: ['text', 'deadline', 'progress'],
  template: `
<tr>	
  <td scope="row" class="w-50 align-middle">{{ text }}</td>
  <td class="align-middle">{{ deadline }}</td>
  <td class="align-middle">
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 70%;" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{{ progress }}%</div>
    </div>
  </td>
  <td class="align-middle text-right">
    <button type="button" onclick="window.location.href='edit.html'" class="btn btn-primary mb-2 mb-lg-0 mr-2">Edit</button>
    <button type="button" class="btn btn-danger">Delete</button>
  </td>
</tr>
`
})

Vue.component('task-table', {
  props: ['tasks'],
  template: `
<div class="table-responsive">
	<table class="table">
		<thead>
			<tr>
				<th scope="col">Task</th>
				<th scope="col">Deadline</th>
				<th scope="col">Progress</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<task-item v-for="task in tasks" v-bind:key="task.id" v-bind:text="task.text"
				v-bind:deadline="task.deadline" v-bind:progress="task.progress"></task-item>
    </tbody>
  </div>
  </table>
</div>
`
})

//GET request for the tasks

var app = new Vue({
  el: '#vue-app',
  data: {
    tasks: [
      {
        id: "1",
        text: "hello world",
        deadline: "20/5/2020",
        progress: "70"
      },
    ] //rasks
  }
})