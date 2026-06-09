import { createBrowserRouter } from 'react-router';
import { PublicLayout } from './components/PublicLayout';
import { DashboardLayout } from './components/DashboardLayout';
import { HomePage } from './pages/public/HomePage';
import { CoursesPage } from './pages/public/CoursesPage';
import { MockTestPage } from './pages/public/MockTestPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentCourses } from './pages/student/StudentCourses';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentResults } from './pages/student/StudentResults';
import { StudentPayments } from './pages/student/StudentPayments';
import { IELTSDashboard } from './pages/ielts/IELTSDashboard';
import { IELTSListening } from './pages/ielts/IELTSListening';
import { IELTSReading } from './pages/ielts/IELTSReading';
import { IELTSWriting } from './pages/ielts/IELTSWriting';
import { IELTSSpeaking } from './pages/ielts/IELTSSpeaking';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherStudents } from './pages/teacher/TeacherStudents';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';
import { WritingEvaluation } from './pages/teacher/WritingEvaluation';
import { SpeakingEvaluation } from './pages/teacher/SpeakingEvaluation';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminTeachers } from './pages/admin/AdminTeachers';
import { AdminBatches } from './pages/admin/AdminBatches';
import { AdminAccounts } from './pages/admin/AdminAccounts';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'courses', Component: CoursesPage },
      { path: 'mock-test', Component: MockTestPage },
    ],
  },
  { path: '/login', Component: LoginPage },
  { path: '/register', Component: RegisterPage },
  {
    path: '/student',
    Component: DashboardLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: 'courses', Component: StudentCourses },
      { path: 'attendance', Component: StudentAttendance },
      { path: 'assignments', Component: StudentAssignments },
      { path: 'results', Component: StudentResults },
      { path: 'payments', Component: StudentPayments },
      { path: 'ielts', Component: IELTSDashboard },
      { path: 'ielts/listening', Component: IELTSListening },
      { path: 'ielts/reading', Component: IELTSReading },
      { path: 'ielts/writing', Component: IELTSWriting },
      { path: 'ielts/speaking', Component: IELTSSpeaking },
    ],
  },
  {
    path: '/teacher',
    Component: DashboardLayout,
    children: [
      { index: true, Component: TeacherDashboard },
      { path: 'students', Component: TeacherStudents },
      { path: 'assignments', Component: TeacherAssignments },
      { path: 'writing-eval', Component: WritingEvaluation },
      { path: 'speaking-eval', Component: SpeakingEvaluation },
    ],
  },
  {
    path: '/admin',
    Component: DashboardLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'leads', Component: AdminLeads },
      { path: 'students', Component: AdminStudents },
      { path: 'teachers', Component: AdminTeachers },
      { path: 'batches', Component: AdminBatches },
      { path: 'accounts', Component: AdminAccounts },
      { path: 'reports', Component: AdminReports },
      { path: 'settings', Component: AdminSettings },
    ],
  },
]);
