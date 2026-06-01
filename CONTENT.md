# Smart Loans – Content Map

All editable content is stored in **MongoDB** and managed via the `/admin` dashboard.
Each section below corresponds to a MongoDB collection and an admin page.

---

## 1. Site Settings (`/admin/settings`)

Collection: `settings`

| Field          | Default                              |
| -------------- | ------------------------------------ |
| `siteName`     | Smart Loans                          |
| `tagline`      | Banking & Business Loan              |
| `phone1`       | +1 (800) 694-8956                    |
| `phone2`       | 88 487 983 576                       |
| `email`        | hello@Smart Loans.com                |
| `address`      | 42 Finance Tower, New York, NY 10001 |
| `workingHours` | Mon – Sat: 9 AM – 6 PM               |
| `facebookUrl`  | #                                    |
| `twitterUrl`   | #                                    |
| `linkedinUrl`  | #                                    |
| `instagramUrl` | #                                    |
| `youtubeUrl`   | #                                    |

---

## 2. Hero Section (`/admin/hero`)

Collection: `hero`

| Field          | Default                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------- |
| `eyebrow`      | Trusted by 50,000+ customers                                                                  |
| `title`        | Fast, Flexible & Trusted Loan Solutions                                                       |
| `subtitle`     | Get instant approval with lowest interest rates, flexible repayment, and zero hidden charges. |
| `ctaPrimary`   | Apply Now                                                                                     |
| `ctaSecondary` | Learn More                                                                                    |
| `stat1Value`   | 50K+                                                                                          |
| `stat1Label`   | Happy Customers                                                                               |
| `stat2Value`   | ₹500Cr+                                                                                       |
| `stat2Label`   | Disbursed                                                                                     |
| `stat3Value`   | 24 Hrs                                                                                        |
| `stat3Label`   | Approval Time                                                                                 |
| `image`        | /images/banner/banner_img.png                                                                 |

---

## 3. Stats Section (`/admin/stats`)

Collection: `stats` (array of stat items)

| Field   | Example         |
| ------- | --------------- |
| `icon`  | icofont-users   |
| `value` | 50,000+         |
| `label` | Happy Customers |
| `color` | #8180e0         |
| `order` | 1               |

---

## 4. Services (`/admin/services`)

Collection: `services` (array)

| Field      | Example                         |
| ---------- | ------------------------------- |
| `icon`     | flaticon-money                  |
| `rate`     | 9.35%                           |
| `title`    | Personal Loan                   |
| `amount`   | $2,00,000                       |
| `tenure`   | Up to 60 months                 |
| `desc`     | Ideal for urgent expenses...    |
| `features` | ["No collateral required", ...] |
| `color`    | #8180e0                         |
| `order`    | 1                               |

---

## 5. Why Choose Us (`/admin/why-choose-us`)

Collection: `whychooseus` (array)

| Field   | Example                                   |
| ------- | ----------------------------------------- |
| `icon`  | icofont-flash                             |
| `title` | Lightning Fast Approval                   |
| `desc`  | Get your loan approved within 24 hours... |
| `color` | #8180e0                                   |
| `bg`    | rgba(129,128,224,0.10)                    |
| `order` | 1                                         |

---

## 6. Team Members (`/admin/team`)

Collection: `team` (array)

| Field   | Example            |
| ------- | ------------------ |
| `name`  | James Taylor       |
| `role`  | Financial Advisor  |
| `image` | /images/team/1.jpg |
| `order` | 1                  |

---

## 7. Testimonials (`/admin/testimonials`)

Collection: `testimonials` (array)

| Field   | Example                                             |
| ------- | --------------------------------------------------- |
| `name`  | John Smith                                          |
| `role`  | Small Business Owner                                |
| `image` | /images/testimonials/1.jpg                          |
| `text`  | Smart Loans made my loan process incredibly easy... |
| `stars` | 5                                                   |
| `order` | 1                                                   |

---

## 8. Blog Posts (`/admin/blog`)

Collection: `blogposts`

| Field       | Example                                |
| ----------- | -------------------------------------- |
| `title`     | How to get a personal loan easily      |
| `slug`      | how-to-get-personal-loan               |
| `category`  | Personal Finance                       |
| `author`    | Admin                                  |
| `date`      | 2026-04-12                             |
| `image`     | /images/blog/1.jpg                     |
| `excerpt`   | Short description of the post...       |
| `content`   | Full HTML/Markdown content of the post |
| `published` | true                                   |

---

## 9. Loan Applications (`/admin/applications`)

Collection: `applications` (read-only from admin, populated via contact form)

| Field       | Example                                  |
| ----------- | ---------------------------------------- |
| `name`      | John Doe                                 |
| `email`     | john@example.com                         |
| `phone`     | +1 555 0100                              |
| `loanType`  | Personal Loan                            |
| `amount`    | 50000                                    |
| `message`   | Need loan for home renovation            |
| `status`    | pending / reviewed / approved / rejected |
| `createdAt` | 2026-04-12T10:30:00Z                     |

---

## Admin Dashboard Pages

| URL                    | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `/admin`               | Overview – stats cards, recent applications |
| `/admin/hero`          | Edit hero section                           |
| `/admin/stats`         | Manage stats counters                       |
| `/admin/services`      | Add / edit / delete services                |
| `/admin/why-choose-us` | Add / edit / delete features                |
| `/admin/team`          | Add / edit / delete team members            |
| `/admin/testimonials`  | Add / edit / delete testimonials            |
| `/admin/blog`          | Create / edit / publish blog posts          |
| `/admin/applications`  | View & manage loan applications             |
| `/admin/settings`      | Edit global site settings                   |

---

## Environment Variables

Add to `.env.local`:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/Smart Loans
```
