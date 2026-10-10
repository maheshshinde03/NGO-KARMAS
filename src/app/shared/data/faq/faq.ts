export interface faqTopPart {
   title: string;
   colClass?: string;
   desc: string;
   icon: string;
}

export interface featuredTutorial {
   id: number;
   rating: number;
   img: string;
   post: string;
   desc: string;
   date: string;
}

export interface articlesAndVideos {
   row: number;
   data: {
      id: number;
      icon: string;
      title?: string;
      des?: string;
   }[];
}[]

export const FaqTopPartData: faqTopPart[] = [
   {
      title: 'Articles',
      desc: "How little experience or technical knowledge you currently have. The web is a very big place, and if you are the typical internet user, you probably visit several websites every day.us.",
      icon: 'file-text'
   },
   {
      title: 'Knowledgebase',
      colClass: 'col-sm-6',
      desc: "A Website Designing course enables learners to use essential designing and programming tools required to do the job. The curriculum is a blend of various themes.parturient montes, nascetur ridiculus mus..",
      icon: 'book-open'
   },
   {
      title: 'Support',
      colClass: 'col-sm-6 box-col-12',
      desc: "My best to provide you with the information you seek. Please keep in mind that my knowledge is based on data up until September 2024, so I may not have information on recent events or developments.",
      icon: 'aperture' 
   }
]

export const navigationData1 = [
   {
      icon: 'fa-solid fa-pen-to-square',
      title: 'Tutorials',

   },
   {
      icon: 'fa-solid fa-globe',
      title: 'Help center',

   },
   {
      icon: 'fa-solid fa-book-open-reader',
      title: 'Knowledgebase',
   },
   {
      icon: 'fa-solid fa-file-lines',
      title: 'Articles',
      count: '42'
   },
   {
      icon: 'fa-solid fa-brands fa-youtube',
      title: 'Video Tutorials',
      count: '648'
   },
   {
      icon: 'fa-solid fa-comment-sms',
      title: 'Ask our community',
   },
   {
      icon: 'fa-solid fa-envelope',
      title: 'Contact us',
      line: true
   },
   {
      icon: 'fa-solid fa-comment-sms',
      title: 'Ask our community',

   },
   {
      icon: 'fa-solid fa-envelope',
      title: 'Contact us',

   }
]

export const featuredTutorialData: featuredTutorial[] = [
   {
      id: 1,
      rating: 5,
      img: 'assets/images/faq/1.jpg',
      post: 'Web Design',
      desc: "A Web Designing course belongs to the field of Computer It enables students to learn various techniques.",
      date: 'Dec 15, 2022',
   },
   {
      id: 2,
      rating: 4,
      img: 'assets/images/faq/2.jpg',
      post: 'Web Development',
      desc: "A Web Development course belongs to the field of Computer It enables students to learn various techniques.",
      date: 'Dec 15, 2022',
   },
   {
      id: 3,
      rating: 5,
      img: 'assets/images/faq/3.jpg',
      post: 'UI Design',
      desc: "User interface design (UI) is the design for machines and software, such as mobile devices, computers.",
      date: 'Dec 15, 2022',
   },
   {
      id: 4,
      rating: 4.5,
      img: 'assets/images/faq/4.jpg',
      post: 'UX Design',
      desc: "User Experience design (UX) is the design for machines and software, such as mobile devices, computers.",
      date: 'Dec 15, 2022',
   }
]

