export const basicTimeline = [
    {
        class: 'primary',
        time: '<span class="date-content bg-light-primary">2 Feb 2023</span><span>7:00 AM </span>',
        title: 'CONFERENCE WITH CLIENT',
        dis: 'At noon today, there will be a meeting with a UK client.'
    },
    {
        class: 'secondary',
        time: '<span class="date-content bg-light-primary">22 March 2023</span><span>3:45 PM</span>',
        title: 'DISCUSSION WITH MARKETING TEAM',
        dis: 'discussion with the marketing staff on the success of the most recent project'
    },
    {
        class: 'success',
        time: '<span class="date-content bg-light-primary">16 May 2023</span><span>1:22 AM</span>',
        title: 'INVEST IN A NEW HOSTING PLAN',
        dis: 'today at 2 pm AM, purchase a new hosting package as agreed upon with the management team.'
    },
    {
        class: 'warning',
        time: '<span class="date-content bg-light-primary">23 Nov 2023</span><span>6:56 AM</span>',
        title: 'DISCUSSION WITH DESIGNER TEAM',
        dis: 'discussion with the designer employee on the success of the most recent project.'
    },
    {
        class: 'info',
        time: '<span class="date-content bg-light-primary">12 Dec 2023</span><span>12:05 AM</span>',
        title: 'DISCUSSION WITH NEW THEME LAUNCH ',
        dis: 'discussion with the how many themes made in our portfolio'
    },
    {
        class: 'danger',
        time: '<span class="date-content bg-light-primary">02 Jan 2024</span><span>6:56 AM</span>',
        title: 'PURCHASE NEW CHAIRS FOR OFFICE ',
        dis: 'online purchase new chairs for office'
    },
];

export const horizontalTimeline = [
    {
        id: 1,
        ulClass: 'timeline-border',
        data: [
            {
                divClass: 'col-xxl-4 col-sm-6',
                colorClass: 'primary',
                date: '1 Jan',
                title: 'Conference',
                desc: 'Conferences are intended to bring individuals with similar interests together to discuss problems.',
            },
            {
                divClass: 'col-xxl-4 col-sm-6',
                colorClass: 'success',
                date: '4 Feb',
                title: 'Meet-up',
                desc: 'You may connect with males from all around the world using the friend-forward.',
            },
            {
                divClass: 'col-xxl-4 horizontal-timeline',
                colorClass: 'danger',
                date: '2 may',
                title: 'Meeting',
                desc: 'If several languages coalesce the grammar of the resulting simple and regular social networking platform.',
            },
        ]
    },
    {
        id: 2,
        ulClass: 'border-0',
        data: [
            {
                divClass: 'col-xxl-4 col-sm-6',
                colorClass: 'primary',
                date: '1 Jan',
                title: 'Conference',
                desc: 'A gathering of two or more people to talk about issues of interest.',
            },
            {
                divClass: 'col-xxl-4 col-sm-6',
                colorClass: 'danger',
                date: '2 May',
                title: 'Meeting',
                desc: 'If several languages coalesce the grammar of the resulting simple and regular social networking platform.',
            },
            {
                divClass: 'col-xxl-4 horizontal-timeline',
                colorClass: 'warning',
                date: '7 Dec',
                title: 'Launch Theme',
                desc: 'Responsive Website is the approach that suggests website design and development should respond.',
            },
        ]
    },
]

export const variationTimeline = [
    {
        id: 1,
        class: 'primary',
        time: '<span class="date-content bg-light-primary">8th March, 2022 </span><span>1 day ago</span> ',
        title: 'Updated Product',
    },
    {
        id: 2,
        class: 'warning',
        time: '<span class="date-content bg-light-primary">5th Feb, 2023 </span><span>Today</span> ',
        title: 'Added Bew Items',
        additem: true
    },
    {
        id: 3,
        class: 'secondary',
        time: '<span class="date-content bg-light-primary">20th Sep, 2022 </span><span>12:00 PM</span> ',
        title: 'Tello just like your product',
    }
]