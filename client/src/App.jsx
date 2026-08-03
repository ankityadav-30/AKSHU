// APP/client/src/App.jsx

import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout.jsx";
import AdminLayout from "./admin/layout/AdminLayout.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import PageLoader from "./components/common/PageLoader.jsx";
import { ROLES, ROUTES } from "./utils/constants.js";

/* ====================================
   Public Pages (lazy loaded)
==================================== */

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.jsx"));
const Team = lazy(() => import("./pages/Team.jsx"));
const TeamProfile = lazy(() => import("./pages/TeamProfile.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

/* ====================================
   Admin Pages (lazy loaded)
==================================== */

const AdminDashboard = lazy(() => import("./admin/pages/Dashboard.jsx"));
const AdminBlogs = lazy(() => import("./admin/pages/blogs/BlogList.jsx"));
const BlogEditor = lazy(() => import("./admin/pages/blogs/BlogEditor.jsx"));
const AdminProjects = lazy(() => import("./admin/pages/projects/ProjectList.jsx"));
const ProjectEditor = lazy(() => import("./admin/pages/projects/ProjectEditor.jsx"));
const AdminTeam = lazy(() => import("./admin/pages/team/TeamList.jsx"));
const TeamEditor = lazy(() => import("./admin/pages/team/TeamEditor.jsx"));
const AdminContacts = lazy(() => import("./admin/pages/contacts/ContactList.jsx"));
const AdminNewsletter = lazy(() => import("./admin/pages/newsletter/NewsletterList.jsx"));
const AdminUploads = lazy(() => import("./admin/pages/Uploads.jsx"));
const AdminAnalytics = lazy(() => import("./admin/pages/Analytics.jsx"));
const AdminProfile = lazy(() => import("./admin/pages/Profile.jsx"));
const AdminChat = lazy(() => import("./admin/pages/chat/ChatManagement.jsx"));
const AdminLeads = lazy(() => import("./admin/pages/leads/LeadsManagement.jsx"));

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* ==============================
                    Public Routes
                ============================== */}
                <Route element={<MainLayout />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.ABOUT} element={<About />} />
                    <Route path={ROUTES.SERVICES} element={<Services />} />
                    <Route path={ROUTES.PROJECTS} element={<Projects />} />
                    <Route path={ROUTES.PROJECT_DETAIL()} element={<ProjectDetail />} />
                    <Route path={ROUTES.BLOG} element={<Blog />} />
                    <Route path={ROUTES.BLOG_DETAIL()} element={<BlogDetail />} />
                    <Route path={ROUTES.TEAM} element={<Team />} />
                    <Route path="/team/:id" element={<TeamProfile />} />
                    <Route path={ROUTES.CONTACT} element={<Contact />} />
                </Route>

                {/* Login */}
                <Route path={ROUTES.LOGIN} element={<Login />} />

                {/* ==============================
                    Admin Routes (Protected)
                ============================== */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                ROLES.SUPER_ADMIN,
                                ROLES.ADMIN,
                                ROLES.EDITOR,
                            ]}
                        >
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />

                    {/* Blogs */}
                    <Route path={ROUTES.ADMIN_BLOGS} element={<AdminBlogs />} />
                    <Route path={ROUTES.ADMIN_BLOG_NEW} element={<BlogEditor />} />
                    <Route path={ROUTES.ADMIN_BLOG_EDIT()} element={<BlogEditor />} />

                    {/* Projects */}
                    <Route
                        path={ROUTES.ADMIN_PROJECTS}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminProjects />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ADMIN_PROJECT_NEW}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <ProjectEditor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ADMIN_PROJECT_EDIT()}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <ProjectEditor />
                            </ProtectedRoute>
                        }
                    />

                    {/* Team */}
                    <Route
                        path={ROUTES.ADMIN_TEAM}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminTeam />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ADMIN_TEAM_NEW}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <TeamEditor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ADMIN_TEAM_EDIT()}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <TeamEditor />
                            </ProtectedRoute>
                        }
                    />

                    {/* Contacts */}
                    <Route
                        path={ROUTES.ADMIN_CONTACTS}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminContacts />
                            </ProtectedRoute>
                        }
                    />

                    {/* Newsletter */}
                    <Route
                        path={ROUTES.ADMIN_NEWSLETTER}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminNewsletter />
                            </ProtectedRoute>
                        }
                    />

                    {/* Uploads */}
                    <Route
                        path={ROUTES.ADMIN_UPLOADS}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminUploads />
                            </ProtectedRoute>
                        }
                    />

                    {/* Analytics */}
                    <Route
                        path={ROUTES.ADMIN_ANALYTICS}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminAnalytics />
                            </ProtectedRoute>
                        }
                    />

                    {/* AI Chat Logs */}
                    <Route
                        path={ROUTES.ADMIN_CHAT}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminChat />
                            </ProtectedRoute>
                        }
                    />

                    {/* Sales Leads */}
                    <Route
                        path={ROUTES.ADMIN_LEADS}
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                                <AdminLeads />
                            </ProtectedRoute>
                        }
                    />

                    {/* Profile */}
                    <Route path={ROUTES.ADMIN_PROFILE} element={<AdminProfile />} />
                </Route>

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;