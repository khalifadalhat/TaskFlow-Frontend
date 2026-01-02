export interface DashboardKPIs {
  totalUsers: number;
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalTeams: number;
  overdueTasks: number;
  overdueProjects: number;
  unassignedTasks: number;
}

export interface UserAnalytics {
  newUsers: number;
  userGrowthRate: number;
  usersByRole: {
    admin: number;
    manager: number;
    user: number;
  };
}

export interface ProjectAnalytics {
  newProjects: number;
  projectsByStatus: {
    planning: number;
    inProgress: number;
    completed: number;
    onHold: number;
  };
  completionRate: number;
  avgProjectDuration: number;
  overdueProjects: number;
}

export interface TaskAnalytics {
  newTasks: number;
  tasksByStatus: {
    todo: number;
    inProgress: number;
    review: number;
    done: number;
  };
  tasksByPriority: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  completionRate: number;
  overdueTasks: number;
  unassignedTasks: number;
  avgTasksPerUser: number;
}

export interface DashboardData {
  timeframe: string;
  kpis: DashboardKPIs;
  userAnalytics: UserAnalytics;
  projectAnalytics: ProjectAnalytics;
  taskAnalytics: TaskAnalytics;
}

export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

export interface MemberDashboardKPIs {
  myProjects: number;
  activeProjects: number;
  myTasks: number;
  completedTasks: number;
  overdueTasks: number;
  tasksDueThisWeek: number;
  completionRate: number;
}

export interface MemberDashboardData {
  timeframe: string;
  kpis: MemberDashboardKPIs;
}

export interface MemberDashboardState {
  data: MemberDashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}
