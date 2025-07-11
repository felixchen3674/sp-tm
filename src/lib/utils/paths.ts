export const paths = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
  },
  dashboard: "/dashboard",
  vitalTasks: "/vital-tasks",
  tasks: "/tasks",
  taskPriority: "/task-priority",
  settings: "/settings",
};

export const publicRoutes = [paths.auth.login, paths.auth.signup];
export const protectedRoutes = [paths.dashboard, paths.settings, paths.tasks];
