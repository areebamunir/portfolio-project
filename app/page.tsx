"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
  Textarea,
} from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function Icon({
  name,
  className,
}: {
  name: "linkedin" | "github" | "twitter" | "topmate";
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    className: `w-5 h-5 ${className ?? ""}`.trim(),
    "aria-hidden": true,
  } as const;

  if (name === "linkedin") {
    return (
      <svg {...common}>
        <path d="M20.5 3h-17A.5.5 0 0 0 3 3.5v17a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5v-17A.5.5 0 0 0 20.5 3ZM8.1 19H5.7V10.2h2.4V19Zm-1.2-9.9a1.4 1.4 0 1 1 0-2.8a1.4 1.4 0 0 1 0 2.8ZM19 19h-2.4v-4.3c0-1-.0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H11.2V10.2h2.3v1.2h.0c.3-.6 1.1-1.3 2.3-1.3c2.5 0 3 1.6 3 3.8V19Z" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg {...common}>
        <path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4c-.6-1.3-1.4-1.7-1.4-1.7c-1.1-.7.1-.7.1-.7c1.2.1 1.9 1.3 1.9 1.3c1.1 1.9 2.9 1.3 3.6 1a2.7 2.7 0 0 1 .8-1.7c-2.6-.3-5.2-1.3-5.2-5.7c0-1.3.5-2.4 1.3-3.2c-.1-.3-.6-1.6.1-3.3c0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.2-1.5 3.3-1.2 3.3-1.2c.7 1.7.2 3 .1 3.3c.8.8 1.3 1.9 1.3 3.2c0 4.4-2.7 5.4-5.3 5.7c.4.4.8 1.2.8 2.5V22c0 .4.2.7.8.6A11.2 11.2 0 0 0 12 .8Z" />
      </svg>
    );
  }

  if (name === "twitter") {
    return (
      <svg {...common}>
        <path
          d="M20.8 7.2c-.6.3-1.3.5-2 .6c.7-.4 1.2-1.1 1.4-1.9c-.7.4-1.4.7-2.2.9c-.6-.7-1.5-1.1-2.6-1.1c-2.2 0-3.7 2-3.2 4.1c-3-.1-5.7-1.6-7.5-3.9c-1 1.8-.5 4.1 1.3 5.3c-.6 0-1.2-.2-1.7-.5c0 1.9 1.3 3.6 3.3 4c-.5.1-1.1.2-1.6.1c.5 1.6 2 2.8 3.8 2.8c-1.7 1.3-3.9 1.9-6.1 1.7c1.8 1.1 4 1.8 6.3 1.8c7.6 0 11.9-6.5 11.6-12.3c.8-.6 1.3-1.2 1.8-1.9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // topmate: simple "T" monogram inside a badge
  return (
    <svg {...common}>
      <path d="M6 7.4h12v2.2h-4.8V18h-2.4V9.6H6V7.4Z" />
    </svg>
  );
}

function SkillIcon({ name }: { name: "data" | "cloud" | "code" | "ml" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    "aria-hidden": true,
  } as const;

  if (name === "data") {
    return (
      <svg {...common}>
        <path d="M7 7c0-2 2.2-3.5 5-3.5S17 5 17 7s-2.2 3.5-5 3.5S7 9 7 7Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 7v10c0 2 2.2 3.5 5 3.5s5-1.5 5-3.5V7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 12c0 2 2.2 3.5 5 3.5s5-1.5 5-3.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "cloud") {
    return (
      <svg {...common}>
        <path
          d="M7 18h10a4 4 0 0 0 .9-7.9A5 5 0 0 0 8.4 8.6A3.5 3.5 0 0 0 7 18Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8.8 16.2h6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg {...common}>
        <path d="M9 8l-3 4l3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 8l3 4l-3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 17l2-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M8.2 15.8a4.5 4.5 0 1 1 7.6-3.2c0 .7-.2 1.4-.5 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.5 12.3h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 10.8v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AchievementIcon({ type }: { type: "award" | "talk" | "workshop" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    "aria-hidden": true,
  } as const;

  if (type === "award") {
    return (
      <svg {...common}>
        <path
          d="M12 3l2.2 4.5L19 8.3l-3.5 3.4l.8 4.8L12 14.5L7.7 16.5l.8-4.8L5 8.3l4.8-.8L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 14.6V21l3-1.6l3 1.6v-6.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "talk") {
    return (
      <svg {...common}>
        <path
          d="M6 10a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-1.8L8 19v-3.2A5 5 0 0 1 6 11v-1Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M10 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 13h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M7 7h10v10H7V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 5h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.5 11.5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14.5h3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={("h-4 w-4 " + (className ?? "")).trim()}
      aria-hidden="true"
    >
      <path
        d="M12 3v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 10.5L12 13.9l3.5-3.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17.5c0-.8.7-1.5 1.5-1.5h11c.8 0 1.5.7 1.5 1.5v2c0 .8-.7 1.5-1.5 1.5h-11C5.7 21 5 20.3 5 19.5v-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={("h-4 w-4 " + (className ?? "")).trim()}
      aria-hidden="true"
    >
      <path
        d="M10 6H7.5C6.7 6 6 6.7 6 7.5v9C6 17.3 6.7 18 7.5 18h9c.8 0 1.5-.7 1.5-1.5V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6h4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6l-7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolBadge({ label }: { label: string }) {
  const iconMap: Record<string, string> = {
    Python: "/tool-icons/python.svg",
    SQL: "/tool-icons/sql.svg",
    "C#": "/tool-icons/csharp.svg",
    Databricks: "/tool-icons/databricks.svg",
    Snowflake: "/tool-icons/snowflake.svg",
    Airflow: "/tool-icons/airflow.svg",
    dbt: "/tool-icons/dbt.svg",
    "Spark/PySpark": "/tool-icons/spark.svg",
    Spark: "/tool-icons/spark.svg",
    AWS: "/tool-icons/aws.svg",
    Azure: "/tool-icons/azure.svg",
    Docker: "/tool-icons/docker.svg",
    Git: "/tool-icons/git.svg",
    "CI/CD": "/tool-icons/cicd.svg",
    "Power BI": "/tool-icons/powerbi.svg",
    Tableau: "/tool-icons/tableau.svg",
  };

  const icon = iconMap[label];
  if (!icon) return null;

  return (
    <div className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-[11px] font-semibold text-white/80 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition-transform duration-200 hover:-translate-y-0.5">
      <Image src={icon} alt={label} width={18} height={18} unoptimized className="opacity-90" />
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const hasHeader = Boolean(title || subtitle);
  return (
    <section id={id} className="scroll-mt-28">
      {hasHeader ? (
        <div className="space-y-2">
          {subtitle ? (
            <div className="text-sm uppercase tracking-[0.18em] text-white/55">
              {subtitle}
            </div>
          ) : null}
          {title ? (
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold">
              {title}
            </h2>
          ) : null}
        </div>
      ) : null}
      <div className={hasHeader ? "mt-6" : ""}>{children}</div>
    </section>
  );
}

export default function Home() {
  const name = "Areeba Munir";
  const linkedInUrl = "https://www.linkedin.com/in/areeba-munir/";
  const githubUrl = "https://github.com/areebamunir";
  const topmateUrl = "https://topmate.io/areeba_munir/";

  const email = "areebamunir115@gmail.com";
  const phone = null as string | null;

  const roles = useMemo(
    () => [
      "Data & AI Engineer",
      "Data Platform Builder",
      "Analytics + Automation Focused",
      "LLM-Aware Pipeline Engineer",
    ],
    []
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeExperienceKey, setActiveExperienceKey] = useState<string | null>(null);
  const [activeEducationKey, setActiveEducationKey] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<"dark" | "bright">("dark");

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(t);
  }, [roles.length]);

  useEffect(() => {
    const root = document.documentElement;
    const isLight = themeMode === "bright";

    root.dataset.theme = isLight ? "light" : "dark";
    root.style.colorScheme = isLight ? "light" : "dark";

    if (isLight) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [themeMode]);

  const isLight = themeMode === "bright";

  const nav = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ] as const;

  const experience = [
    {
      title: "Data Engineer",
      org: "Qordata",
      meta: "Karachi, Pakistan",
      dates: "Dec 2022 - Jan 2026",
      bullets: [
        "Migrated and optimized 80M+ records from SQL Server to Snowflake (2x faster queries, 50% fewer delays).",
        "Transformed SSIS ETL into Python pipelines for structured and semi-structured data (80% faster ingestion).",
        "Built AI OCR and object detection pipelines; integrated into ETL workflows and supported a $1M client deal.",
        "Delivered end-to-end solutions: models, infra automation, CI/CD, and data quality across 10+ person teams.",
      ],
    },
    {
      title: "Information Technology Officer",
      org: "Bank Al Habib Limited",
      meta: "Karachi, Pakistan",
      dates: "Sep 2022 - Nov 2022",
      bullets: [
        "Built a full-stack lead generation system using .NET MVC (DB, frontend, backend).",
        "Improved operations using SQL Server, DB2, ASP.NET MVC, and IBM Cognos Analytics.",
      ],
    },
    {
      title: "Database Analyst Intern",
      org: "MEB Textile",
      meta: "Karachi, Pakistan",
      dates: "Mar 2021 - May 2021",
      bullets: ["Wrote core SQL queries for reporting and insights using the company ERP system."],
    },
    {
      title: "Machine Learning Intern",
      org: "National Center of AI (NED)",
      meta: "Karachi, Pakistan",
      dates: "Sep 2020 - Oct 2020",
      bullets: [
        "Evaluated and tuned Decision Trees, Random Forests, and SVM models for prediction tasks.",
        "Implemented YOLO object detection and integrated ML models into a Flask app.",
      ],
    },
  ];

  const education = [
    {
      degree: "MSc Data Science (in progress)",
      school: "University of Potsdam",
      meta: "Potsdam, Germany",
      dates: "Jan 2026 - Present",
      description:
        "Pursuing advanced studies in machine learning, modern data systems, and applied analytics.",
    },
    {
      degree: "BS Computer Science & Information Technology",
      school: "NED University of Engineering & Technology",
      meta: "Karachi, Pakistan",
      dates: "Graduated 2022",
      rank: "2nd position in department",
      cgpa: "3.8/4.0" as string | null,
      description:
        "Completed undergraduate studies with a strong foundation in software engineering, databases, and systems. Graduated with 2nd position in department and CGPA 3.8/4.0.",
    },
  ];

  const projects = [
    {
      title: "End-to-End NBA Data Analytics Pipeline",
      stack: ["Python", "SQL", "Airflow", "PostgreSQL", "Polars"],
      imageDark: "/projects/nba-pipeline.svg",
      imageLight: "/projects/nba-pipeline.light.svg",
      description:
        "An end-to-end analytics pipeline that ingests multi-season NBA data via APIs, orchestrates transforms with Airflow, and models metrics in PostgreSQL for fast analysis.",
    },
    {
      title: "Machine Learning-Based Anemia Detection",
      stack: ["Python", "Flask", "Scikit-learn", "Pandas"],
      imageDark: "/projects/anemia-ml.svg",
      imageLight: "/projects/anemia-ml.light.svg",
      description:
        "A ML-powered web app that predicts common anemia types from input features, packaged with a clean Flask UI and a scikit-learn model for real-time inference.",
    },
    {
      title: "Real-Time Attendance System",
      stack: ["Python", "OpenCV", "Tkinter"],
      imageDark: "/projects/attendance.svg",
      imageLight: "/projects/attendance.light.svg",
      description:
        "A desktop tool that captures live video, recognizes faces in real time, and logs attendance automatically—built with OpenCV and a lightweight Tkinter interface.",
    },
  ];

  const skills = [
    {
      label: "Data + ETL",
      icon: "data" as const,
      tools: ["Airflow", "Snowflake", "dbt", "Spark", "Databricks"],
      items: ["Airflow", "Snowflake", "dbt", "Spark/PySpark", "Databricks", "Data Modeling", "Warehousing"],
    },
    {
      label: "Cloud + Tools",
      icon: "cloud" as const,
      tools: ["AWS", "Azure", "Docker", "Git", "CI/CD"],
      items: ["AWS", "Azure", "Docker", "Git", "CI/CD", "Power BI", "Tableau"],
    },
    {
      label: "Programming",
      icon: "code" as const,
      tools: ["Python", "SQL", "C#"],
      items: ["Python", "SQL", "C#", "C/C++"],
    },
    {
      label: "ML",
      icon: "ml" as const,
      tools: ["Scikit-learn", "YOLO"],
      items: ["Scikit-learn", "YOLO", "Feature Engineering", "Model Evaluation"],
    },
  ];

  const certifications = [
    {
      title: "Apache Airflow 3 Fundamentals",
      issuer: "Astronomer",
      date: "Jul 2025",
      url: "https://www.credly.com/earner/earned/share/75f39e77-1210-4f9c-affa-2cd0a01c7906",
    },
    {
      title: "Databricks Certified Data Engineer Associate",
      issuer: "Databricks",
      date: null as string | null,
      url: "https://credentials.databricks.com/f32a4c82-9cd4-40b0-be90-09d58e9a04b5#acc.o4j7IYzb",
    },
    {
      title: "Free Data Engineering Bootcamp — Completion",
      issuer: "Zach Wilson (DataExpert.io)",
      date: null as string | null,
      url: "https://www.dataexpert.io/certification/areebamunir11589053/free-bootcamp-completion",
    },
    {
      title: "Data Engineering Track",
      issuer: "DataCamp",
      date: null as string | null,
      url: "https://www.dataexpert.io/certification/areebamunir11589053/free-bootcamp-completion",
    },
    {
      title: "Data Warehouse Fundamentals for Beginners",
      issuer: "Udemy",
      date: null as string | null,
      url: "https://www.udemy.com/certificate/UC-8e8ba082-f677-4ece-9370-735414bf1b7f/",
    },
  ];

  const achievements = [
    {
      title: "Employee of the Quarter — Qordata (2023)",
      description: "Recognized for strong delivery and impact across data engineering initiatives.",
      type: "award" as const,
      url: "https://www.linkedin.com/posts/areeba-munir_qordata-recognitionawards-activity-7158457943460323332-DvmN?utm_source=share&utm_medium=member_desktop&rcm=ACoAADPF5F0BRvZDQTxUBpCAHYYA5iDyKfAzpXY",
    },
    {
      title: 'Guest speaker session: "Start Your Data Journey Today" — TechFest\'25',
      description: "Spoke to 50+ students and shared practical steps, learning roadmap, and mindset for starting a data career.",
      type: "talk" as const,
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7385316737921044480/?originTrackingId=0proiugXTJUiLyEjMJdeGQ%3D%3D",
    },
    {
      title: 'Workshop: "Big Data: Hadoop to Databricks" — NED University',
      description: "Covered modern big data concepts, migration patterns, and best practices.",
      type: "workshop" as const,
      url: "https://www.linkedin.com/posts/areeba-munir_techfest25-datascience-neduet-activity-7318878875680145408-GZhL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADPF5F0BRvZDQTxUBpCAHYYA5iDyKfAzpXY",
    },
  ];

  const liveUrl = "https://portfolio-ten-rho-sqnpp5ajay.vercel.app";

  const social = [
    { key: "linkedin", label: "LinkedIn", href: linkedInUrl },
    { key: "github", label: "GitHub", href: githubUrl },
    { key: "topmate", label: "Topmate", href: topmateUrl },
  ] as const;

  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const contactMailtoHref = useMemo(() => {
    const subject = contactSubject.trim();
    const body = contactMessage.trim();
    const qs = new URLSearchParams();
    if (subject) qs.set("subject", subject);
    if (body) qs.set("body", body);
    const query = qs.toString();
    return query ? `mailto:${email}?${query}` : `mailto:${email}`;
  }, [contactMessage, contactSubject, email]);

  return (
    <div className="theme-root min-h-screen selection:bg-amber-300/30 selection:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-300/15 blur-[90px]"
          animate={{ y: [0, 18, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-28 left-10 h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-[110px]"
          animate={{ y: [0, -16, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_50%),linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:auto,auto,64px_64px,64px_64px] opacity-60" />
      </div>

      <Navbar
        maxWidth="xl"
        position="sticky"
        classNames={{
          base: "theme-nav bg-[#0D0D0F]/75 backdrop-blur-xl border-b border-white/10",
          wrapper: "px-4",
        }}
      >
        <NavbarBrand className="gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-200 to-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.16)]" />
          <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold tracking-tight">
            {name.split(" ")[0]}
          </div>
        </NavbarBrand>

        <NavbarContent className="gap-4 overflow-x-auto max-w-[62vw] md:max-w-none" justify="center">
          {nav.map((n) => (
            <NavbarItem key={n.href}>
              <Link
                href={n.href}
                className="whitespace-nowrap text-sm text-white/70 hover:text-white"
              >
                {n.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          <NavbarItem className="hidden md:flex">
            <Switch
              size="sm"
              isSelected={themeMode === "bright"}
              onValueChange={(v) => setThemeMode(v ? "bright" : "dark")}
              classNames={{
                wrapper: "bg-white/10",
                thumb: "bg-white",
              }}
            >
              <span className="text-sm text-white/70">bright</span>
            </Switch>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Button
              as={Link}
              href="#contact"
              size="sm"
              className="bg-gradient-to-r from-amber-200 to-amber-500 text-[#0D0D0F] shadow-[0_0_40px_rgba(245,158,11,0.14)]"
            >
              Get in Touch
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="#projects"
              size="sm"
              variant="flat"
              className="bg-white/10 text-white hover:bg-white/15"
            >
              View My Work
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <section id="home" className="scroll-mt-28">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-3xl space-y-6 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-base text-white/65"
              >
                Hello, I&apos;m
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                className="relative"
              >
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/12 blur-2xl" />
                <h1 className="relative font-[family-name:var(--font-space-grotesk)] text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                  {name}.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="space-y-2"
              >
                <div className="text-xl text-white/85">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.45)]" />
                    <motion.span
                      key={roleIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-[family-name:var(--font-space-grotesk)]"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </span>
                </div>
                <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/70">
                  Building production-ready data platforms and AI-powered pipelines that stay flexible as tools change.
                </p>
              </motion.div>

              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="flex flex-wrap items-center justify-center gap-3"
                >
                  <Button
                    as={Link}
                    href="#contact"
                    size="md"
                    className="bg-gradient-to-r from-amber-200 to-amber-500 text-[#0D0D0F] shadow-[0_0_40px_rgba(245,158,11,0.14)]"
                  >
                    Get in Touch
                  </Button>
                  <Button
                    as={Link}
                    href="#projects"
                    size="md"
                    variant="flat"
                    className="bg-white/10 text-white hover:bg-white/15"
                  >
                    View My Work
                  </Button>
                  <Button
                    as={Link}
                    href={liveUrl}
                    isExternal
                    size="md"
                    className="border border-amber-200/30 text-amber-200 hover:border-amber-300 hover:text-white"
                  >
                    Open Live Portfolio
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="flex items-center justify-center gap-2"
                >
                  {social
                    .filter((s) => Boolean(s.href))
                    .map((s) => (
                      <Button
                        key={s.key}
                        as={Link}
                        href={s.href}
                        isExternal
                        isIconOnly
                        aria-label={s.label}
                        radius="full"
                        variant="bordered"
                        className="min-w-12 w-12 h-12 bg-transparent border-white/20 text-amber-200/90 hover:border-amber-300/30 hover:text-amber-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]"
                      >
                        <Icon name={s.key} />
                      </Button>
                    ))}
                </motion.div>
              </div>

              <motion.div
                className="pt-2 text-sm text-white/50"
                animate={{ y: [0, 6, 0], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                scroll for more
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Divider className="my-14 bg-white/10" />

        <Section id="about">
          <Card className="border border-white/10 bg-white/5" shadow="sm">
            <CardBody className="p-6">
              <div className="grid gap-8 md:grid-cols-2 md:items-start">
                <div className="flex flex-col items-center space-y-4 md:self-center">
                  <div className="space-y-1 text-center">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-white">
                      About Me
                    </h3>
                  </div>

                  <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
                    {[
                      {
                        title: "Data Engineering",
                        desc: "3+ years building reliable pipelines, transformations, and production-grade data workflows.",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 7c0-2 2.2-3.5 5-3.5S17 5 17 7s-2.2 3.5-5 3.5S7 9 7 7Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M7 7v10c0 2 2.2 3.5 5 3.5s5-1.5 5-3.5V7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M7 12c0 2 2.2 3.5 5 3.5s5-1.5 5-3.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                        </svg>
                      ),
                    },
                    {
                      title: "Data Science",
                      desc: "Master’s student in Data Science at University of Potsdam (Jan 2026 - Mar 2028).",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 18V6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4 18h16"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M7 15l3-3l3 2l4-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      title: "Cloud Platforms",
                      desc: "Hands-on experience delivering at scale on Snowflake and Databricks with strong data integrity.",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 18h10a4 4 0 0 0 .9-7.9A5 5 0 0 0 8.4 8.6A3.5 3.5 0 0 0 7 18Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 10v6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9.8 14.2L12 16.4l2.2-2.2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      title: "AI Workflows",
                      desc: "Integrating AI-powered OCR and object detection into ETL processes for real production impact.",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 2v3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 19v3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 12h3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M19 12h3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8.2 15.8a4.5 4.5 0 1 1 7.6-3.2c0 .7-.2 1.4-.5 2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5 12.3h3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 10.8v3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                    },
                  ].map((x) => (
                    <div
                      key={x.title}
                      className="flex w-full gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_35px_rgba(245,158,11,0.10)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-200/90">
                        {x.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                          {x.title}
                        </div>
                        <div className="text-xs leading-snug text-white/65">{x.desc}</div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                <div className="space-y-4 text-base leading-relaxed text-white/75">
                  <p>
                    I am a Master&apos;s student in Data Science at the University of Potsdam (Jan 2026 - Mar 2028) with
                    over three years of professional experience in data engineering.
                  </p>
                  <p>
                    My journey began with a background in Computer Science from NED University, where I developed a
                    strong technical foundation. I was drawn into the data field through hands-on work with complex
                    SQL, ETL pipelines using SSIS, and Python-based data processing\u2014quickly learning what it takes
                    to maintain reliable production data systems.
                  </p>
                  <p>
                    Over time, my role evolved from simply building pipelines to owning end-to-end data workflows. I
                    have worked on designing scalable data pipelines, optimizing performance, and ensuring data
                    integrity across modern platforms such as Snowflake and Databricks.
                  </p>
                  <p className="text-white/70">
                    Currently, my focus is on modern data and AI-driven workflows, including integrating AI-powered OCR
                    and object detection into ETL processes. I am particularly interested in building systems that
                    emphasize correctness, performance, and maintainability in a rapidly evolving data ecosystem.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="experience" title="Experience">
          <div className="relative grid gap-4">
            <div aria-hidden="true" className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
            {experience.map((role, idx) => {
              const key = `${role.title}-${role.org}`;
              const isActive = activeExperienceKey === key;
              const isLast = idx === experience.length - 1;
              return (
              <motion.div
                key={key}
                data-exp-key={key}
                initial={{ opacity: 0.92 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.55, margin: "-35% 0px -35% 0px" }}
                onViewportEnter={() => setActiveExperienceKey(key)}
                animate={
                  isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="relative pl-10"
              >
                <div
                  aria-hidden="true"
                  className={[
                    "absolute left-3 top-0 w-px transition-colors duration-300",
                    isLast ? "bottom-6" : "bottom-0",
                    isActive ? "bg-amber-300/70" : "bg-transparent",
                  ].join(" ")}
                />
                <div
                  aria-hidden="true"
                  className={[
                    "absolute left-3 top-8 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                    isActive ? "h-3.5 w-3.5 bg-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.28)] ring-4 ring-amber-300/15" : "h-3 w-3 bg-white/30 ring-4 ring-white/5",
                  ].join(" ")}
                />
                <Card
                  className={
                    isActive
                      ? "border border-amber-300/30 bg-white/7 shadow-[0_0_45px_rgba(245,158,11,0.12)] transition-colors"
                      : "border border-white/10 bg-white/5 transition-colors"
                  }
                  shadow="sm"
                >
                  <CardHeader className="px-6 pb-0 pt-6">
                    <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold">
                          {role.title}
                        </div>
                        <div className="text-base text-white/60">
                          {role.org} | {role.meta}
                        </div>
                      </div>
                      <Chip variant="flat" className="bg-white/10 text-white md:shrink-0">
                        {role.dates}
                      </Chip>
                    </div>
                  </CardHeader>
                  <CardBody className="px-6 pb-6 pt-4">
                    <ul className="space-y-3 text-base leading-relaxed text-white/75">
                      {role.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </motion.div>
              );
            })}
          </div>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="education" title="Education">
          <div className="relative grid gap-4">
            <div aria-hidden="true" className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
            {education.map((e, idx) => {
              const key = `${e.degree}-${e.school}`;
              const isActive = activeEducationKey === key;
              const isLast = idx === education.length - 1;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0.92 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.55, margin: "-35% 0px -35% 0px" }}
                  onViewportEnter={() => setActiveEducationKey(key)}
                  animate={isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="relative pl-10"
                >
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute left-3 top-0 w-px transition-colors duration-300",
                      isLast ? "bottom-6" : "bottom-0",
                      isActive ? "bg-amber-300/70" : "bg-transparent",
                    ].join(" ")}
                  />
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute left-3 top-8 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                      isActive
                        ? "h-3.5 w-3.5 bg-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.28)] ring-4 ring-amber-300/15"
                        : "h-3 w-3 bg-white/30 ring-4 ring-white/5",
                    ].join(" ")}
                  />

                  <Card
                    className={
                      isActive
                        ? "border border-amber-300/30 bg-white/7 shadow-[0_0_45px_rgba(245,158,11,0.12)] transition-colors"
                        : "border border-white/10 bg-white/5 transition-colors"
                    }
                    shadow="sm"
                  >
                    <CardHeader className="px-6 pb-0 pt-6">
                      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                        <div className="space-y-1">
                          <div className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold">
                            {e.degree}
                          </div>
                          <div className="text-base text-white/60">
                            {e.school} | {e.meta}
                          </div>
                        </div>
                        <Chip variant="flat" className="bg-white/10 text-white md:shrink-0">
                          {e.dates}
                        </Chip>
                      </div>
                    </CardHeader>
                    <CardBody className="px-6 pb-6 pt-4">
                      <div className="space-y-4">
                        <div className="text-base leading-relaxed text-white/75">
                          {"description" in e ? e.description : null}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="projects" title="Projects">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <Card
                key={p.title}
                className="border border-white/10 bg-white/5 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_45px_rgba(245,158,11,0.14)]"
                shadow="sm"
              >
                <CardHeader className="px-6 pb-0 pt-6">
                  <div className="space-y-3">
                    <div className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold">
                      {p.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <Chip key={t} size="sm" variant="flat" className="bg-white/10 text-white">
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-6 pb-6 pt-4">
                  <div className="space-y-4">
                    <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:h-48">
                      <Image
                        src={isLight ? p.imageLight : p.imageDark}
                        alt={p.title}
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-base leading-relaxed text-white/75">{p.description}</div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="skills" title="Skills">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {skills.map((s) => (
              <Card
                key={s.label}
                className="border border-white/10 bg-white/5 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_45px_rgba(245,158,11,0.12)]"
                shadow="sm"
              >
                <CardHeader className="px-6 pb-0 pt-6">
                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-200/90">
                        <SkillIcon name={s.icon} />
                      </div>
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                          {s.label}
                        </div>
                      </div>
                    </div>

                    <div className="hidden flex-wrap gap-2 md:flex">
                      {s.tools.map((t) => (
                        <ToolBadge key={t} label={t} />
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="px-6 pb-6 pt-4">
                  <div className="flex flex-wrap gap-2 md:hidden">
                    {s.tools.map((t) => (
                      <ToolBadge key={t} label={t} />
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <Chip key={it} variant="flat" className="bg-white/10 text-white">
                        {it}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="certifications" title="Certifications">
          <Card className="border border-white/10 bg-white/5" shadow="sm">
            <CardBody className="p-4 sm:p-6">
              <div className="grid gap-3">
                {certifications.map((c) => (
                  <div
                    key={c.title}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_35px_rgba(245,158,11,0.10)]"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white">
                        {c.title}
                        {c.issuer ? <span className="text-white/60"> — {c.issuer}</span> : null}
                      </div>
                    </div>

                    <Link isExternal href={c.url} className="shrink-0 text-white/85 underline decoration-white/20">
                      view link
                    </Link>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="achievements" title="Achievements">
          <Card className="border border-white/10 bg-white/5" shadow="sm">
            <CardBody className="p-6">
              <div className="grid gap-3">
                {achievements.map((a) => (
                  <div
                    key={a.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_45px_rgba(245,158,11,0.12)] sm:flex sm:items-start sm:justify-between"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 20% 10%, rgba(245,158,11,0.14), transparent 55%), radial-gradient(circle at 85% 80%, rgba(245,158,11,0.10), transparent 55%)",
                      }}
                    />

                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-amber-200/90 shadow-[0_0_25px_rgba(245,158,11,0.12)]">
                        <AchievementIcon type={a.type} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white">
                            {a.title}
                          </div>
                          <Chip size="sm" variant="flat" className="bg-white/10 text-white/90">
                            {a.type === "award" ? "award" : a.type === "talk" ? "speaker" : "workshop"}
                          </Chip>
                        </div>
                        <div className="mt-1 text-sm leading-relaxed text-white/70">
                          {a.description}
                        </div>
                      </div>
                    </div>

                    {a.url ? (
                      <Link
                        isExternal
                        href={a.url}
                        aria-label="Open LinkedIn post"
                        title="Open LinkedIn post"
                        className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLinkIcon />
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Section>

        <Divider className="my-14 bg-white/10" />

        <Section id="contact" title="Contact">
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5" shadow="sm">
            <CardBody className="p-6">
              <div className="grid gap-6 md:grid-cols-2 md:items-start">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_45px_rgba(245,158,11,0.10)] sm:p-5">
                  <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-amber-300/80" />
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <div className="grid grid-cols-[90px_1fr] items-center gap-4 pl-2">
                        <div className="text-sm text-white/55">Email</div>
                        <Link
                          href={`mailto:${email}`}
                          className="justify-self-end text-sm text-white/85 underline decoration-white/20"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            Send <ExternalLinkIcon className="text-white/70" />
                          </span>
                        </Link>
                      </div>
                      {phone ? (
                        <>
                          <div className="h-px bg-white/10" />
                          <div className="grid grid-cols-[90px_1fr] items-center gap-4 pl-2">
                            <div className="text-sm text-white/55">Phone</div>
                            <Link
                              href={`tel:${phone.replace(/\s+/g, "")}`}
                              className="justify-self-end text-sm text-white/85 underline decoration-white/20"
                            >
                              {phone}
                            </Link>
                          </div>
                        </>
                      ) : null}
                      <div className="h-px bg-white/10" />
                      <div className="grid grid-cols-[90px_1fr] items-center gap-4 pl-2">
                        <div className="text-sm text-white/55">LinkedIn</div>
                        <Link
                          isExternal
                          href={linkedInUrl}
                          className="justify-self-end text-sm text-white/85 underline decoration-white/20"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            Open <ExternalLinkIcon className="text-white/70" />
                          </span>
                        </Link>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="grid grid-cols-[90px_1fr] items-center gap-4 pl-2">
                        <div className="text-sm text-white/55">GitHub</div>
                        <Link
                          isExternal
                          href={githubUrl}
                          className="justify-self-end text-sm text-white/85 underline decoration-white/20"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            Open <ExternalLinkIcon className="text-white/70" />
                          </span>
                        </Link>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="grid grid-cols-[90px_1fr] items-center gap-4 pl-2">
                        <div className="text-sm text-white/55">Resume</div>
                        <Link
                          href="/resume.pdf"
                          download
                          className="justify-self-end text-sm text-white/85 underline decoration-white/20"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            Download <DownloadIcon className="text-white/70" />
                          </span>
                        </Link>
                      </div>
                      {topmateUrl ? (
                        <>
                          <div className="h-px bg-white/10" />
                          <div className="grid grid-cols-[90px_1fr] items-center gap-4 pl-2">
                            <div className="text-sm text-white/55">Topmate</div>
                            <Link
                              isExternal
                              href={topmateUrl}
                              className="justify-self-end text-sm text-white/85 underline decoration-white/20"
                            >
                              <span className="inline-flex items-center gap-1.5">
                                Book <ExternalLinkIcon className="text-white/70" />
                              </span>
                            </Link>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-amber-300/25 hover:shadow-[0_0_45px_rgba(245,158,11,0.10)] sm:p-5">
                  <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-amber-300/80" />
                  <div className="mb-3 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">
                    Send a message
                  </div>
                  <div className="grid gap-3">
                    <Input
                      label="Name"
                      variant="flat"
                      classNames={{ inputWrapper: "bg-white/5 border border-white/10" }}
                    />
                    <Input
                      label="Email"
                      type="email"
                      variant="flat"
                      classNames={{ inputWrapper: "bg-white/5 border border-white/10" }}
                    />
                    <Input
                      value={contactSubject}
                      onValueChange={setContactSubject}
                      label="Subject"
                      variant="flat"
                      classNames={{ inputWrapper: "bg-white/5 border border-white/10" }}
                    />
                    <Textarea
                      value={contactMessage}
                      onValueChange={setContactMessage}
                      label="Message"
                      minRows={4}
                      variant="flat"
                      classNames={{ inputWrapper: "bg-white/5 border border-white/10" }}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Button
                        as="a"
                        href={contactMailtoHref}
                        isDisabled={!contactMessage.trim()}
                        className="bg-gradient-to-r from-amber-200 to-amber-500 text-[#0D0D0F] shadow-[0_0_40px_rgba(245,158,11,0.14)]"
                      >
                        Send message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="my-6 bg-white/10" />
              <div className="text-center text-xs text-white/45">built with next.js + heroui | 2026</div>
            </CardBody>
          </Card>
        </Section>
      </main>
    </div>
  );
}