export const articlesAndVideosData: articlesAndVideos[] = [
   {
      row: 1,
      data: [
         {
            id: 1,
            title: 'Article Base Video',
            icon: 'fa-brands fa-codepen m-r-30 mt-1',
            des: 'The web is a very big place, and if you are the typical internet base user',
         },
         {
            id: 2,
            title: 'Knows your sources',
            icon: 'fa-brands fa-codepen m-r-30 mt-1',
            des: 'A book giving information on many subjects or on many aspects of one subject.'
         },
         {
            id: 3,
            title: 'Sources credible/reliable',
            icon: 'fa-brands fa-codepen m-r-30 mt-1',
            des: 'Simple demos of frequently asked questions about using the information resources'

         },
      ]
   },
   {
      row: 2,
      data: [
         {
            id: 4,
            title: 'Validate website',
            icon: 'fa-solid fa-file-lines m-r-30 mt-1',
            des: 'Website is the process of ensuring that the pages on the website conform',
         },
         {
            id: 5,
            title: 'Tailwind Design',
            icon: 'fa-solid fa-file-lines m-r-30 mt-1',
            des: 'Tailwind is so low-level, it never encourages you to design the same site twice.',

         },
         {
            id: 6,
            title: 'Knows your sources.',
            icon: 'fa-solid fa-file-lines m-r-30 mt-1',
            des: 'A book giving information on many subjects or on many aspects of one subject.',
         },
      ]
   },
   {
      row: 3,
      data: [
         {
            id: 7,
            title: 'Sources Demos',
            icon: 'fa-brands fa-youtube m-r-30 mt-1',
            des: 'Simple demos of frequently asked questions about using the information resources'
         },
         {
            id: 8,
            title: 'Validate Html',
            icon: 'fa-brands fa-youtube m-r-30 mt-1',
            des: 'Website is the process of ensuring that the pages on the website conform.'
         },
         {
            id: 9,
            title: 'Web Design',
            icon: 'fa-brands fa-youtube m-r-30 mt-1',
            des: 'Web is so high-level, it never encourages you to design the same site twice'
         },
      ]
   }
]

export const questionData = [
   {
      data: [
         {
            panel: 'allData',
            title: 'Integrating WordPress with Your Website?',
            desc: 'How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.',
         },
         {
            panel: 'Second',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Third',
            title: 'Meta Tags in WordPress ?',
            desc: 'Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.',
         },
         {
            panel: 'Fourth',
            title: 'WordPress in Your Language ?',
            desc: 'As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.',
         },
      ]
   },
   {
      heading: 'Intellectual Property',
      data: [
         {
            panel: 'Fifth',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Six',
            title: ' WordPress in Your Language ?',
            desc: 'As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.',
         },
         {
            panel: 'Seven',
            title: 'Integrating WordPress with Your Website ?',
            desc: 'How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.',
         },
      ]
   },
   {
      heading: 'Selling And Buying',
      data: [
         {
            panel: 'Nine',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Ten',
            title: 'Meta Tags in WordPress ?',
            desc: 'Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.',
         },
         {
            panel: 'Eleven',
            title: 'Validating a Website ?',
            desc: 'Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.',
         },
         {
            panel: 'Twelve',
            title: 'Know Your Sources ?',
            desc: 'A book or set of books giving information on many subjects or on many aspects of one subject. Some are intended as an entry point into research for a general audience, some provide detailed information.',
         },
      ]
   },
   {
      heading: 'User Accounts',
      data: [
         {
            panel: 'Thirteen',
            title: 'Integrating WordPress with Your Website ?',
            desc: 'How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.',
         },
         {
            panel: 'Fourteen',
            title: 'WordPress Site Maintenance ?',
            desc: 'We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.',
         },
         {
            panel: 'Fifteen',
            title: 'WordPress in Your Language ?',
            desc: 'As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.',
         },
         {
            panel: 'Sixteen',
            title: 'Validating a Website ?',
            desc: 'Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.',
         },
         {
            panel: 'Saventeen',
            title: 'Meta Tags in WordPress ?',
            desc: 'Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.',
         },

      ]
   }
]

export const LatestUpdates = [
   {
      icon: 'fa-rotate-right',
      des: '<a class="font-primary" href="javascript:void(0)">David Linner </a>requested money back for a double debit card charge',
      time: '10 minutes ago'
   },
   {
      icon: 'fa-dollar-sign',
      des: 'All sellers have received monthly payouts',
      time: '2 hours ago',
   },
   {
      icon: 'fa-link',
      des: 'User Christopher <a class="font-primary" href="javascript:void(0)">Wallace</a> is on hold and awaiting for staff reply',
      time: '45 minutes ago',
   },
   {
      icon: 'fa-check',
      des: 'Ticket #43683 has been closed by <a class="font-primary" href="javascript:void(0)">Victoria Wilson</a>',
      time: 'Dec 7, 11:48',
   },
]