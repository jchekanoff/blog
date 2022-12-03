import { useEffect } from "react"
import { useRouter } from "next/router"

import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import SimpleAnalytics from './SimpleAnalytics'
import Umami from './Umami'
import Posthog from './Posthog'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
    const router = useRouter()

    useEffect(() => {
        if (isProduction && siteMetadata.analytics.fathomAnalyticsId) {
            Fathom.load(siteMetadata.analytics.fathomAnalyticsId, {
                includedDomains: [siteMetadata.siteDomain],
                url: [siteMetadata.analytics.fathomAnalyticsScriptUrl]
            })

            function onRouteChangeComplete() {
                Fathom.trackPageview()
            }

            router.events.on('routeChangeComplete', onRouteChangeComplete)

            // Unassign event listener
            return () => {
                router.events.off('routeChangeComplete', onRouteChangeComplete)
            }
        }
    }, []);

    return (
        <>
            {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
            {isProduction && siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
            {isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}
            {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
            {isProduction && siteMetadata.analytics.posthogAnalyticsId && <Posthog />}
        </>
    )
}

export default Analytics
