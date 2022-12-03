import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import siteMetadata from '@/data/siteMetadata'

function FathomScript() {
    const router = useRouter()

    useEffect(() => {
        Fathom.load(siteMetadata.analytics.fathomAnalyticsId, {
            includedDomains: [siteMetadata.siteDomain],
            url: "https://whole-diamond.josephchekanoff.com/script.js"
        })

        function onRouteChangeComplete() {
            Fathom.trackPageview()
        }

        router.events.on('routeChangeComplete', onRouteChangeComplete)

        // Unassign event listener
        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete)
        }

    }, [])

    return <></>
}

export default FathomScript
