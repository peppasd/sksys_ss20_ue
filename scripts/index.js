Vue.component('edit-table', {
  props: ['task'],
  template: `
  <div class ="d-flex justify-content-center">
    <div class="w-75">
      <h1 class="text-center">Edit Task</h1>
      <form>
        <!-- Description -->
        <div class="form-group">
          <label>&ensp;Desctiption</label>
          <textarea id="text" class="form-control md-textarea" placeholder="Text here." rows="3" v-model="task.text"> {{ task.text }}</textarea>
        </div>
        
        <!--Percent-->
        <div class="form-group">
          <label>&ensp;Percentage</label>
          <span id="perc">%</span>
          <input id="progress" type="number" min="0" max="100" placeholder="100" class="form-control" v-model="task.progress">
        </div>

        <!--Deadline-->				
        <div class="form-group">
          <label>&ensp;Deadline</label>
          <div>
            <input id="deadline" type="date" name="deadline" v-model="task.deadline"> 
          </div>
        </div>
      </form>
      <div class="row justify-content-around">
        <div>
          <button class="btn btn-danger col" onclick="window.location.href='index.html'" type="reset">Cancel</button>
        </div>
        <div>
          <button class="btn btn-primary col" @click="submitEdit">Submit</button>
        </div>
      </div>
    </div>
  </div>
  `,
  mounted: function() {
    document.getElementById('progress').value = this.task.progress;
    document.getElementById('deadline').value = this.task.deadline;
  },
  methods: {
    submitEdit: async function() {
      let task = this.task;
      let response = fetch("http://localhost:3000/tasks/" + this.task._id, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        alert("invalid input")
      }
      else {
        window.location.href='index.html';
      }
    }
  }
})

Vue.component('task-item', {
  props: ['task'],
  template: `
  <tr>	
    <td scope="row" class="w-50 align-middle">{{ task.text }}</td>
    <td class="align-middle">{{ task.deadline }}</td>
    <td class="align-middle">
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{width: task.progress+'%'}" aria-valuemin="0" aria-valuemax="100">{{ task.progress }}%</div>
      </div>
    </td>
    <td class="align-middle text-right">
      <button type="button" @click="$emit('edit')" class="btn btn-primary mb-2 mb-lg-0 mr-2">Edit</button>
      <button type="button" @click="deleteTask" class="btn btn-danger">Delete</button>
    </td>
  </tr>
  `,
  methods: {
    deleteTask: function() {
      //TODO delete
      fetch("http://localhost:3000/tasks/" + this.task._id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
      window.location.href='index.html';
    }
  }
})

Vue.component('task-table', {
  data: function () {
    return {
      tasks: [],
      showEdit: false,
      editTask: null
    }
  },
  mounted: async function() {
    let res = await fetch("http://localhost:3000/tasks/", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    let body = await res.json();
    this.tasks = body;
  },
  template: `
  <div>
    <div v-if="!showEdit" class="table-responsive">
      <h1 class="text-center">My Tasks</h1>
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
          <task-item 
            v-for="task in tasks"
            @edit="showEdit = true; editTask = task"
            v-bind:key="task._id"
            v-bind:task="task">
          </task-item>
        </tbody>
      </table>
    </div>
    <div v-else>
      <edit-table v-bind:task="editTask"></edit-table>
    </div>
  </div>
  `,
})

var app = new Vue({
  el: '#vue-app'
})