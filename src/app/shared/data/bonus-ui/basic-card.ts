export interface Secondary {
    headerClass?: string,
    bodyClass?: string,
    footerClass?: string,
    headingClass?: string,
    heading: string
    title: string,
    FooterTitle?: string,
    desc: string
}

export interface Card {
    title?: string,
    subdesc?: string,
    class?: string,
    headerclass?: string,
    icon?: boolean,
    Data: item[];
}
export interface item {
    img?: string,
    desc?: string,
    details?: boolean,
    headingData?: boolean
}

export const commonTopCard: Card[] = [
    {
        title: 'Basic Card',
        subdesc: '<span>This is a simple basic card using anywhere.</span><code></code><span></span>',
        class: 'card',
        headerclass: 'card-header pb-0',
        Data: [
            {
                desc: 'Tabs have long been used to show alternative views of the same group of information tabs in software. Known as<em class="font-danger">“module tabs”</em> , these are still used today inweb sites. For instance, airline companies such as Ryanair, easyJet and AirMalta use module tabs to enable the user to switch between bookings for flights, hotels and car hire.'
            }
        ]
    },
    {
        title: 'Edge Card',
        subdesc: '<span>For Edge cards, make the</span><code>.b-r-15[border-radius:15]</code><span>used class.</span>',
        class: 'card b-r-15',
        headerclass: 'card-header pb-0 b-r-15',
        Data: [
            {
                desc: 'A navigation bar is a particularly important feature because it allows visitors to quickly and easily find<em class="font-danger"> important pages on your website</em> , like your blog, product pages, pricing, contact info, and documentation. This improves the chances of visitors browsing your site longer, which can boost your page views and reduce your bounce rate.'
            }
        ]
    },
    {
        title: 'Without shadow card',
        subdesc: '<span>Use the</span><code>.shadow-none &amp;.border</code><span>classthrough shadow removes.</span>',
        class: 'card shadow-none solid-border height_equal',
        headerclass: 'card-header pb-0',
        Data: [
            {
                details: true
            }
        ]
    },
    {
        title: ' Icon In Heading',
        icon: true,
        subdesc: '  Use the any icons for heading. <code>[font-awesome/ico-font/feather]</code>.',
        class: 'card shadow-none solid-border height_equal',
        headerclass: 'card-header pb-0',
        Data: [
            {
                headingData: true
            }
        ]
    },

]


export const commonSecondaryData: Secondary[] = [
    {
        headerClass: 'bg-secondary',
        footerClass: 'border-top',
        heading: 'Secondary Color Header',
        title: 'Web Designer',
        desc: "By following instructions and adding your own unique twist and style, you may apply your imagination as a web designer. The majority of the tasks you'll be assigned will have a specific due date and work description, but the reason you were employed was because they need a specialist to inject some much-needed creativity.",
        FooterTitle: 'Edmin Theme'
    },
    {
        headerClass: 'border-bottom',
        footerClass: 'border-0',
        bodyClass: 'bg-secondary',
        heading: 'Secondary Color Body',
        title: 'UX Designer',
        desc: 'It is the responsibility of the UX designer to make a product or service useful, pleasurable, and accessible. The word "user experience" is used by various industries, although it is most frequently related to digital design for websites and mobile applications.There is no need for coding in user experience design.',
        FooterTitle: 'Card Footer'
    },
    {
        headerClass: 'border-bottom',
        footerClass: 'bg-secondary border-top',
        heading: 'Secondary Color Footer',
        title: 'Web Designer',
        desc: 'By following instructions and adding your own unique twist and style, you may apply your imagination as a web designer. The majority of the tasks you ll be assigned will have a specific due date and work description, but the reason you were employed was because they need a specialist to inject some much-needed creativity.',
        FooterTitle: 'Edmin Theme'
    },
]
