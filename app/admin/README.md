# Admin Content Upload Guide

This guide explains, for each Admin section, what you need to upload, how images are handled, and which public pages consume the data.

## Overview
- Admin sections: Dashboard, Properties, Communities, Blogs, Users, Settings.
- Storage: Admin forms save items to JSON files under `data/admin/<entity>.json` via API routes.
  - API: `/api/admin/[entity]` writes to `data/admin/<entity>.json` [route.js](file:///d:/vikas-codes/Property-new-main/app/api/admin/%5Bentity%5D/route.js#L1-L25).
- Public pages currently read from static data modules:
  - Properties: [properties.js](file:///d:/vikas-codes/Property-new-main/data/properties.js)
  - Blogs: [blogs.js](file:///d:/vikas-codes/Property-new-main/data/blogs.js)
  - Communities: [communities.js](file:///d:/vikas-codes/Property-new-main/data/communities.js)
- Important: Items you add in Admin are stored under `data/admin/*.json` and do not automatically replace the static data modules used by public pages. See “Publish to Site” below to wire Admin data live.

## Properties
- Where to upload: Admin → Properties [page.jsx](file:///d:/vikas-codes/Property-new-main/app/admin/properties/page.jsx#L50-L84)
- Fields to provide:
  - Title, Location, Price, Beds, Baths, Sqft
  - Image (primary), Image 1, Image 2, Image 3
  - Description
- How images are used:
  - Primary image appears in cards and detail previews.
  - Additional images can be shown in galleries and preview grids.
- Where properties appear publicly (static source):
  - Home carousel/grid: [PropertyGrid.jsx](file:///d:/vikas-codes/Property-new-main/components/PropertyGrid.jsx#L5-L20)
  - Search suggestions: [SearchForm.jsx](file:///d:/vikas-codes/Property-new-main/components/SearchForm.jsx#L8-L19)
  - Community pages: [community/[slug]/page.jsx](file:///d:/vikas-codes/Property-new-main/app/community/%5Bslug%5D/page.jsx#L5-L21)
- Current source vs Admin:
  - Public pages use `data/properties.js`.
  - Admin saves to `data/admin/properties.json` [properties.json](file:///d:/vikas-codes/Property-new-main/data/admin/properties.json).

## Communities
- Where to upload: Admin → Communities [page.jsx](file:///d:/vikas-codes/Property-new-main/app/admin/communities/page.jsx#L51-L75)
- Fields to provide:
  - Name, Slug, Projects
  - Image (primary), Image 1, Image 2, Image 3
- Where communities appear publicly (static source):
  - Community landing and detail: [community/[slug]/page.jsx](file:///d:/vikas-codes/Property-new-main/app/community/%5Bslug%5D/page.jsx)
  - Search suggestions: [SearchForm.jsx](file:///d:/vikas-codes/Property-new-main/components/SearchForm.jsx#L8-L19)
- Current source vs Admin:
  - Public pages use `data/communities.js`.
  - Admin saves to `data/admin/communities.json` [communities.json](file:///d:/vikas-codes/Property-new-main/data/admin/communities.json).

## Blogs
- Where to upload: Admin → Blogs [page.jsx](file:///d:/vikas-codes/Property-new-main/app/admin/blogs/page.jsx#L51-L77)
- Fields to provide:
  - Title, Slug, Status
  - Image (primary), Image 1, Image 2, Image 3
  - Excerpt, Content
- Where blogs appear publicly (static source):
  - Blog list: [app/blog/page.jsx](file:///d:/vikas-codes/Property-new-main/app/blog/page.jsx#L4-L15) and [BlogMasonry.jsx](file:///d:/vikas-codes/Property-new-main/components/blog/BlogMasonry.jsx#L19-L22)
  - Blog detail: [app/blog/[slug]/page.jsx](file:///d:/vikas-codes/Property-new-main/app/blog/%5Bslug%5D/page.jsx#L6-L15)
- Current source vs Admin:
  - Public pages use `data/blogs.js` (fields include `slug`, `title`, `date`, `tag`, `image`, `rating`, optional `gallery`).
  - Admin saves to `data/admin/blogs.json` [blogs.json](file:///d:/vikas-codes/Property-new-main/data/admin/blogs.json).


## Users
- Where to upload: Admin → Users [page.jsx](file:///d:/vikas-codes/Property-new-main/app/admin/users/page.jsx#L48-L68)
- Fields to provide:
  - Name, Email, Role
- Auth note:
  - Login uses `data/users` and `lib/auth`. Admin Users list is not currently used for authentication.
  - Login API: [login/route.js](file:///d:/vikas-codes/Property-new-main/app/api/auth/login/route.js)

## Settings
- Where: Admin → Settings [page.jsx](file:///d:/vikas-codes/Property-new-main/app/admin/settings/page.jsx)
- Fields:
  - Site name, Timezone
- Purpose:
  - Local project preferences; not persisted via API yet.

## Image Upload & Cropping
- Uploader component: [ImageUploader.jsx](file:///d:/vikas-codes/Property-new-main/components/admin/ImageUploader.jsx)
- Flow:
  - Accepts `image/*`. You can crop and zoom before upload.
  - Uploads to `/api/upload`, which saves files under `public/uploads/` and returns a URL [upload/route.js](file:///d:/vikas-codes/Property-new-main/app/api/upload/route.js#L16-L21).
- Recommendations:
  - Primary hero/banner: 16:9, ~1200–1600px width.
  - Grid cards: 4:3 or 16:9, ≥800px width.
  - Keep file sizes reasonable for performance.

## Publish to Site (Wire Admin Data)
Public pages currently import static modules (`data/*.js`). To make Admin-managed content drive the site:
- Option A: Fetch from API
  - Replace imports like `import { properties } from "@/data/properties";` with `await fetch("/api/admin/properties")` and consume `items`.
  - Example sources:
    - Properties grid: [PropertyGrid.jsx](file:///d:/vikas-codes/Property-new-main/components/PropertyGrid.jsx#L5-L20)
    - Blog list/detail: [app/blog/page.jsx](file:///d:/vikas-codes/Property-new-main/app/blog/page.jsx#L4-L15), [app/blog/[slug]/page.jsx](file:///d:/vikas-codes/Property-new-main/app/blog/%5Bslug%5D/page.jsx#L6-L15)
    - Community pages: [community/[slug]/page.jsx](file:///d:/vikas-codes/Property-new-main/app/community/%5Bslug%5D/page.jsx)
- Option B: Build-time generation
  - Transform `data/admin/*.json` into `data/*.js` during build to keep static imports while using Admin-managed content.

## Notes
- Admin Dashboard links: [AdminSidebar.jsx](file:///d:/vikas-codes/Property-new-main/components/admin/AdminSidebar.jsx#L7-L15)
- Admin layout and scroll container: [layout.jsx](file:///d:/vikas-codes/Property-new-main/app/admin/layout.jsx)
- If you want specific pages to reflect Admin uploads, specify which routes to wire first, and we’ll update components to read from `/api/admin/*`.
