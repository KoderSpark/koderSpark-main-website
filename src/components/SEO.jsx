import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateOrganizationSchema } from '../utils/Schema';

const SEO = ({ title, description, canonical, type = 'website', image, jsonLd }) => {
    const siteName = 'Koderspark';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = 'Koderspark: Expert Web & Mobile App Development. We transform complex challenges into elegant, high-performance digital solutions.';
    const metaDescription = description || defaultDescription;
    const siteUrl = 'https://koderspark.com'; // Replace in production
    const metaImage = image || `${siteUrl}/og-image.jpg`; // Replace with default OG image

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={canonical || window.location.href} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(generateOrganizationSchema())}
            </script>
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
