export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Koderspark",
    "url": "https://koderspark.com", // Replace with actual domain
    "logo": "https://koderspark.com/logo.png", // Replace with actual logo URL
    "sameAs": [
        "https://www.linkedin.com/company/koderspark",
        "https://twitter.com/koderspark"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9866293371",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "en"
    }
});

export const generateJobPostingSchema = (job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": new Date().toISOString(), // In a real app, this should be the actual post date
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
    "hiringOrganization": {
        "@type": "Organization",
        "name": "Koderspark",
        "sameAs": "https://koderspark.com"
    },
    "jobLocation": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location,
            "addressCountry": "IN"
        }
    }
});

export const generateProjectSchema = (project) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": project.description,
    "image": project.image,
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
});

export const generateWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Koderspark",
    "url": "https://koderspark.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://koderspark.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
});
