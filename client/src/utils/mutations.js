import { gql } from '@apollo/client';

// User mutations
export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        email
      }
    }
  }     
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      username
      email
    }
  }
`;

// Assignment mutations
export const ADD_ASSIGNMENT = gql`
  mutation addAssignment($title: String!, $question: String!, $due_date: String!) {
    addAssignment(title: $title, question: $question, due_date: $due_date, course: $course) {
      _id
      title
      question
      alert
    }
  }
`;

export const UPDATE_ASSIGNMENT = gql`
  mutation updateAssignment($_id: ID!, $title: String, $question: String, $due_date: String, $alert: String, $assignmentResponse: String) {
    updateAssignment(_id: $_id, title: $title, question: $question, due_date: $due_date, alert: $alert, assignmentResponse: $assignmentResponse) {
      _id
      title
      description
      dueDate
      course
    }
  }
`;

export const DELETE_ASSIGNMENT = gql`
  mutation deleteAssignment($assignmentId: ID!) {
    deleteAssignment(assignmentId: $assignmentId) {
      _id
      title
      question
      due_date
      alert
      assignmentResponse
    }
  }
`;

// Todo mutations
export const ADD_TODO_LIST = gql`
  mutation addTodoList($title: String!, $todo: String!, priority: String!) {
    addTodoList(title: $title, todo: $todo, priority: $priority) {
      _id
      title
      todo
      priority
    }
  }
`;

export const UPDATE_TODO_LIST = gql`
  mutation updateTodoList($_id: ID!, $title: String, $todo: String, $priority: String) {
    updateTodoList(_id: $_id, title: $title, todo: $todo, priority: $priority) {
      _id
      title
      todo
      priority
    }
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation deleteTodoList($todoListId: ID!) {
    deleteTodoList(_id: $todoListId) {
      _id
      title
      todo
      priority
    }
  }
`;

// Alert mutations
export const ADD_ALERT = gql`
  mutation addAlert($message: String!, $severity: String!) {
    addAlert(message: $message, severity: $severity) {
      _id
      message
      severity
    }
  }
`;

export const REMOVE_ALERT = gql`
  mutation removeAlert($_id: ID!) {
    removeAlert(_id: $_id) {
      _id
      message
      severity
    }
  }
`;

export const UPDATE_ALERT = gql`
  mutation updateAlert($alertId: ID!, $message: String, $severity: String) {
    updateAlert(_id: $alertId, message: $message, severity: $severity) {
      _id
      message
      severity
    }
  }
`;

// Course mutations
export const ADD_COURSE = gql`
  mutation addCourse($title: String!, $description: String!, $startDate: String!, $endDate: String!) {
    addCourse(title: $title, description: $description, startDate: $startDate, endDate: $endDate) {
      _id
      title
      description
      quiz
      assignment
      lessonNotes
      price
      startDate
      endDate
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($courseId: ID!, $title: String, $description: String, $startDate: String, $endDate: String!, $quiz: ID, $assignment: ID, $lessonNotes: ID, $price: Float) {
    updateCourse(_id: $courseId, title: $title, description: $description, startDate: $startDate, endDate: $endDate, quiz: $quiz, assignment: $assignment, lessonNotes: $lessonNotes, price: $price) {
      _id
      title
      description
      quiz
      assignment
      lessonNotes
      price
      startDate
      endDate
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: ID!) {
    deleteCourse(_id: $courseId) {
      _id
      title
      description
      quiz
      assignment
      lessonNotes
      price
      startDate
      endDate
    }
  }
`;

// Role mutations
export const ADD_ROLE = gql`
  mutation addRole($title: String!, $description: String!) {
    addRole(title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($roleId: ID!, $title: String!, $description: String!) {
    updateRole(roleId: $roleId, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($roleId: ID!) {
    deleteRole(roleId: $roleId) {
      _id
      title
      description
    }
  }
`;