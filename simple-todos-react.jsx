// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render(<App />, document.getElementById("render-target"));
  });
}

Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting the task
    if (! Meteor.userId()) {
      throw new Meteor.error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  removeTask(taskId) {
    Tasks.remove(taskId)
  },

  setChecked(taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked } });
  }
});