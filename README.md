# ER Agency - Modern Digital Portfolio & CMS

## 1. Project Overview
ER Agency is a high-end, production-grade digital agency website designed to showcase a creative portfolio with a seamless content management experience. The application features a visually stunning frontend with advanced 3D backgrounds and smooth animations, coupled with a robust Admin Dashboard for real-time content updates.

**Main Capabilities:**
- **Dynamic Portfolio:** Showcase projects with detailed descriptions, categories, and high-quality imagery.
- **CMS Dashboard:** A private administrative area to manage projects, team members, testimonials, and blog posts.
- **Real-time Updates:** Powered by Supabase, content changes in the dashboard are reflected instantly on the live site.
- **Interactive UI:** Immersive user experience using Framer Motion, Three.js, and GSAP.
- **Secure Authentication:** Role-based access control for administrative functions.

## 2. Tech Stack
The project leverages a modern, high-performance stack chosen for scalability, developer experience, and user engagement:

- **Next.js (App Router):** Provides a robust framework for server-side rendering, optimized routing, and excellent SEO capabilities.
- **TypeScript:** Ensures type safety across the application, reducing runtime errors and improving maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid, consistent, and responsive UI development.
- **Framer Motion:** Powering the complex layout animations and interactive elements.
- **Three.js & React Three Fiber:** Used for the immersive 3D particle backgrounds and interactive canvas elements.
- **GSAP:** Handles high-performance scroll-triggered animations.
- **Supabase:**
    - **Database:** PostgreSQL for reliable, relational data storage.
    - **Authentication:** Secure user management and session handling.
    - **Storage:** Scalable object storage for project assets and team photos.

## 3. Project Architecture
The application follows a modular architecture separating concerns between the frontend UI, administrative logic, and backend services.

- **Frontend:** Built with React 19 and Vite for lightning-fast development and optimized production builds.
- **Backend Services:** Abstracted into a dedicated `api.ts` service layer that communicates with Supabase.
- **State Management:** Uses React hooks (useState, useEffect) for local state and Supabase real-time subscriptions for global data synchronization.
- **Database:** A relational PostgreSQL schema hosted on Supabase, optimized for fast queries and data integrity.

## 4. Features Documentation

### Projects Portfolio
The portfolio section displays featured and standard projects. Each project includes a title, category, year, and a high-resolution image. The layout uses a staggered grid with parallax effects.

### Services
A dedicated section highlighting the agency's core capabilities (Strategic Vision, Immersive Design, Future Tech, etc.), styled with custom icons and hover-triggered glassmorphism effects.

### Team Members
Showcases the creative minds behind the agency. Each member card features an image, role, bio, and social links, with smooth entrance animations.

### Testimonials
A dynamic carousel of client feedback, including ratings and company details, providing social proof and building trust.

### Admin Dashboard
A secure, private area accessible via `/admin`. It provides a comprehensive interface for managing all site content without touching the code.

### CMS Content Editing
Admins can create, read, update, and delete (CRUD) projects, team members, testimonials, and blog posts through intuitive forms.

### Image Uploads
Integrated with Supabase Storage. When an admin uploads an image for a project or team member, it is automatically stored in a public bucket, and the resulting URL is saved to the database.

### Animations
The site features several layers of animation:
- **Background:** A 3D particle field and floating spheres using Three.js.
- **Scroll Effects:** Reveal animations and parallax scrolling using GSAP and Framer Motion.
- **Interactions:** Hover states, button glows, and smooth page transitions.

## 5. Database Structure

### `projects` Table
| Column | Type | Description |
| --- | --- | --- |
| `id` | UUID | Primary Key |
| `display_id` | Text | Formatted ID for UI display (e.g., "01") |
| `title` | Text | Project name |
| `category` | Text | Industry or service type |
| `image_url` | Text | Link to asset in Supabase Storage |
| `year` | Text | Completion year |
| `description` | Text | Detailed project overview |
| `is_featured` | Boolean | Whether to show in the featured section |
| `sort_order` | Integer | Custom ordering for the grid |

### `team_members` Table
| Column | Type | Description |
| --- | --- | --- |
| `id` | UUID | Primary Key |
| `name` | Text | Member's full name |
| `role` | Text | Job title |
| `bio` | Text | Short professional summary |
| `image_url` | Text | Link to profile photo |
| `linkedin_url` | Text | Optional social link |
| `sort_order` | Integer | Ordering in the team grid |

### `testimonials` Table
| Column | Type | Description |
| --- | --- | --- |
| `id` | UUID | Primary Key |
| `name` | Text | Client name |
| `role` | Text | Client job title |
| `company` | Text | Client company |
| `content` | Text | The testimonial text |
| `rating` | Integer | 1-5 star rating |

## 6. Authentication & Security
Authentication is handled via **Supabase Auth**. The Admin Dashboard is protected by a `ProtectedRoute` component that verifies the user's session before rendering.

**Security Features:**
- **Row Level Security (RLS):** Database tables are configured with RLS policies. Public users have "Read Only" access, while authenticated admins have full CRUD permissions.
- **Environment Variables:** Sensitive API keys and Supabase credentials are kept in `.env` files and never exposed in the client-side code without the `VITE_` prefix where appropriate.

## 7. Admin Dashboard Usage
1. **Login:** Navigate to `/admin/login` and enter administrative credentials.
2. **Overview:** View high-level stats on projects and recent activity.
3. **Management:** Use the sidebar to navigate between Projects, Team, and Blog management pages.
4. **Editing:** Click the "Edit" icon on any item to open a modal with a pre-filled form.
5. **Deletion:** Use the "Trash" icon to remove items (includes a confirmation prompt).

## 8. File Upload System
The application uses a custom storage utility in `api.ts`:
- **Bucket:** Assets are organized into buckets (e.g., `projects`, `blog`).
- **Process:** Files are renamed with a unique hash to prevent collisions, uploaded to Supabase Storage, and the public URL is returned and persisted in the database.
- **Cleanup:** When a record is deleted, the associated file is also removed from storage to save space.

## 9. Deployment
The project is optimized for deployment on platforms like **Vercel** or **Netlify**:

1. **Build:** Run `npm run build` to generate the production `dist` folder.
2. **Environment:** Set up the following environment variables in your deployment dashboard:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
3. **Database:** Ensure your Supabase project has the required tables and RLS policies configured.

## 10. Future Improvements
- **Blog System:** Fully implement the blog frontend to display the articles managed in the CMS.
- **Analytics Dashboard:** Integrate Google Analytics or a custom dashboard to track user engagement.
- **SEO Improvements:** Implement dynamic meta tags and OpenGraph images for each project and blog post.
- **Performance Optimization:** Implement image optimization (Next.js Image component) and code splitting for heavy 3D assets.
