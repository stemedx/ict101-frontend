import CourseDetails from "@/components/course-details";
import { coursesServerApi } from "@/lib/services/api/courses-server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id: courseId } = await params;
    const course = await coursesServerApi.getDetails(courseId);
    return {
      title: `${course.name} – ${BRAND.name}`,
      description: course.description ?? `Learn ${course.name} on ICT101.`,
      alternates: { canonical: `${BRAND.website}/courses/${courseId}` },
      openGraph: {
        title: `${course.name} – ${BRAND.name}`,
        description: course.description ?? `Learn ${course.name} on ICT101.`,
        url: `${BRAND.website}/courses/${courseId}`,
        type: "website",
        images: [{ url: `${BRAND.website}/og-image.png`, width: 1200, height: 630, alt: course.name }],
      },
      twitter: {
        card: "summary_large_image",
        images: [`${BRAND.website}/og-image.png`],
      },
    };
  } catch {
    return {
      title: `Course – ${BRAND.name}`,
      description: BRAND.metaDescription,
    };
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;

  try {
    const courseDetails = await coursesServerApi.getDetails(courseId);

    if (!courseDetails) {
      redirect("/courses");
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "name": courseDetails.name,
          "description": courseDetails.description,
          "url": `${BRAND.website}/courses/${courseId}`,
          "inLanguage": courseDetails.language,
          "educationalLevel": courseDetails.subject.grade,
          "about": courseDetails.subject.name,
          "provider": {
            "@type": "Organization",
            "name": BRAND.name,
            "url": BRAND.website,
          },
          "instructor": {
            "@type": "Person",
            "name": `${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`,
            ...(courseDetails.instructor.socialLinks?.linkedin && {
              "sameAs": courseDetails.instructor.socialLinks.linkedin,
            }),
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
          },
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Courses",
              "item": `${BRAND.website}/courses`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": courseDetails.name,
              "item": `${BRAND.website}/courses/${courseId}`,
            },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CourseDetails course={courseDetails} />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    redirect("/courses");
  }
}
